import { AxiosResponse } from "axios";
import { RootState } from "@/store";
import { callApiGet } from "../ApiModule";
import { actions } from "./reducer";

export const qSearchQuery = (query: string, name: string) => (
  dispatch: Function,
  getState: Function
) => {
  const rootState: RootState = getState();
  const userId = rootState.auth.userData?.id as string;
  const { setQuestions } = actions;
  if (!query) {
    dispatch(setQuestions({ data: [], name, userId }));
    return;
  }

  return callApiGet("/questions/search?query=" + query)
    .then((response: AxiosResponse) => {
      dispatch(setQuestions({ data: response.data, name, userId }));
    })
    .catch(console.error);
};
