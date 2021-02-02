import React from "react";
import { Row, Col, Typography } from "antd";
import { authorizedOnlyHoc, RegistrationForm } from "../modules/AuthModule";
import { formItemLayout } from "../modules/AuthModule/formsMeta";

export const RegistrationPageComponent = () => {
  return (
    <Row
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
      }}
    >
      <Col xs={24} sm={24} lg={{ span: 12, offset: 4 }}>
        <Row>
          <Col sm={{ offset: formItemLayout.labelCol.sm.span }}>
            <Typography.Title level={2}>Регистрация</Typography.Title>
          </Col>
        </Row>
        <RegistrationForm />
      </Col>
    </Row>
  );
};

export const RegistrationPage = authorizedOnlyHoc(
  RegistrationPageComponent,
  "/",
  true
);
