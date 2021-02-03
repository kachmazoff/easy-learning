import React from "react";
import { Link } from "react-router-dom";
import { Layout, Typography } from "antd";
import { AccountWidget } from "@/modules/AuthModule";

const { Title } = Typography;
const { Header } = Layout;

interface BasePageHeaderProps {
  isAuthenticated: boolean;
}

export const BasePageHeader = ({ isAuthenticated }: BasePageHeaderProps) => (
  <Header>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link to="/">
        <Title
          level={3}
          style={{ color: "white", margin: "0", lineHeight: "64px" }}
        >
          eLearning
        </Title>
      </Link>
      {!isAuthenticated && <Link to={"/login"}>Войти</Link>}
      {isAuthenticated && <AccountWidget />}
    </div>
  </Header>
);
