import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { news } from "./news";
import { admin } from "./admin";

const reducer = combineReducers({
    news,
    admin
});

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
