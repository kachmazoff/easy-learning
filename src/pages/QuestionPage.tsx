import React from "react";
import { useSelector } from "react-redux";
import { Space } from "antd";
import { getIsAuthenticated, getAuthState } from "@/modules/AuthModule";
import { BasePage } from "./components";
import { QuestionModule } from "@/modules/QuestionModule/QuestionModule";
import { QuestionAnswers } from "@/modules/QuestionModule/QuestionAnswers";
import { CreateAnswerModule } from "@/modules/CreateAnswerModule/CreateAnswerModule";
import { BlockWrapper } from "@/components/BlockWrapper";

export const QuestionPage = ({ match }) => {
  const questionId = match.params.id;
  const isAuthenticated = useSelector(getIsAuthenticated);
  const authState = useSelector(getAuthState);
  return (
    <BasePage>
      <QuestionModule questionId={questionId} />
      {isAuthenticated && (
        <BlockWrapper>
          <Space>
            <CreateAnswerModule questionId={questionId} />
          </Space>
        </BlockWrapper>
      )}
      <QuestionAnswers
        questionId={questionId}
        activeUserId={authState.userData?.id}
      />
    </BasePage>
  );
};
