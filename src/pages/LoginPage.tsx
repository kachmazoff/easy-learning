import React from "react";
import { Row, Col, Typography } from "antd";
import { authorizedOnlyHoc, LoginForm } from "../modules/AuthModule";

export const LoginPageComponent = () => {
  return (
    <Row
      justify="center"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
      }}
    >
      <Col xs={24} sm={{ span: 18, offset: 4 }} lg={{ span: 12, offset: 4 }}>
        <Typography.Title level={2}>Вход</Typography.Title>
        <LoginForm />
      </Col>
    </Row>
  );
};

export const LoginPage = authorizedOnlyHoc(LoginPageComponent, "/", true);
