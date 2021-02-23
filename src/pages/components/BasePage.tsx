import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Layout } from "antd";

import { getIsAuthenticated } from "@/modules/AuthModule";
import { BasePageHeader } from "./BasePageHeader";
import { BaseSider } from "./BaseSider";

const { Content } = Layout;

export const BasePage: FC = ({ children }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <BasePageHeader isAuthenticated={isAuthenticated} />
      <Layout>
        {/* <BaseSider /> */}
        <Content style={{ padding: "16px 24px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
};
