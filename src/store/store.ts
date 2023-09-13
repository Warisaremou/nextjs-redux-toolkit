import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cart/cart-slice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";

// const persisConfig()

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
