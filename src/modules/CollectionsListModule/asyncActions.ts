import { AxiosResponse } from "axios";
import { ICollectionInfo } from "@/interfaces";
import { actions } from "./reducer";
import { callApiGet } from "../ApiModule";

export const getAllCollections = () => (
  dispatch: Function
): Promise<void | ICollectionInfo[]> => {
  const { setList, setIsActual } = actions;

  //   dispatch(onLoadStart());
  return callApiGet("/collections")
    .then((response: AxiosResponse) => {
      dispatch(setList(response.data));
      dispatch(setIsActual(true));
      return response.data as ICollectionInfo[];
    })
    .catch((err) => {
      console.error(err);
      //   dispatch(onLoadFail());
    });
};
