import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQuestion } from "@/interfaces";

export interface QSearchData {
  own: IQuestion[];
  other: IQuestion[];
}

interface QuestionsSearchState {
  [name: string]: QSearchData;
}

const initialState: QuestionsSearchState = {};

interface SetQuestionsPayload {
  name: string;
  userId: string;
  data: IQuestion[];
}

export const questionsSearchSlice = createSlice({
  name: "questionsSearch",
  initialState,
  reducers: {
    setQuestions: (state, { payload }: PayloadAction<SetQuestionsPayload>) => {
      const { name, data, userId } = payload;
      const own = data.filter((x) => x.author_id === userId);
      const other = data.filter((x) => x.author_id !== userId);

      return {
        ...state,
        [name]: {
          own,
          other,
        },
      };
    },
  },
});

export const { actions, reducer } = questionsSearchSlice;
