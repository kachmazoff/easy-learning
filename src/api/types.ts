export interface ICollectionDTO {
  id: string;
  created: string;
  updated: string | null;

  title: string;
  description: string;
  author_id: string;

  cover: string | null;
}

export interface ICreateCollectionDTO {
  title: string;
  description: string;

  cover?: string;
}

export interface IUpdateCollectionDTO extends ICreateCollectionDTO {
  id: string;
}
