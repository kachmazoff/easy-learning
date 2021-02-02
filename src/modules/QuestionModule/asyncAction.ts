import { AxiosResponse } from "axios";
import { IQuestion } from "@/interfaces";
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
