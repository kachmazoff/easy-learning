import React from "react";
import { Form, Input } from "antd";
import { IQuestion } from "@/interfaces";

export type CreateQuestionFormProps = {
  data: IQuestion;
  disabled: boolean;
  setData: Function;
};

export const CreateQuestionForm = ({
  data,
  disabled,
  setData,
}: CreateQuestionFormProps): JSX.Element => {
  const onChangeHandler = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      const { name, value } = event.target;
      setData((oldData: any) => ({ ...oldData, [name]: value }));
    },
    [setData]
  );

  return (
    <Form
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 24 }}
      layout="vertical"
      onChange={onChangeHandler}
    >
      <Form.Item label="Вопрос" required>
        <Input name="data" value={data.data} disabled={disabled} />
      </Form.Item>
      <Form.Item label="Описание / комментарий">
        <Input.TextArea
          rows={5}
          name="description"
          value={data.description}
          disabled={disabled}
        />
      </Form.Item>
    </Form>
  );
};
