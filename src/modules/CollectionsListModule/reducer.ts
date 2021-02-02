import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICollectionInfo } from "@/interfaces";

export interface CollectionsList {
  collections: ICollectionInfo[];
  isActual: boolean;
}

export const initialState: CollectionsList = {
  collections: [],
  isActual: false,
};

export const collectionsListSlice = createSlice({
  name: "collectionsList",
  initialState,
  reducers: {
    setList: (state, { payload }: PayloadAction<ICollectionInfo[]>) => ({
      ...state,
      collections: payload,
    }),
    push: (state, { payload }: PayloadAction<ICollectionInfo[]>) => {
      const newCollections = [...state.collections, ...payload];
      return {
        ...state,
        collections: newCollections,
      };
    },
    setIsActual: (state, { payload }: PayloadAction<boolean>) => ({
      ...state,
      isActual: payload,
    }),
  },
});

export const { actions, reducer } = collectionsListSlice;
