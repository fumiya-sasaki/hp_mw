import { NewsBaseData, NewsData, NewsState } from '@/common/types';
import { limitPoint } from '@/common/unchanged';
import { FireBase } from '@/core/firebase';
import { RootState } from '@/hooks/common';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { cloneDeep } from 'lodash';

const collectionName: string = 'news';

const initialState: NewsState = {
    data: {},
    isNoMore: false,
};

export const getNewsDataList = createAsyncThunk<NewsData>(
    'news/getNewsDataList',
    async (_, thunkApi) => {
        try {
            const newsData: NewsData = cloneDeep((thunkApi.getState() as RootState).news.data);
            const lastNewsData: NewsBaseData = Object.values(newsData)[Object.values(newsData).length - 1];
            const newNewsData: NewsData = {};
            const orderBy = ['createdAt', 'desc'] as const;
            const querySnapshot: FireBase.QuerySnapshotType = lastNewsData ?
                await FireBase.getQuerySnapshot(FireBase.setCollection(collectionName),
                    FireBase.setOrderBy(...orderBy),
                    FireBase.setStartAfter(FireBase.convertTofromMillis(lastNewsData.createdAt)),
                    FireBase.setLimit(limitPoint)) :
                await FireBase.getQuerySnapshot(FireBase.setCollection(collectionName),
                    FireBase.setOrderBy(...orderBy), FireBase.setLimit(limitPoint));
            for (const doc of querySnapshot.docs) {
                const documentData = doc.data();
                documentData.createdAt = documentData.createdAt.toDate().getTime();
                newNewsData[documentData.uid] = documentData as NewsBaseData;
            };
            return newNewsData;
        } catch {
            return thunkApi.rejectWithValue({ errorMessage: 'fetch error' });
        }
    });

export const getPinpointNewsData = createAsyncThunk<NewsData, string>(
    'news/getPinpointNewsData',
    async (uid, thunkApi) => {
        try {
            const newsData: NewsData = cloneDeep((thunkApi.getState() as RootState).news.data);
            const documentData: FireBase.DocumentDataType | undefined =
                (await FireBase.getDocumentSnapshot(collectionName, uid)).data();
            if (documentData) {
                documentData.createdAt = documentData.createdAt.toDate().getTime();
                newsData[documentData.uid] = documentData as NewsBaseData;
            }
            return newsData;
        } catch {
            return thunkApi.rejectWithValue({ errorMessage: 'fetch error' });
        }
    });

const slice = createSlice({
    name: 'news',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getNewsDataList.fulfilled, (state, action) => {
            const newsData: NewsData = action.payload;
            if (Object.values(newsData).length < limitPoint) {
                state.isNoMore = true
            }
            state.data = { ...state.data, ...newsData };
            return state
        });
        builder.addCase(getPinpointNewsData.fulfilled, (state, action) => {
            state.data = { ...action.payload };
            return state
        });
    },
});

export const news = slice.reducer;