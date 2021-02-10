import React, { FC } from "react";
import { connect } from "react-redux";
import { Result, Skeleton } from "antd";
import { RootState } from "@/store";
import { collectionSlice } from "./reducer";
import { getCollectionQuestions } from "./asyncActions";

const mapStateToProps = (
  rootState: RootState,
  ownProps: CollectionWrapperOwnProps
) => {
  const { collectionId } = ownProps;
  const collectionData = rootState[collectionSlice.name][collectionId];

  return {
    // TODO: корректно ли проверять существование через поле questions?
    exist: !!collectionData?.questions,
    needInit: !collectionData,
    isLoading: !!collectionData?.isLoading,
  };
};

// TODO: корректно ли инициализировать state этим запросом?
const mapDispatchToProps = {
  initCollection: getCollectionQuestions,
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
        subTitle="Похоже, такого вопроса не существует"
      />
    );
  }

  return <>{children}</>;
};

export const CollectionModuleWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionWrapperComponent);
