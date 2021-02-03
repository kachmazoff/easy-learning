import React, { useState } from "react";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { ICollectionInfo } from "@/interfaces";
import { CreateCollectionForm } from "./CreateCollectionForm";
import { createCollection } from "./asyncActions";
import { ButtonModal } from "@/components/ButtonModal";

const mapDispatchToProps = {
  createCollection,
};

export type CreateCollectionProps = {
  createCollection: (card: ICollectionInfo) => Promise<void>;
};

const defaultCollectionData: ICollectionInfo = {
  title: "",
  description: "",
};

const buttonText = [<PlusOutlined />, "Создать коллекцию"];

const CreateCollectionComponent = ({
  createCollection,
}: CreateCollectionProps): JSX.Element => {
  const [disabled, setDisabled] = React.useState(false);
  const [collectionData, setCollectionData] = useState<ICollectionInfo>(
    defaultCollectionData
  );

  const onCloseHandler = async (closingType: "submit" | "cancel") => {
    if (closingType === "submit") {
      setDisabled(true);
      await createCollection(collectionData);
      setDisabled(false);
      setCollectionData(defaultCollectionData);
    }
  };

  return (
    <ButtonModal
      type="primary"
      text={buttonText}
      modalTitle="Создание коллекции"
      okText="Создать"
      cancelText="Отменить"
      onClose={onCloseHandler}
      okDisabled={!collectionData.title || !collectionData.description}
    >
      <CreateCollectionForm
        data={collectionData}
        setData={setCollectionData}
        disabled={disabled}
      />
    </ButtonModal>
  );
};

export const CreateCollectionModule = connect(
  null,
  mapDispatchToProps
)(CreateCollectionComponent);
