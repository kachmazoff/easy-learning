import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ICollectionInfo } from "@/interfaces";
import { CreateCollectionForm } from "./CreateCollectionForm";
import { createCollection } from "./asyncActions";

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

const CreateCollectionComponent = ({
  createCollection,
}: CreateCollectionProps): JSX.Element => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [collectionData, setCollectionData] = useState<ICollectionInfo>(
    defaultCollectionData
  );

  const showModal = React.useCallback(() => {
    setVisible(true);
  }, []);

  const handleOk = () => {
    setConfirmLoading(true);
    createCollection(collectionData).then(() => {
      setVisible(false);
      setConfirmLoading(false);
      setCollectionData(defaultCollectionData);
    });
  };

  const handleCancel = React.useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        <PlusOutlined />
        Создать коллекцию
      </Button>
      <Modal
        title="Создание коллекции"
        visible={visible}
        onOk={handleOk}
        okText="Создать"
        cancelText="Отменить"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{
          disabled: !collectionData.title || !collectionData.description,
        }}
      >
        <CreateCollectionForm
          data={collectionData}
          setData={setCollectionData}
          disabled={confirmLoading}
        />
      </Modal>
    </>
  );
};

export const CreateCollectionModule = connect(
  null,
  mapDispatchToProps
)(CreateCollectionComponent);
