import React from "react";
import { QSearchData } from "./reducer";
import { IQOption } from "./types";

const renderTitle = (title: string) => <span>{title}</span>;

const endingsMap = {
  0: "ответов",
  1: "ответ",
  2: "ответа",
  3: "ответа",
  4: "ответа",
  5: "ответов",
  6: "ответов",
  7: "ответов",
  8: "ответов",
  9: "ответов",
};

const renderItem = (name: string, title: string, count: number) => {
  return {
    value: title,
    name,
    label: (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {title}
        <span style={{ color: "gray" }}>
          {`${count} ${endingsMap[count % 10]}`}
        </span>
      </div>
    ),
  };
};

export const mapQuestionsToOptions = (questions: QSearchData) => {
  const newOptions: IQOption[] = [];
  if (questions.own.length > 0) {
    newOptions.push({
      label: renderTitle("Ваши вопросы"),
      options: questions.own.map((x) => renderItem(x.id as string, x.data, 1)),
    });
  }
  if (questions.other.length > 0) {
    newOptions.push({
      label: "Другое",
      options: questions.other.map((x) =>
        renderItem(x.id as string, x.data, 1)
      ),
    });
  }
  return newOptions;
};
