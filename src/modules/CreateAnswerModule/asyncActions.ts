import { callApiPost } from "../ApiModule";
import { getQuestionAnswers } from "../QuestionModule/asyncActions";
import { AnswerFormData } from "./types";

export const createAnswer = (
  question_id: string,
  newAnswer: AnswerFormData
) => (dispatch: Function): Promise<void> =>
  callApiPost("/answers", { ...newAnswer, question_id })
    .then(() => {
      dispatch(getQuestionAnswers(question_id));
    })
    .catch((err) => {
      console.error(err);
    });
