import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { getToken } from "./asyncActions";
import { ILoginFormData } from "./types";
import { formItemLayout } from "./formsMeta";
import styles from "./LoginForm.module.css";

const mapDispatchToProps = {
  onSubmit: getToken,
};

interface LoginFormProps {
  onSubmit: (values: ILoginFormData) => void;
}

const LoginFormComponent = ({ onSubmit }: LoginFormProps) => {
  return (
    <Form
      {...formItemLayout}
      name="normal_login"
      className={styles["login-form"]}
      initialValues={{
        remember: true,
      }}
      onFinish={onSubmit}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Введите username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className={styles["site-form-item-icon"]} />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Введите пароль!",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className={styles["site-form-item-icon"]} />}
          placeholder="Пароль"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item>

        <a className={styles["login-form-forgot"]} href="">
          Забыл(а) пароль
        </a>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={styles["login-form-button"]}
        >
          Войти
        </Button>
        Или <Link to="/registration">зарегистрируйтесь сейчас!</Link>
      </Form.Item>
    </Form>
  );
};

export const LoginForm = connect(null, mapDispatchToProps)(LoginFormComponent);
