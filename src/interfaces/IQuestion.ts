export interface IQuestion {
  id: string;
  data: string;
  description?: string;
  author_id?: string;
}

export interface IQuestionExtended extends IQuestion {
  answers_count: number;
}
