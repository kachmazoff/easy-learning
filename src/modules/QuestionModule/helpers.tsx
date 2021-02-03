import React from "react";
import { Tag, Space, Empty } from "antd";
import { ColumnsType } from "antd/lib/table";
import { IAnswer } from "@/interfaces";

export const columns: ColumnsType<AnswerTableData> = [
  {
    title: "Ответ",
    dataIndex: "data",
    key: "data",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Комментарий",
    dataIndex: "description",
    key: "description",
  },

  {
    title: "Тэги",
    key: "tags",
    dataIndex: "tags",
    render: (tags: string[], answer: IAnswer) => (
      <>
        {tags.map((tag) => {
          const color = tag.length > 5 ? "geekblue" : "green";

          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];

export const extendedColumns = [
  ...columns,
  {
    title: "Действия",
    key: "action",
    render: (text, answer: IAnswer) => (
      <Space size="middle">
        <a>Удалить</a>
      </Space>
    ),
  },
];

export const tableLocale = {
  emptyText: (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description="Нет привязанных ответов"
    />
  ),
};

export interface AnswerTableData extends IAnswer {
  key: string;
  tags: string[];
}
