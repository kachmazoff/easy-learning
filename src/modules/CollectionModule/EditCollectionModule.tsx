import React from "react";
import { connect } from "react-redux";
import { Spin } from "antd";

import {
  CollectionForm,
  CollectionFormData,
} from "@/components/CollectionForm";
import { ICollectionInfo } from "@/interfaces";
import { RootState } from "@/store";
import { getCollectionInfo, updateCollectionInfo } from "./asyncActions";
import { collectionSlice } from "./reducer";
import { ICollectionFull } from "./types";

const mapStateToProps = (
  rootState: RootState,
  ownProps: EditCollectionOwnProps
) => {
  const { collectionId } = ownProps;
  const collectionData: ICollectionFull | undefined =
    rootState[collectionSlice.name][collectionId];

  return { initialModel: collectionData?.collectionInfo };
};

const mapDispatchToProps = {
  onSubmit: updateCollectionInfo,
  loadModel: getCollectionInfo,
};

interface EditCollectionOwnProps {
  collectionId: string;
}

interface EditCollectionProps extends EditCollectionOwnProps {
  initialModel?: ICollectionInfo;
  onSubmit: (newModel: CollectionFormData) => void;
  loadModel: (collectiondId: string) => void;
}

const EditCollectionComponent = ({
  collectionId,
  initialModel,
  onSubmit,
  loadModel,
}: EditCollectionProps) => {
  React.useEffect(() => {
    if (!initialModel) {
      loadModel(collectionId);
    }
  }, [initialModel, collectionId]);

  if (!initialModel) {
    return <Spin />;
  }

  return (
    <CollectionForm
      initialValues={initialModel}
      submitText="Сохранить"
      //   onFinish={onSubmit}
      onFinish={console.log}
    />
  );
};

export const EditCollectionModule = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCollectionComponent);
