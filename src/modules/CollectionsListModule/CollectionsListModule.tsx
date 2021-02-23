import React from "react";
import { connect } from "react-redux";
import { Empty } from "antd";
import { ICollectionInfo } from "@/interfaces";
import { RootState } from "@/store";
import { getAllCollections } from "./asyncActions";
import { CollectionsList } from "@/components/CollectionsList";

const mapStateToProps = (rootState: RootState) => ({
  collections: rootState.collectionsList.collections,
  isActual: rootState.collectionsList.isActual,
  activeUserId: rootState?.auth?.userData?.id,
});

const mapDispatchToProps = {
  getAllCollections,
};

type CollectionsListComponentProps = {
  collections: ICollectionInfo[];
  isActual: boolean;
  activeUserId?: string;
  getAllCollections: () => Promise<void | ICollectionInfo[]>;
};

const CollectionsListComponent = ({
  collections,
  isActual,
  activeUserId,
  getAllCollections,
}: CollectionsListComponentProps) => {
  React.useEffect(() => {
    if (!isActual) {
      getAllCollections();
    }
  }, [isActual]);

  const checkingEditAccess = React.useCallback(
    (collection) => collection.author_id === activeUserId,
    [activeUserId]
  );

  if (!collections || collections.length === 0) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  return (
    <CollectionsList
      collections={collections}
      checkingEditAccess={checkingEditAccess}
    />
  );
};

export const CollectionsListModule = connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsListComponent);
