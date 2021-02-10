import React from "react";
import { Link } from "react-router-dom";
import { Layout, Typography } from "antd";
import { AccountWidget } from "@/modules/AuthModule";
import { DebugGridBreakpoints } from "@/components/DebugGridBreakpoints";

const { Title } = Typography;
const { Header } = Layout;

interface BasePageHeaderProps {
  isAuthenticated: boolean;
}

const isDebug = process.env.NODE_ENV === "development";

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
      {isDebug && (
        <span style={{ color: "white" }}>
          <DebugGridBreakpoints />
        </span>
      )}
      {!isAuthenticated && <Link to={"/login"}>Войти</Link>}
      {isAuthenticated && <AccountWidget />}
    </div>
  </Header>
);
