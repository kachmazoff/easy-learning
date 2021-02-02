import { AxiosResponse } from "axios";
import { ICollectionInfo } from "@/interfaces";
import { actions } from "../CollectionsListModule/reducer";
import { callApiPost } from "../ApiModule";

export const createCollection = (newCollection: ICollectionInfo) => (
  dispatch: Function
): Promise<void> => {
  const { setIsActual } = actions;

  return dispatch(callApiPost("/collections", newCollection))
    .then((response: AxiosResponse) => {
      dispatch(setIsActual(false));
    })
    .catch((err) => {
      console.error(err);
    });
};
