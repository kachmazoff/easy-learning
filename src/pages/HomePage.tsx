import React from "react";
import { useSelector } from "react-redux";
import { Space } from "antd";
import { BlockWrapper } from "@/components/BlockWrapper";
import { CreateCollectionModule } from "@/modules/CreateCollectionModule";
import { CollectionsListModule } from "@/modules/CollectionsListModule";
import { getIsAuthenticated } from "@/modules/AuthModule";
import { QuestionsListModule } from "@/modules/QuestionsListModule";
import { CreateQuestionModule } from "@/modules/CreateQuestionModule";
import { BasePage } from "./components";

export const HomePage = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  return (
    <BasePage>
      {/* <SelectAnswersForm answers={answers} /> */}
      {isAuthenticated && (
        <BlockWrapper>
          <Space>
            <CreateCollectionModule />
            <CreateQuestionModule />
          </Space>
        </BlockWrapper>
      )}
      <BlockWrapper>
        <CollectionsListModule />
      </BlockWrapper>
      <BlockWrapper>
        <QuestionsListModule />
      </BlockWrapper>
    </BasePage>
  );
};