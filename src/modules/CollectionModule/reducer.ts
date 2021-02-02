import { ICollectionInfo, IQuestion } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICollectionFull, IQAPair } from "./types";

export interface CollectionState {
  [collectionId: string]: ICollectionFull;
}

const initialState: CollectionState = {};

type CommonPayloadType = {
  collectionId: string;
};

interface SaveCollectionInfoPayload {
  id: string;
  collectionInfo: ICollectionInfo;
}

interface SetCollectionQuestionsPayload {
  id: string;
  questions: IQuestion[];
}

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setCollectionQAs: (
      state,
      { payload }: PayloadAction<CommonPayloadType & { qaPairs: IQAPair[] }>
    ) => {
      const { collectionId, qaPairs } = payload;
      const newCollectionModel = { ...(state[collectionId] || {}), qaPairs };
      return {
        ...state,
        [collectionId]: newCollectionModel,
      };
    },
    saveCollectionInfo: (
      state,
      { payload }: PayloadAction<SaveCollectionInfoPayload>
    ) => {
      const { id, collectionInfo } = payload;
      const newCollectionModel = { ...(state[id] || {}), collectionInfo };
      return {
        ...state,
        [id]: newCollectionModel,
      };
    },
    setCollectionQuestions: (
      state,
      { payload }: PayloadAction<SetCollectionQuestionsPayload>
    ) => {
      const { id, questions } = payload;
      const newCollectionModel = { ...(state[id] || {}), questions };
      return {
        ...state,
        [id]: newCollectionModel,
      };
    },
  },
});

export const { actions, reducer } = collectionSlice;
