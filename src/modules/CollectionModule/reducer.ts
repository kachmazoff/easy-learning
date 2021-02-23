import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICollectionFull } from "./types";

export interface CollectionState {
  [collectionId: string]: ICollectionFull;
}

const initialState: CollectionState = {};

interface SetCollectionDataPayload extends Partial<ICollectionFull> {
  id: string;
}

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setCollectionData: (
      state,
      { payload }: PayloadAction<SetCollectionDataPayload>
    ) => {
      const { id, ...rest } = payload;
      const newCollectionModel: ICollectionFull = {
        ...(state[id] || {}),
        ...rest,
      };

      return {
        ...state,
        [id]: newCollectionModel,
      };
    },
  },
});

export const { actions, reducer } = collectionSlice;
