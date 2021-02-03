import React, { FC, useState } from "react";
import { Modal, Button } from "antd";

type ClosingType = "submit" | "cancel";
type ButtonType =
  | "text"
  | "link"
  | "ghost"
  | "primary"
  | "default"
  | "dashed"
  | undefined;

interface ButtonModalProps {
  type?: ButtonType;
  text: React.ReactNode;
  okDisabled?: boolean;
  modalTitle?: React.ReactNode;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;

  onOpen: () => void;
  onClose: (type: ClosingType) => Promise<void>;
}

export const ButtonModal: FC<ButtonModalProps> = ({
  type,
  children,
  text,
  modalTitle,
  okText,
  cancelText,
  okDisabled,
  onClose,
  onOpen,
}) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = React.useCallback(() => {
    onOpen();
    setVisible(true);
  }, [onOpen]);

  const handleOk = React.useCallback(async () => {
    setConfirmLoading(true);
    await onClose("submit");
    setVisible(false);
    setConfirmLoading(false);
  }, [onClose]);

  const handleCancel = React.useCallback(async () => {
    await onClose("cancel");
    setVisible(false);
  }, [onClose]);

  return (
    <>
      <Button type={type} onClick={showModal}>
        {text}
      </Button>
      <Modal
        title={modalTitle}
        visible={visible}
        onOk={handleOk}
        okText={okText}
        cancelText={cancelText}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{ disabled: okDisabled }}
      >
        {children}
      </Modal>
    </>
  );
};
