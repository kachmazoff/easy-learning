import React, { useState } from "react";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { IQuestion } from "@/interfaces";
import { CreateQuestionForm } from "./CreateQuestionForm";
import { createQuestion } from "./asyncActions";
import { validateQuestionData } from "./helpers";
import { ButtonModal } from "@/components/ButtonModal";

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

const buttonText = "Создать вопрос";

const CreateQuestionComponent = ({
  createQuestion,
}: CreateQuestionProps): JSX.Element => {
  const [disabled, setDisabled] = React.useState(false);
  const [questionData, setQuestionData] = useState<IQuestion>(
    defaultQuestionData
  );

  const onCloseHandler = async (closingType: "submit" | "cancel") => {
    if (closingType === "submit") {
      setDisabled(true);
      await createQuestion(questionData);
      setDisabled(false);
      setQuestionData(defaultQuestionData);
    }
  };

  return (
    <ButtonModal
      type="primary"
      text={buttonText}
      modalTitle="Создание вопроса"
      okText="Создать"
      cancelText="Отменить"
      onClose={onCloseHandler}
      okDisabled={!validateQuestionData(questionData)}
    >
      <CreateQuestionForm
        data={questionData}
        setData={setQuestionData}
        disabled={disabled}
      />
    </ButtonModal>
  );
};

export const CreateQuestionModule = connect(
  null,
  mapDispatchToProps
)(CreateQuestionComponent);
