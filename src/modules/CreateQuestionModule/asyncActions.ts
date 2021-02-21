import { IQuestion } from "@/interfaces";
import { callApiPost } from "../ApiModule";
import { actions } from "../QuestionsListModule/reducer";

export const createQuestion = (newQuestion: IQuestion) => (
  dispatch: Function
): Promise<void> => {
  const { setIsActual } = actions;

  return callApiPost("/questions", newQuestion)
    .then(() => {
      dispatch(setIsActual(false));
    })
    .catch((err) => {
      console.error(err);
      //   dispatch(onLoadFail());
    });
};
