import { AxiosResponse } from "axios";
import { ICard } from "@/interfaces";
import { actions } from "./reducer";
import { callApiDelete, callApiGet, callApiPost } from "../ApiModule";
import { IQAPair } from "./types";

export const getCollectionQAs = (collectionId: string) => (
  dispatch: Function
): Promise<ICard[]> => {
  const { setCollectionQAs } = actions;

  return dispatch(callApiGet(`/collections/${collectionId}/qas`))
    .then((response: AxiosResponse) => {
      dispatch(
        setCollectionQAs({ collectionId, qaPairs: response.data || [] })
      );

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

export const getCollectionQuestions = (collectionId: string) => (
  dispatch: Function
) => {
  const { setCollectionQuestions } = actions;
  return dispatch(callApiGet(`/collections/${collectionId}/questions`))
    .then((response: AxiosResponse) => {
      dispatch(
        setCollectionQuestions({ id: collectionId, questions: response.data })
      );
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
