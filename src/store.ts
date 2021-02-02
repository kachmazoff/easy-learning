import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { collectionsListSlice } from "./modules/CollectionsListModule";
import { collectionSlice } from "./modules/CollectionModule";
import { questionsListSlice } from "./modules/QuestionsListModule";
import { authSlice } from "./modules/AuthModule";
import { questionsSearchSlice } from "./modules/QuestionsSearchModule/reducer";

const reducer = combineReducers({
  [questionsListSlice.name]: questionsListSlice.reducer,
  [collectionsListSlice.name]: collectionsListSlice.reducer,
  [collectionSlice.name]: collectionSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [questionsSearchSlice.name]: questionsSearchSlice.reducer,
});

export type RootState = ReturnType<typeof reducer>;

export const store = configureStore({ reducer });
