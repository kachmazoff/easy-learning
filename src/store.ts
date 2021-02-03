import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { collectionsListSlice } from "./modules/CollectionsListModule";
import { collectionSlice } from "./modules/CollectionModule";
import { questionsListSlice } from "./modules/QuestionsListModule";
import { authSlice } from "./modules/AuthModule";
import { questionsSearchSlice } from "./modules/QuestionsSearchModule/reducer";
import { questionSlice } from "./modules/QuestionModule";

const reducer = combineReducers({
  [questionsListSlice.name]: questionsListSlice.reducer,
  [collectionsListSlice.name]: collectionsListSlice.reducer,
  [collectionSlice.name]: collectionSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [questionsSearchSlice.name]: questionsSearchSlice.reducer,
  [questionSlice.name]: questionSlice.reducer,
});

export type RootState = ReturnType<typeof reducer>;

export const store = configureStore({ reducer });
