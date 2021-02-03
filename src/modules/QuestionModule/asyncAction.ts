import { AxiosResponse } from "axios";
import { IAnswer, IQuestion } from "@/interfaces";
import { callApiGet } from "../ApiModule";
import { actions } from "./reducer";

export const getQuestionInfo = (questionId: string) => (dispatch: Function) => {
  const { setQuestionInfo } = actions;
  dispatch(callApiGet(`/questions/${questionId}`))
    .then((response: AxiosResponse) => {
      dispatch(setQuestionInfo(response.data as IQuestion));
    })
    .catch(console.error);
};

export const getQuestionAnswers = (questionId: string) => (
  dispatch: Function
) => {
  const { setQuestionAnswers } = actions;
  dispatch(callApiGet(`/questions/${questionId}/answers`))
    .then((response: AxiosResponse) => {
      dispatch(
        setQuestionAnswers({
          id: questionId,
          answers: response.data as IAnswer[],
        })
      );
    })
    .catch(console.error);
};
