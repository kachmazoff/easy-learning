import React from "react";
import { useSelector } from "react-redux";
import { Space } from "antd";
import { BlockWrapper } from "@/components/BlockWrapper";
import { getIsAuthenticated } from "@/modules/AuthModule";
import { QuestionsListModule } from "@/modules/QuestionsListModule";
import { CreateQuestionModule } from "@/modules/CreateQuestionModule";
import { ThreeColumnsLayout } from "./components";

export const QuestionsPage = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  return (
    <ThreeColumnsLayout>
      {isAuthenticated && (
        <BlockWrapper>
          <Space>
            <CreateQuestionModule />
          </Space>
        </BlockWrapper>
      )}
      <BlockWrapper>
        <QuestionsListModule />
      </BlockWrapper>
    </ThreeColumnsLayout>
  );
};
