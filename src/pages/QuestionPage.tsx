import React from "react";
import { useSelector } from "react-redux";
import { Space } from "antd";
import { getIsAuthenticated, getAuthState } from "@/modules/AuthModule";
import { BasePage } from "./components";
import { QuestionModule } from "@/modules/QuestionModule/QuestionModule";
import { QuestionAnswers } from "@/modules/QuestionModule/QuestionAnswers";
import { CreateAnswerModule } from "@/modules/CreateAnswerModule/CreateAnswerModule";
import { BlockWrapper } from "@/components/BlockWrapper";
import { QuestionModuleWrapper } from "@/modules/QuestionModule/QuestionModuleWrapper";

export const QuestionPage = ({ match }) => {
  const questionId = match.params.id;
  const isAuthenticated = useSelector(getIsAuthenticated);
  const authState = useSelector(getAuthState);
  return (
    <BasePage>
      <QuestionModuleWrapper questionId={questionId}>
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
      </QuestionModuleWrapper>
    </BasePage>
  );
};
