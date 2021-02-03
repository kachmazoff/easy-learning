import React from "react";
import { Form, Input } from "antd";
import { AnswerFormData } from "./types";

export type CreateAnswerFormProps = {
  data: AnswerFormData;
  disabled: boolean;
  setData: Function;
};

export const CreateAnswerForm = ({
  data,
  disabled,
  setData,
}: CreateAnswerFormProps): JSX.Element => {
  const onChangeHandler = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      const { name, value } = event.target;
      setData((oldData: any) => ({ ...oldData, [name]: value }));
    },
    [setData]
  );

  return (
    <Form
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      layout="vertical"
      onChange={onChangeHandler}
    >
      <Form.Item label="Ответ" required>
        <Input name="data" value={data.data} disabled={disabled} />
      </Form.Item>
      <Form.Item label="Описание / комментарий">
        <Input.TextArea
          rows={3}
          name="description"
          value={data.description}
          disabled={disabled}
        />
      </Form.Item>
    </Form>
  );
};
