import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { CreateAnswerForm } from "./CreateAnswerForm";
import { createAnswer } from "./asyncActions";
import { validateAnswerData } from "./helpers";
import { AnswerFormData } from "./types";

const mapDispatchToProps = {
  createAnswer,
};

export type CreateAnswerProps = {
  questionId: string;
  createAnswer: (questionId: string, answer: AnswerFormData) => Promise<void>;
};

const defaultAnswerData: AnswerFormData = {
  data: "",
  description: undefined,
};

const CreateAnswerComponent = ({
  questionId,
  createAnswer,
}: CreateAnswerProps): JSX.Element => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [answerData, setAnswerData] = useState<AnswerFormData>(
    defaultAnswerData
  );

  const showModal = React.useCallback(() => {
    setVisible(true);
  }, []);

  const handleOk = () => {
    setConfirmLoading(true);
    createAnswer(questionId, answerData).then(() => {
      setVisible(false);
      setConfirmLoading(false);
      setAnswerData(defaultAnswerData);
    });
  };

  const handleCancel = React.useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        <PlusOutlined />
        Добавить ответ
      </Button>
      <Modal
        title="Создание ответа"
        visible={visible}
        onOk={handleOk}
        okText="Создать"
        cancelText="Отменить"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{
          disabled: !validateAnswerData(answerData),
        }}
      >
        <CreateAnswerForm
          data={answerData}
          setData={setAnswerData}
          disabled={confirmLoading}
        />
      </Modal>
    </>
  );
};

export const CreateAnswerModule = connect(
  null,
  mapDispatchToProps
)(CreateAnswerComponent);
