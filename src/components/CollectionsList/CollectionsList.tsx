import React from "react";
import { filesApi } from "@/api";
import { ICollectionInfo } from "@/interfaces";
import { CollectionCard } from "../CollectionCard";

interface CollectionsListProps {
  collections: ICollectionInfo[];
  checkingEditAccess?: (collection: ICollectionInfo) => boolean;
}

// TODO

export const CollectionsList = ({
  collections,
  checkingEditAccess,
}: CollectionsListProps) => {
  return (
    <>
      {collections?.map((collection) => (
        <CollectionCard
          key={collection.title}
          title={collection.title}
          coverUrl={
            !!collection.cover ? filesApi.getUrl(collection.cover) : undefined
          }
          editLink={`/editCollection/${collection.id}`}
          canEdit={
            typeof checkingEditAccess === "function"
              ? checkingEditAccess(collection)
              : !!checkingEditAccess
          }
          // link={`/editCollection/${collection.id}`}
        />
      ))}
    </>
  );
};
