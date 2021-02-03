import { AxiosResponse } from "axios";
import { callApiPost } from "../ApiModule";
import { getQuestionAnswers } from "../QuestionModule/asyncAction";
import { AnswerFormData } from "./types";

export const createAnswer = (
  question_id: string,
  newAnswer: AnswerFormData
) => (dispatch: Function): Promise<void> => {
  return dispatch(callApiPost("/answers", { ...newAnswer, question_id }))
    .then((response: AxiosResponse) => {
      dispatch(getQuestionAnswers(question_id));
    })
    .catch((err) => {
      console.error(err);
    });
};
