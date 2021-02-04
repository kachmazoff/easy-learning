import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAnswer, IQuestion } from "@/interfaces";

interface QuestionData {
  question: IQuestion;
  answers?: IAnswer[];
  isLoading?: boolean;
}

interface QuestionState {
  [id: string]: QuestionData;
}

const initialState: QuestionState = {};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setQuestionInfo: (state, { payload }: PayloadAction<IQuestion>) => {
      const { id } = payload;
      const questionData = state[id] || {};

      return {
        ...state,
        [id]: {
          ...questionData,
          question: payload,
        },
      };
    },
    setQuestionAnswers: (
      state,
      { payload }: PayloadAction<{ id: string; answers: IAnswer[] }>
    ) => {
      const { id, answers } = payload;
      const questionData = state[id] || {};

      return {
        ...state,
        [id]: {
          ...questionData,
          answers,
        },
      };
    },
    setIsLoading: (
      state,
      { payload }: PayloadAction<{ id: string; isLoading: boolean }>
    ) => {
      const { id, isLoading } = payload;
      const questionData = state[id] || {};

      return {
        ...state,
        [id]: {
          ...questionData,
          isLoading,
        },
      };
    },
  },
});

export const { actions, reducer } = questionSlice;
