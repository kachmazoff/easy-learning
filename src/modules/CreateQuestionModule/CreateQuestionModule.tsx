import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { IQuestion } from "@/interfaces";
import { CreateQuestionForm } from "./CreateQuestionForm";
import { createQuestion } from "./asyncActions";
import { validateQuestionData } from "./helpers";

const mapDispatchToProps = {
  createQuestion,
};

export type CreateQuestionProps = {
  createQuestion: (question: IQuestion) => Promise<void>;
};

const defaultQuestionData: IQuestion = {
  data: "",
  description: undefined,
};

const CreateQuestionComponent = ({
  createQuestion,
}: CreateQuestionProps): JSX.Element => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [questionData, setQuestionData] = useState<IQuestion>(
    defaultQuestionData
  );

  const showModal = React.useCallback(() => {
    setVisible(true);
  }, []);

  const handleOk = () => {
    setConfirmLoading(true);
    createQuestion(questionData).then(() => {
      setVisible(false);
      setConfirmLoading(false);
      setQuestionData(defaultQuestionData);
    });
  };

  const handleCancel = React.useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        <PlusOutlined />
        Создать вопрос
      </Button>
      <Modal
        title="Создание вопроса"
        visible={visible}
        onOk={handleOk}
        okText="Создать"
        cancelText="Отменить"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{
          disabled: !validateQuestionData(questionData),
        }}
      >
        <CreateQuestionForm
          data={questionData}
          setData={setQuestionData}
          disabled={confirmLoading}
        />
      </Modal>
    </>
  );
};

export const CreateQuestionModule = connect(
  null,
  mapDispatchToProps
)(CreateQuestionComponent);
