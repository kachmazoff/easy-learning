import { IAnswer, ICollectionInfo, IQuestion } from "@/interfaces";

export interface IQAPair {
  question: IQuestion;
  answer: IAnswer;
}

export interface ICollectionFull {
  collectionInfo: ICollectionInfo;
  qaPairs?: IQAPair[];
  questions?: IQuestion[];
}
