import React from "react";
import { Empty, List } from "antd";
import { IQuestion } from "@/interfaces";
import { DeleteFilled, DeleteOutlined } from "@ant-design/icons";

export const listLocale = {
  emptyText: (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description="Нет привязанных вопросов"
    />
  ),
};

export const questionsListRenderItem = (
  question: IQuestion,
  onDelete: Function,
  editable: boolean
) => (
  <List.Item
    actions={
      editable
        ? [
            <a key="list-loadmore-more" onClick={() => onDelete(question.id)}>
              {/* <DeleteOutlined /> */}
              {/* <DeleteFilled /> */}
              удалить
            </a>,
          ]
        : []
    }
  >
    <List.Item.Meta title={question.data} description={question.description} />
  </List.Item>
);
