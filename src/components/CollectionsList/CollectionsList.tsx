import React from "react";
import { CollectionCard } from "../CollectionCard";
import { ICollectionInfo } from "@/interfaces";

interface CollectionsListProps {
  collections: ICollectionInfo[];
}

// TODO

const getImageUrl = (filename: string) =>
  `http://localhost:8000/files/download?filename=${filename}`;

export const CollectionsList = ({ collections }: CollectionsListProps) => {
  return (
    <>
      {collections?.map((collection) => (
        <CollectionCard
          key={collection.title}
          title={collection.title}
          imageUrl={
            !!collection.cover
              ? getImageUrl(collection.cover as string)
              : undefined
          }
          link=""
        />
      ))}
    </>
  );
};
