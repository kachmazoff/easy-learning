import React, { FC } from "react";
import { connect } from "react-redux";
import { Result, Skeleton } from "antd";
import { RootState } from "@/store";
import { collectionSlice } from "./reducer";
import { getCollectionInfo } from "./asyncActions";

const mapStateToProps = (
  rootState: RootState,
  ownProps: CollectionWrapperOwnProps
) => {
  const { collectionId } = ownProps;
  const collectionData = rootState[collectionSlice.name][collectionId];

  return {
    exist: !!collectionData?.collectionInfo,
    needInit: !collectionData,
    isLoading: !!collectionData?.isLoading,
  };
};

const mapDispatchToProps = {
  initCollection: getCollectionInfo,
};

interface CollectionWrapperOwnProps {
  collectionId: string;
  children: React.ReactNode;
}

interface CollectionWrapperProps extends CollectionWrapperOwnProps {
  exist: boolean;
  needInit: boolean;
  isLoading: boolean;
  initCollection: (collectionId: string) => any;
}

// TODO: вынести в отдельный компонент и объединить с QuestionWrapperComponent
const CollectionWrapperComponent: FC<CollectionWrapperProps> = ({
  collectionId,
  exist,
  needInit,
  isLoading,
  children,
  initCollection,
}) => {
  React.useEffect(() => {
    if (needInit) {
      initCollection(collectionId);
    }
  }, [needInit, initCollection, collectionId]);

  if (isLoading || needInit) {
    return <Skeleton />;
  }

  if (!isLoading && !needInit && !exist) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Похоже, такой коллекции не существует"
      />
    );
  }

  return (
    <>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { collectionId })
      )}
    </>
  );
};

export const CollectionModuleWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionWrapperComponent);
