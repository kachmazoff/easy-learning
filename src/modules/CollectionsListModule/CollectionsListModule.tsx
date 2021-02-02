import React from "react";
import { connect } from "react-redux";
import { Empty, Typography } from "antd";
import { ICollectionInfo } from "@/interfaces";
import { RootState } from "@/store";
import { getAllCollections } from "./asyncActions";
import { CollectionItem } from "@/modules/CollectionModule";

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
  return (
    <div>
      <Typography.Title level={3}>Список коллекций</Typography.Title>
      {(!collections || collections.length === 0) && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      {collections?.map((collection) => (
        <CollectionItem
          key={collection.title}
          collectionInfo={collection}
          // title={collection.title}
          // description={collection.description}
        />
      ))}
    </div>
  );
};

export const CollectionsListModule = connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsListComponent);
