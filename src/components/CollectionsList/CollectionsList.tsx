import React from "react";
import { CollectionCard } from "../CollectionCard";
import { ICollectionInfo } from "@/interfaces";

interface CollectionsListProps {
  collections: ICollectionInfo[];
}

// TODO

export const CollectionsList = ({ collections }: CollectionsListProps) => {
  return (
    <>
      {collections?.map((collection) => (
        <CollectionCard
          key={collection.title}
          title={collection.title}
          coverUrl={collection.cover as string}
          hideCover
          editLink={`/editCollection/${collection.id}`}
          // link={`/editCollection/${collection.id}`}
        />
      ))}
    </>
  );
};
