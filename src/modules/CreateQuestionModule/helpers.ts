import { IQuestion } from "@/interfaces";

export const validateQuestionData = (data: IQuestion) => !!data.data;
