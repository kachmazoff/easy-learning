import { ICollectionInfo } from "@/interfaces";
import { actions } from "../CollectionsListModule/reducer";
import { callApiPost } from "../ApiModule";

export const createCollection = (newCollection: ICollectionInfo) => (
  dispatch: Function
): Promise<void> => {
  const { setIsActual } = actions;

  return callApiPost("/collections", newCollection)
    .then(() => {
      dispatch(setIsActual(false));
    })
    .catch((err) => {
      console.error(err);
    });
};
