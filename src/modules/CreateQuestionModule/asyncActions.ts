import { AxiosResponse } from "axios";
import { IQuestion } from "@/interfaces";
import { callApiPost } from "../ApiModule";
import { actions } from "../QuestionsListModule/reducer";

export const createQuestion = (newQuestion: IQuestion) => (
  dispatch: Function
): Promise<void> => {
  const { setIsActual } = actions;

  return dispatch(callApiPost("/questions", newQuestion))
    .then((response: AxiosResponse) => {
      dispatch(setIsActual(false));
    })
    .catch((err) => {
      console.error(err);
      //   dispatch(onLoadFail());
    });
};
