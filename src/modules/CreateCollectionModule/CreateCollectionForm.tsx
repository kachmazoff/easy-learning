import React from "react";
import { Form, Input } from "antd";
import { ICard } from "@/interfaces";

export type CreateCollectionFormProps = {
  data: ICard;
  disabled: boolean;
  setData: Function;
};

export const CreateCollectionForm = ({
  data,
  disabled,
  setData,
}: CreateCollectionFormProps): JSX.Element => {
  const onChangeHandler = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      const { name, value } = event.target;
      setData((oldData) => ({ ...oldData, [name]: value }));
    },
    [setData]
  );

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 24 }}
      layout="vertical"
      onChange={onChangeHandler}
    >
      <Form.Item label="Заголовок" required>
        <Input name="title" value={data.title} disabled={disabled} />
      </Form.Item>
      <Form.Item label="Описание" required>
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
