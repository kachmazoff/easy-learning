import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Layout } from "antd";
import { getIsAuthenticated } from "@/modules/AuthModule";
import { BasePageHeader } from "./BasePageHeader";

const { Content } = Layout;

export const BasePage: FC = ({ children }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <BasePageHeader isAuthenticated={isAuthenticated} />
      <Content style={{ padding: "20px 50px" }}>{children}</Content>
    </Layout>
  );
};
