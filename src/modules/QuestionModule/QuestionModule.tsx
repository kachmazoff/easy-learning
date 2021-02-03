import React from "react";
import { connect } from "react-redux";
import { Descriptions, Typography } from "antd";
import { RootState } from "@/store";
import { IQuestion } from "@/interfaces";
import { getQuestionInfo } from "./asyncAction";
import { questionSlice } from "./reducer";

const mapStateToProps = (
  rootState: RootState,
  ownProps: QuestionModuleOwnProps
) => {
  const { questionId } = ownProps;
  const questionData = rootState[questionSlice.name][questionId] || {};

  return {
    info: questionData.question || undefined,
  };
};

const mapDispatchToProps = {
  getInfo: getQuestionInfo,
};

interface QuestionModuleOwnProps {
  questionId: string;
}

interface QuestionModuleProps extends QuestionModuleOwnProps {
  info?: IQuestion;
  getInfo: (questionId: string) => any;
}

const QuestionComponent = ({
  questionId,
  info,
  getInfo,
}: QuestionModuleProps) => {
  React.useEffect(() => {
    if (!info) {
      getInfo(questionId);
    }
  }, [questionId, info, getInfo]);

  return (
    <div>
      <Typography.Title>{info?.data}</Typography.Title>
      {!!info?.description && (
        <Typography.Paragraph>{info?.description}</Typography.Paragraph>
      )}
    </div>
  );
};

export const QuestionModule = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionComponent);
