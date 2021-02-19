import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Layout, Row, Col } from "antd";

import { getIsAuthenticated } from "@/modules/AuthModule";
import { BasePageHeader } from "./BasePageHeader";
import { SideNav } from "@/components/SideNav";
import { BlockWrapper } from "@/components/BlockWrapper";
import { UnanwseredQuestionsCard } from "@/modules/QuestionsListModule/UnansweredQuestionsCard";

const { Content } = Layout;

const menuConfig = [
  { url: "/", label: "Главная" },
  { url: "collections", label: "Коллекции" },
  { url: "questions", label: "Вопросы" },
  { url: "create/course", label: "Создать" },
  { url: "statistics", label: "Статистика" },
  { url: "6", label: "Профиль" },
];

interface ThreeColumnsLayoutProps {
  children: React.ReactNode;
  leftColumn?: React.ReactNode;
  rightColumn?: React.ReactNode;
}

export const ThreeColumnsLayout: FC<ThreeColumnsLayoutProps> = ({
  children,
  leftColumn,
  rightColumn,
}) => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <BasePageHeader isAuthenticated={isAuthenticated} />
      <Row
        justify="center"
        align="top"
        gutter={12}
        style={{ marginRight: 0, marginLeft: 0 }}
      >
        <Col span={5} xl={4} xxl={3}>
          <BlockWrapper>
            <SideNav routes={menuConfig} />
          </BlockWrapper>
          {leftColumn}
        </Col>
        <Col span={12} xl={11} xxl={9}>
          <Content>{children}</Content>
        </Col>
        <Col span={6} xl={5} xxl={4}>
          <BlockWrapper>
            <UnanwseredQuestionsCard />
          </BlockWrapper>
          {rightColumn}
        </Col>
      </Row>
    </Layout>
  );
};
