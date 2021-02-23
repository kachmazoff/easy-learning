import { AxiosError, AxiosResponse } from "axios";
import { collectionApi, filesApi } from "@/api";
import { CollectionFormData } from "@/components/CollectionForm";
import { ICard, ICollectionInfo } from "@/interfaces";
import { actions } from "./reducer";
import { callApiDelete, callApiGet, callApiPost } from "../ApiModule";
import { IQAPair } from "./types";
import { ICreateCollectionDTO, IUpdateCollectionDTO } from "@/api/types";

export const getCollectionInfo = (id: string) => (
  dispatch: Function
): Promise<ICollectionInfo | undefined> => {
  const { setCollectionData } = actions;

  return collectionApi
    .getInfo(id)
    .then((response) => {
      const collectionInfo: ICollectionInfo = response.data;

      dispatch(setCollectionData({ id, collectionInfo, isLoading: false }));

      return collectionInfo;
    })
    .catch((err) => {
      console.error(err);
      dispatch(setCollectionData({ id, isLoading: false }));
      return undefined;
    });
};

export const getCollectionQAs = (id: string) => (
  dispatch: Function
): Promise<ICard[]> => {
  const { setCollectionData } = actions;

  return callApiGet(`/collections/${id}/qas`)
    .then((response: AxiosResponse) => {
      dispatch(setCollectionData({ id, qaPairs: response.data || [] }));

      return (response.data || []) as IQAPair[];
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
};

export const addAnswersToCollection = (
  collectionId: string,
  answersIds: string[]
) => (dispatch: Function): Promise<void> =>
  callApiPost(`/collections/${collectionId}/answers`, answersIds)
    .then(() => {
      dispatch(getCollectionQAs(collectionId));
    })
    .catch((err) => {
      console.error(err);
    });

export const addQuestionsToCollection = (
  collectionId: string,
  questionsIds: string[]
) => (dispatch: Function): Promise<void> =>
  callApiPost(`/collections/${collectionId}/questions`, questionsIds)
    .then(() => {
      dispatch(getCollectionQuestions(collectionId));
    })
    .catch((err) => {
      console.error(err);
    });

export const getCollectionQuestions = (id: string) => (dispatch: Function) => {
  const { setCollectionData } = actions;
  return callApiGet(`/collections/${id}/questions`)
    .then((response: AxiosResponse) => {
      dispatch(setCollectionData({ id, questions: response.data }));
    })
    .catch((err) => {
      console.error(err);
    });
};

// TODO

// export const removeCardFromCollection = (
//   collectionId: string,
//   cardId: string
// ) => (dispatch: Function): Promise<void> => {};

export const deleteQuestionFromCollection = (
  collectionId: string,
  questionId: string
) => (dispatch: Function) =>
  callApiDelete(`/collections/${collectionId}/questions`, [questionId])
    .then(() => {
      dispatch(getCollectionQuestions(collectionId));
    })
    .catch((err) => {
      console.error(err);
    });

const fileHandler = async (file: File | string | undefined) => {
  if (file instanceof File) {
    const response = await filesApi.upload(file);
    if (response.data.status) {
      return response.data.data.generatedName;
    }
  } else {
    return file;
  }
};

export const updateCollectionInfo = (
  newModel: CollectionFormData
) => async () => {
  const dto: IUpdateCollectionDTO = {
    id: newModel.id as string,
    title: newModel.title,
    description: newModel.description,
    cover: await fileHandler(newModel.cover),
  };

  return collectionApi.update(dto);
};

export const createCollection = (newModel: CollectionFormData) => async () => {
  const dto: ICreateCollectionDTO = {
    title: newModel.title,
    description: newModel.description,
    cover: await fileHandler(newModel.cover),
  };

  return collectionApi.create(dto);
};
