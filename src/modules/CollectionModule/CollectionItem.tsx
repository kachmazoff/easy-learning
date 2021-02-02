import React from "react";
import { Card, Button } from "antd";
import { connect } from "react-redux";
import { RootState } from "@/store";
import { ICollectionInfo } from "@/interfaces";
import { CollectionQAsModalModule } from "./CollectionQAsModal";
import { actions } from "./reducer";

const mapStateToProps = (
  rootState: RootState,
  ownProps: CollectionItemOwnProps
) => {
  const res: CollectionItemProps = {};

  // Если в store ещё нет сохранённого объекта коллекции, сохраняем
  if (
    !!ownProps.collectionInfo &&
    !!ownProps.collectionInfo.id &&
    !rootState.collection[ownProps.collectionInfo.id]
  ) {
    res.needSave = true;
  }

  if (!ownProps.collectionInfo && !!ownProps.collectionId) {
    const { collectionId } = ownProps;
    if (!!rootState.collection[collectionId]) {
      res.collectionInfo = rootState.collection[collectionId].collectionInfo;
    }
  }

  if (!!ownProps.collectionInfo && !ownProps.collectionId) {
    res.collectionId = ownProps.collectionInfo.id;
  }

  return {
    ...ownProps,
    ...res,
  };
};

const mapDispatchToProps = {
  saveCollectionInfo: actions.saveCollectionInfo,
};

type CollectionItemOwnProps = {
  collectionId?: string;
  collectionInfo?: ICollectionInfo;
};

export type CollectionItemProps = {
  needSave?: boolean;
  saveCollectionInfo: Function;
} & CollectionItemOwnProps;

export const CollectionItemComponent = ({
  collectionId,
  collectionInfo,
  needSave,
  saveCollectionInfo,
}: CollectionItemProps): JSX.Element => {
  React.useEffect(() => {
    if (needSave) {
      saveCollectionInfo({ id: collectionId, collectionInfo });
    }
  }, [needSave, collectionId, collectionInfo]);
  return (
    <Card
      title={collectionInfo?.title}
      bordered={true}
      style={{ margin: "10px 0" }}
      extra={<CollectionQAsModalModule collectionId={collectionId as string} />}
    >
      {collectionInfo?.description}
    </Card>
  );
};

export const CollectionItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionItemComponent);
