import React from "react";
import { connect } from "react-redux";
import { Card, List, Typography } from "antd";
import { IQuestion } from "@/interfaces";
import { RootState } from "@/store";
import { getAllQuestions } from "./asyncActions";
import { SelectAnswersForm } from "@/components/SelectAnswersForm";
import { Link } from "react-router-dom";

const mapStateToProps = (rootState: RootState) => ({
  questions: rootState.questionsList.questions,
  isActual: rootState.questionsList.isActual,
});

const mapDispatchToProps = {
  getAllQuestions,
};

// export type Props = ReturnType<typeof mapStateToProps> &
//   typeof mapDispatchToProps;

type QuestionsListComponentProps = {
  questions: IQuestion[];
  isActual: boolean;
  getAllQuestions: () => Promise<void | IQuestion[]>;
};

const renderQuestionItem = (item: IQuestion) => (
  <List.Item>
    <List.Item.Meta
      // TODO: Аватар автора
      //   avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
      title={
        <Link to={`/question/${item.id}`}>{item.data}</Link>
        // <a
        //   href={`https://google.gik-team.com/?q=${item.data}`}
        //   target="_blank"
        //   rel="noopener noreferrer"
        // >
        // </a>
      }
      description={item.description}
    />
  </List.Item>
);

const QuestionsListComponent = ({
  questions,
  isActual,
  getAllQuestions,
}: QuestionsListComponentProps) => {
  React.useEffect(() => {
    if (!isActual) {
      getAllQuestions();
    }
  }, [isActual]);
  const [selected, setSelected] = React.useState([]);
  // const onChange = (newSelected: string[]) => {

  // }

  return (
    <div>
      <Typography.Title level={3}>Список вопросов</Typography.Title>

      <Card bordered size="small">
        <List
          size="small"
          itemLayout="horizontal"
          dataSource={questions}
          renderItem={renderQuestionItem}
        />
      </Card>
      <SelectAnswersForm
        answers={questions}
        selected={selected}
        onChange={setSelected}
      />
    </div>
  );
};

export const QuestionsListModule = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionsListComponent);
