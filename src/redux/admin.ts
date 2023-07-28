import { AdminState, NewsBaseData, NewsData, NewsEdit } from "@/common/types";
import { FireBase } from "../core/firebase";
import { createUid } from "@/helper/helper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { limitPoint } from "@/common/unchanged";
import { cloneDeep } from "lodash";
import { RootState } from "@/hooks/common";


const initialState: AdminState = {
    newsData: {},
    isLogin: false
};

export const setNewNewsData = createAsyncThunk<NewsData, NewsEdit>(
    'admin/setNewNewsData',
    async (newsEdit, thunkApi) => {
        try {
            const newsData: NewsData = cloneDeep((thunkApi.getState() as RootState).admin.newsData);
            const { uid, title, imageUrls, content, createdAt } = newsEdit;
            const createdAtDate: Date = createdAt === 0 ? new Date() : new Date(createdAt);
            const newUid: string = uid ? uid : createUid(createdAtDate);
            const newsDocumentRef = FireBase.getDocumentReference('news', newUid);
            const storageRefs: Promise<string>[] = [];
            for (const blobWithUrl of imageUrls) {
                if (blobWithUrl.blob) {
                    const storageRef: FireBase.StorageReferenceType =
                        FireBase.getStorageReference(`image/news/${newUid}/${createdAtDate.getTime() + blobWithUrl.blob.name}`);
                    await FireBase.uploadImage(storageRef, blobWithUrl.blob);
                    storageRefs.push(FireBase.getStorageImageUrl(storageRef));
                };
            };
            const storageImageUrls: string[] = storageRefs.length > 0
                ? await Promise.all(storageRefs) : imageUrls.map(item => item.url);
            const setData = { uid: newUid, title, content, imageUrls: storageImageUrls, createdAt: createdAtDate };
            FireBase.setDocumentData(newsDocumentRef, setData);
            newsData[newUid] = { ...setData, createdAt: createdAtDate.getTime() };
            return newsData;
        } catch {
            return thunkApi.rejectWithValue({ errorMessage: 'fetch error' });
        }
    });

export const getNewsDataListForAdmin = createAsyncThunk<NewsData>(
    'admin/getNewsDataListForAdmin',
    async (_, thunkApi) => {
        try {
            const newsData: NewsData = cloneDeep((thunkApi.getState() as RootState).admin.newsData);
            const lastNewsData: NewsBaseData = Object.values(newsData)[Object.values(newsData).length - 1];
            const orderBy = ['createdAt', 'desc'] as const;
            const querySnapshot: FireBase.QuerySnapshotType = lastNewsData ?
                await FireBase.getQuerySnapshot(FireBase.setCollection('news'),
                    FireBase.setOrderBy(...orderBy), FireBase.setStartAfter(FireBase.convertTofromMillis(lastNewsData.createdAt)),
                    FireBase.setLimit(limitPoint)) :
                await FireBase.getQuerySnapshot(FireBase.setCollection('news'),
                    FireBase.setOrderBy(...orderBy), FireBase.setLimit(limitPoint));
            for (const doc of querySnapshot.docs) {
                const documentData = doc.data();
                documentData.createdAt = documentData.createdAt.toDate().getTime();
                newsData[documentData.uid] = documentData as NewsBaseData;
            };
            return newsData;
        } catch {
            return thunkApi.rejectWithValue({ errorMessage: 'fetch error' });
        }
    });

const slice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        onChangeIsLogin: (state, action) => {
            state.isLogin = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getNewsDataListForAdmin.fulfilled, (state, action) => {
            state.newsData = { ...action.payload };
            return state
        });
        builder.addCase(setNewNewsData.fulfilled, (state, action) => {
            state.newsData = { ...action.payload };
            return state
        });
    },
});

export const admin = slice.reducer;
export const { onChangeIsLogin } = slice.actions;
