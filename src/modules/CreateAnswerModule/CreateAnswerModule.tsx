import React, { useState } from "react";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { CreateAnswerForm } from "./CreateAnswerForm";
import { createAnswer } from "./asyncActions";
import { validateAnswerData } from "./helpers";
import { AnswerFormData } from "./types";
import { ButtonModal } from "@/components/ButtonModal";

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

const buttonText = "Добавить ответ";

const CreateAnswerComponent = ({
  questionId,
  createAnswer,
}: CreateAnswerProps): JSX.Element => {
  const [disabled, setDisabled] = React.useState(false);
  const [answerData, setAnswerData] = useState<AnswerFormData>(
    defaultAnswerData
  );

  const onCloseHandler = async (closingType: "submit" | "cancel") => {
    if (closingType === "submit") {
      setDisabled(true);
      await createAnswer(questionId, answerData);
      setDisabled(false);
      setAnswerData(defaultAnswerData);
    }
  };

  return (
    <ButtonModal
      type="primary"
      text={buttonText}
      modalTitle="Создание ответа"
      okText="Создать"
      cancelText="Отменить"
      onClose={onCloseHandler}
      okDisabled={!validateAnswerData(answerData)}
    >
      <CreateAnswerForm
        data={answerData}
        setData={setAnswerData}
        disabled={disabled}
      />
    </ButtonModal>
  );
};

export const CreateAnswerModule = connect(
  null,
  mapDispatchToProps
)(CreateAnswerComponent);
