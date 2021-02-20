import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input, Tooltip, Checkbox, Button, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { formItemLayout } from "./formsMeta";
import styles from "./LoginForm.module.css";
import { registration } from "./asyncActions";
import { IRegistrationFormData } from "./types";

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const mapDispatchToProps = {
  registration: registration,
};

export const RegistrationFormComponent = ({ registration }) => {
  const [form] = Form.useForm();
  const [submitDisabled, setSubmitDisabled] = React.useState(false);

  const onSubmit = React.useCallback(
    (formData: IRegistrationFormData) => {
      setSubmitDisabled(true);
      registration(formData)
        .then(() => message.success("Вы успешно зарегистрировались"))
        .catch(() => message.error("Что-то пошло не так :("))
        .finally(() => setSubmitDisabled(false));
    },
    [registration]
  );

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onSubmit}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "Введённый E-mail не является валидным!",
          },
          {
            required: true,
            message: "Пожалуйста, введите ваш E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Пароль"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите пароль!",
          },
          {
            min: 4,
            message: "Минимальная длина пароля 4 символа",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Подтвердите пароль"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Пожалуйста, подтвердите ваш пароль!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject("Пароли не совпадают!");
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="username"
        label={
          <span>
            Username&nbsp;
            <Tooltip title="Ваше уникальное имя, которое будет видно всем пользователям">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите username!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject("Should accept agreement"),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          Я ознакомился и согласен с <a href="">условиями конфедициальности.</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button
          type="primary"
          htmlType="submit"
          className={styles["login-form-button"]}
          disabled={submitDisabled}
        >
          Зарегистрироваться
        </Button>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </Form.Item>
    </Form>
  );
};

export const RegistrationForm = connect(
  null,
  mapDispatchToProps
)(RegistrationFormComponent);
