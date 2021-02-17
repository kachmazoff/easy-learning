import { AxiosResponse } from "axios";
import { IAnswer, IQuestion } from "@/interfaces";
import { callApiGet } from "../ApiModule";
import { actions } from "./reducer";

export const getQuestionInfo = (questionId: string) => (dispatch: Function) => {
  const { setQuestionInfo, setIsLoading } = actions;
  dispatch(setIsLoading({ id: questionId, isLoading: true }));
  dispatch(callApiGet(`/questions/${questionId}`))
    .then((response: AxiosResponse) => {
      dispatch(setQuestionInfo(response.data as IQuestion));
      dispatch(setIsLoading({ id: questionId, isLoading: false }));
    })
    .catch(() => {
      dispatch(setIsLoading({ id: questionId, isLoading: false }));
    });
};

export const getQuestionAnswers = (questionId: string) => (
  dispatch: Function
) => {
  const { setQuestionAnswers } = actions;
  dispatch(callApiGet(`/answers?questionId=${questionId}`))
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
