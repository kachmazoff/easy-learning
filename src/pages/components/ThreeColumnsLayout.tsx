import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Layout, Row, Col } from "antd";

import { getIsAuthenticated } from "@/modules/AuthModule";
import { BasePageHeader } from "./BasePageHeader";
import { StyledCard } from "@/components/StyledCard";

const { Content } = Layout;

interface ThreeColumnsLayoutProps {
  children: React.ReactNode;
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
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
        <Col span={4} xxl={3}>
          {leftColumn}
          <StyledCard>
            <div style={{ backgroundColor: "green", height: "100px" }}></div>
          </StyledCard>
        </Col>
        <Col span={11} xxl={9}>
          <Content>{children}</Content>
        </Col>
        <Col span={5} xxl={4}>
          {rightColumn}
          <StyledCard>
            <div style={{ backgroundColor: "green", height: "100px" }}></div>
          </StyledCard>
        </Col>
      </Row>
    </Layout>
  );
};
