import React from "react";
import { List } from "antd";
import { IQAPair } from "@/modules/CollectionModule/types";

interface QuestionItemProps {
  qa: IQAPair;
}

export const QuestionItem = ({ qa }: QuestionItemProps) => (
  <List.Item actions={[<a key="list-loadmore-more">удалить</a>]}>
    <List.Item.Meta
      title={qa.question.data}
      description={qa.question.description}
    />
  </List.Item>
);
