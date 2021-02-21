import React from "react";
import { ThreeColumnsLayout } from "./components";
import {
  CollectionModuleWrapper,
  EditCollectionModule,
} from "@/modules/CollectionModule";

export const EditCollectionPage = ({ match }) => {
  const collectionId = match.params.id;
  console.log({ collectionId });

  return (
    <ThreeColumnsLayout>
      <h1>Редактирование коллекции</h1>
      <CollectionModuleWrapper collectionId={collectionId}>
        <EditCollectionModule collectionId={collectionId} />
      </CollectionModuleWrapper>
    </ThreeColumnsLayout>
  );
};
