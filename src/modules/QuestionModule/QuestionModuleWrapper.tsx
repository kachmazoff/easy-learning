import React, { FC } from "react";
import { connect } from "react-redux";
import { Result, Skeleton } from "antd";
import { RootState } from "@/store";
import { getQuestionInfo } from "./asyncActions";
import { questionSlice } from "./reducer";

const mapStateToProps = (
  rootState: RootState,
  ownProps: QuestionWrapperOwnProps
) => {
  const { questionId } = ownProps;
  const questionData = rootState[questionSlice.name][questionId];

  return {
    exist: !!questionData?.question,
    needInit: !questionData,
    isLoading: !!questionData?.isLoading,
  };
};

const mapDispatchToProps = {
  initQuestion: getQuestionInfo,
};

interface QuestionWrapperOwnProps {
  questionId: string;
  children: React.ReactNode;
}

interface QuestionWrapperProps extends QuestionWrapperOwnProps {
  exist: boolean;
  needInit: boolean;
  isLoading: boolean;
  initQuestion: (questionId: string) => any;
}

const QuestionWrapperComponent: FC<QuestionWrapperProps> = ({
  questionId,
  exist,
  needInit,
  isLoading,
  children,
  initQuestion,
}) => {
  React.useEffect(() => {
    if (needInit) {
      initQuestion(questionId);
    }
  }, [needInit, initQuestion, questionId]);

  if (isLoading || needInit) {
    return <Skeleton />;
  }

  if (!isLoading && !needInit && !exist) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Похоже, такого вопроса не существует"
      />
    );
  }

  return <>{children}</>;
};

export const QuestionModuleWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionWrapperComponent);
