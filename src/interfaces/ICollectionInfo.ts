export interface ICollectionInfo {
  id?: string;
  author_id: string;
  title: string;
  description: string;
  cover?: string;
}

export interface ICollectionInfoExtended {
  questions_count: number;
}
