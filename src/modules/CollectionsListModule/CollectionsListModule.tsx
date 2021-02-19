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
});

const mapDispatchToProps = {
  getAllCollections,
};

type CollectionsListComponentProps = {
  collections: ICollectionInfo[];
  isActual: boolean;
  getAllCollections: () => Promise<void | ICollectionInfo[]>;
};

const CollectionsListComponent = ({
  collections,
  isActual,
  getAllCollections,
}: CollectionsListComponentProps) => {
  React.useEffect(() => {
    if (!isActual) {
      getAllCollections();
    }
  }, [isActual]);

  if (!collections || collections.length === 0) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  return <CollectionsList collections={collections} />;
};

export const CollectionsListModule = connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsListComponent);
