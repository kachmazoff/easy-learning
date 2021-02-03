import { AxiosResponse } from "axios";
import { callApiPost } from "../ApiModule";
import { AnswerFormData } from "./types";

export const createAnswer = (
  question_id: string,
  newAnswer: AnswerFormData
) => (dispatch: Function): Promise<void> => {
  return dispatch(callApiPost("/answers", { ...newAnswer, question_id }))
    .then((response: AxiosResponse) => {
      console.log("Success");
    })
    .catch((err) => {
      console.error(err);
    });
};
