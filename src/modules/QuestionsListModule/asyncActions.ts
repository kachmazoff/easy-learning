import { AxiosResponse } from "axios";
import { IQuestion } from "@/interfaces";
import { actions } from "./reducer";
import { callApiGet } from "../ApiModule";

export const getAllQuestions = () => (
  dispatch: Function
): Promise<void | IQuestion[]> => {
  const { setList, setIsActual } = actions;

  return dispatch(callApiGet("/questions"))
    .then((response: AxiosResponse) => {
      dispatch(setList(response.data));
      dispatch(setIsActual(true));
      return response.data as IQuestion[];
    })
    .catch((err) => {
      console.error(err);
    });
};
