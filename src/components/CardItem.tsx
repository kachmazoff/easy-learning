import React from "react";
import { Card } from "antd";

export type CardItemProps = {
  title: string;
  description: string;
};

export const CardItem = ({
  title,
  description,
}: CardItemProps): JSX.Element => {
  return (
    <Card title={title} bordered={true} style={{ margin: "10px 0" }}>
      {description}
    </Card>
  );
};
