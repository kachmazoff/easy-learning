import { AxiosError, AxiosResponse } from "axios";
import { ICard, ICollectionInfo } from "@/interfaces";
import { actions } from "./reducer";
import { callApiDelete, callApiGet, callApiPost } from "../ApiModule";
import { IQAPair } from "./types";
import { uploadImages } from "@/utils/uploadImages";
import { CollectionFormData } from "@/components/CollectionForm";

export const getCollectionInfo = (id: string) => (
  dispatch: Function
): Promise<ICollectionInfo | undefined> => {
  const { setCollectionData } = actions;

  return callApiGet(`/collections/${id}`)
    .then((response: AxiosResponse) => {
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

export const updateCollectionInfo = (
  newModel: CollectionFormData
) => async (): Promise<void> => {
  const { cover } = newModel;
  let coverGeneratedName = null;

  if (!!cover && cover instanceof File) {
    const response = await uploadImages({ cover });
    if (response.data.status) {
      coverGeneratedName = response.data.data.generatedName;
    }
  }

  const totalModel = { ...newModel, cover: coverGeneratedName };

  return callApiPost(`/collections/${newModel.id}`, totalModel)
    .then((response: AxiosResponse) => {
      console.log(response);
      //   return response.data as ICollectionInfo[];
    })
    .catch((err: AxiosError) => {
      const status = err.response?.status;
      let errorMesage = "Что-то пошло не так";

      if (status === 401 || status === 403) {
        errorMesage = "Вам нельзя редактировать эту коллекцию";
      }
      //   dispatch(onLoadFail());
      return Promise.reject(errorMesage);
    });
};
