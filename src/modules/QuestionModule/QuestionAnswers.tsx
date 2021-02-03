import React, { useState } from "react";
import { connect } from "react-redux";
import { Table } from "antd";
import { RootState } from "@/store";
import { IAnswer } from "@/interfaces";
import { getQuestionAnswers } from "./asyncAction";
import { questionSlice } from "./reducer";
import {
  AnswerTableData,
  columns,
  extendedColumns,
  tableLocale,
} from "./helpers";

const mapStateToProps = (
  rootState: RootState,
  ownProps: QuestionAnswersOwnProps
) => {
  const { questionId } = ownProps;
  const questionData = rootState[questionSlice.name][questionId] || {};

  return {
    answers: questionData.answers,
  };
};

const mapDispatchToProps = {
  getAnswers: getQuestionAnswers,
};

interface QuestionAnswersOwnProps {
  questionId: string;
  activeUserId?: string;
}

interface QuestionAnswersProps extends QuestionAnswersOwnProps {
  answers?: IAnswer[];
  getAnswers: (questionId: string) => any;
}

const QuestionAnswersComponent = ({
  questionId,
  answers,
  activeUserId,
  getAnswers,
}: QuestionAnswersProps) => {
  const [answersData, setAnswersData] = useState<AnswerTableData[]>([]);
  React.useEffect(() => {
    if (!answers) {
      getAnswers(questionId);
    }
  }, [questionId, answers, getAnswers]);

  React.useEffect(() => {
    const answersData = answers?.map((answer) => {
      const tags = [];
      if (answer.author_id === activeUserId) {
        tags.push("ваш ответ");
      }

      return {
        ...answer,
        key: answer.id,
        tags: tags,
      } as AnswerTableData;
    });
    setAnswersData(answersData || []);
  }, [answers, activeUserId]);

  return (
    <Table
      columns={!!activeUserId ? extendedColumns : columns}
      dataSource={answersData}
      loading={!answers}
      locale={tableLocale}
    />
  );
};

export const QuestionAnswers = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionAnswersComponent);
