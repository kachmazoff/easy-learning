export interface CollectionFormData {
  id?: string;
  title: string;
  description: string;
  cover?: string | File;
}

export interface CollectionFormProps {
  initialValues?: CollectionFormData;
  submitText?: string;
  onFinish: (object: CollectionFormData) => void;
}
