import { callApiGet, callApiPost } from "./common";
import {
  ICollectionDTO,
  ICreateCollectionDTO,
  IUpdateCollectionDTO,
} from "./types";

export const collectionApi = {
  getInfo: (id: string) => callApiGet<ICollectionDTO>(`/collections/${id}`),
  update: (model: IUpdateCollectionDTO) =>
    callApiPost<void>(`/collections/${model.id}`, model),
  create: (model: ICreateCollectionDTO) =>
    callApiPost<void>("/collections", model),
};
