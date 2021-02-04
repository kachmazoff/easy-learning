import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQuestionExtended } from "@/interfaces";

type QuestionsListState = {
  questions: IQuestionExtended[];
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
    setList: (state, { payload }: PayloadAction<IQuestionExtended[]>) => ({
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
