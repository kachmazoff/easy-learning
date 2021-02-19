import React from "react";
import { Button, Form, Input } from "antd";
import { SingleFileInput } from "../SingleFileInput";

export interface CollectionFormData {
  title: string;
  description: string;
  cover?: string | File;
}

interface CollectionFormProps {
  initialValues?: CollectionFormData;
  submitText?: string;
  onFinish: (object: CollectionFormData) => void;
}

export const CollectionForm = ({
  initialValues,
  submitText,
  onFinish,
}: CollectionFormProps) => (
  <Form
    labelCol={{ span: 6 }}
    wrapperCol={{ span: 24 }}
    layout="vertical"
    onFinish={onFinish}
    initialValues={initialValues}
  >
    <Form.Item label="Обложка" name="cover" rules={[{ required: false }]}>
      <SingleFileInput placeholder="Выберите обложку" />
    </Form.Item>
    <Form.Item
      label="Заголовок"
      name="title"
      rules={[
        {
          required: true,
          message: "Пожалуйста, назовите вашу коллекцию!",
        },
        {
          message: "Максимальная длина названия - 50 символов",
          max: 50,
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Описание"
      name="description"
      rules={[
        {
          required: true,
          message: "Пожалуйста, опишите коллекцию!",
          max: 255,
        },
      ]}
    >
      <Input.TextArea rows={5} maxLength={255} showCount />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        {submitText}
      </Button>
    </Form.Item>
  </Form>
);

CollectionForm.defaultProps = {
  submitText: "Создать",
};
