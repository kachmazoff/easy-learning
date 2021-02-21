import { AxiosResponse } from "axios";
import { ICard, ICollectionInfo } from "@/interfaces";
import { actions } from "./reducer";
import { callApiDelete, callApiGet, callApiPost } from "../ApiModule";
import { IQAPair } from "./types";
import { uploadImages } from "@/utils/uploadImages";

export const getCollectionInfo = (id: string) => (
  dispatch: Function
): Promise<ICollectionInfo | undefined> => {
  const { setCollectionData } = actions;

  return dispatch(callApiGet(`/collections/${id}`))
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

  return dispatch(callApiGet(`/collections/${id}/qas`))
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
) => (dispatch: Function): Promise<void> => {
  return dispatch(
    callApiPost(`/collections/${collectionId}/answers`, answersIds)
  )
    .then((response: AxiosResponse) => {
      dispatch(getCollectionQAs(collectionId));
    })
    .catch((err) => {
      console.error(err);
    });
};

export const addQuestionsToCollection = (
  collectionId: string,
  questionsIds: string[]
) => (dispatch: Function): Promise<void> => {
  return dispatch(
    callApiPost(`/collections/${collectionId}/questions`, questionsIds)
  )
    .then((response: AxiosResponse) => {
      dispatch(getCollectionQuestions(collectionId));
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getCollectionQuestions = (id: string) => (dispatch: Function) => {
  const { setCollectionData } = actions;
  return dispatch(callApiGet(`/collections/${id}/questions`))
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
) => (dispatch: Function) => {
  dispatch(
    callApiDelete(`/collections/${collectionId}/questions`, [questionId])
  )
    .then((response) => {
      dispatch(getCollectionQuestions(collectionId));
    })
    .catch((err) => {
      console.error(err);
    });
};

export const updateCollectionInfo = (newModel: ICollectionInfo) => async (
  dispatch: Function
): Promise<void> => {
  const { cover } = newModel;
  let coverGeneratedName = null;

  if (!!cover && cover instanceof File) {
    const response = await uploadImages({ cover });
    if (response.data.status) {
      coverGeneratedName = response.data.data.generatedName;
    }
  }

  const totalModel = { ...newModel, cover: coverGeneratedName };

  return dispatch(callApiPost(`/collections/${newModel.id}`, totalModel))
    .then((response: AxiosResponse) => {
      console.log(response);

      //   return response.data as ICollectionInfo[];
    })
    .catch((err) => {
      console.error(err);
      //   dispatch(onLoadFail());
    });
};
