import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQuestion } from "@/interfaces";

type QuestionsListState = {
  questions: IQuestion[];
  isActual: boolean;
};

const initialState: QuestionsListState = {
  questions: [],
  isActual: false,
};

export const questionsListSlice = createSlice({
  name: "questionsList",
  initialState,
  reducers: {
    setList: (state, { payload }: PayloadAction<IQuestion[]>) => ({
      ...state,
      questions: payload,
    }),
    setIsActual: (state, { payload }: PayloadAction<boolean>) => ({
      ...state,
      isActual: payload,
    }),
  },
});

export const { reducer, actions } = questionsListSlice;
