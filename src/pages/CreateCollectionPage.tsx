import React from "react";
import axios from "axios";
import { ThreeColumnsLayout } from "./components";
import { CollectionForm } from "@/components/CollectionForm";
import { uploadImages } from "@/utils/uploadImages";

const onCreateCollection = async ({ cover, ...model }) => {
  let coverGeneratedName = null;

  if (!!cover) {
    const response = await uploadImages({ cover });
    if (response.data.status) {
      coverGeneratedName = response.data.data.generatedName;
    }
  }

  const totalModel = { ...model, cover: coverGeneratedName };

  axios.post("http://localhost:8000/collections", totalModel, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const CreateCollectionPage = ({}) => (
  <ThreeColumnsLayout>
    <h1>Создание курса</h1>
    <CollectionForm onFinish={onCreateCollection} />
  </ThreeColumnsLayout>
);
