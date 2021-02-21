import { AxiosResponse } from "axios";
import { IQuestionExtended } from "@/interfaces";
import { actions } from "./reducer";
import { callApiGet } from "../ApiModule";

export const getAllQuestions = () => (
  dispatch: Function
): Promise<void | IQuestionExtended[]> => {
  const { setList, setIsActual } = actions;

  return callApiGet("/questions")
    .then((response: AxiosResponse) => {
      dispatch(setList(response.data));
      dispatch(setIsActual(true));
      return response.data as IQuestionExtended[];
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getUnansweredQuestions = () => (
  dispatch: Function
): Promise<void | IQuestionExtended[]> => {
  const { setList, setIsActual } = actions;

  return callApiGet("/questions/unanswered")
    .then((response: AxiosResponse) => {
      dispatch(setList(response.data));
      dispatch(setIsActual(true));
      return response.data as IQuestionExtended[];
    })
    .catch((err) => {
      console.error(err);
    });
};
