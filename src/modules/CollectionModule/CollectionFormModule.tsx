import React from "react";
import { connect } from "react-redux";

import {
  CollectionForm,
  CollectionFormData,
} from "@/components/CollectionForm";
import { ICollectionInfo } from "@/interfaces";
import { RootState } from "@/store";
import { createCollection, updateCollectionInfo } from "./asyncActions";
import { collectionSlice } from "./reducer";
import { ICollectionFull } from "./types";

const mapStateToProps = (
  rootState: RootState,
  ownProps: CollectionFormOwnProps
) => {
  const { collectionId } = ownProps;
  if (!collectionId) {
    return {};
  }

  const collectionData: ICollectionFull | undefined =
    rootState[collectionSlice.name][collectionId];

  return { initialModel: collectionData?.collectionInfo };
};

const mapDispatchToProps = (dispatch, ownProps: CollectionFormOwnProps) => {
  if (!!ownProps.collectionId) {
    return {
      onSubmit: (newModel: CollectionFormData) =>
        dispatch(updateCollectionInfo(newModel)),
    };
  } else {
    return {
      onSubmit: (newModel: CollectionFormData) =>
        dispatch(createCollection(newModel)),
    };
  }
};

interface CollectionFormOwnProps {
  collectionId?: string;
  onSuccess?: () => any;
  onFailed?: (errorMessage: string) => any;
  onFinish?: () => any;
}

interface CollectionFormProps extends CollectionFormOwnProps {
  initialModel?: ICollectionInfo;
  onSubmit: (newModel: CollectionFormData) => Promise<void>;
}

const CollectionFormComponent = ({
  collectionId,
  initialModel,
  onSubmit,
  onSuccess,
  onFailed,
  onFinish,
}: CollectionFormProps) => {
  const onSubmitHandler = React.useCallback(
    (arg) => onSubmit(arg).then(onSuccess).catch(onFailed).finally(onFinish),
    [onSubmit]
  );

  return (
    <CollectionForm
      initialValues={initialModel}
      submitText={!!collectionId ? "Сохранить" : "Создать"}
      onFinish={onSubmitHandler}
    />
  );
};

export const CollectionFormModule = connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionFormComponent);
