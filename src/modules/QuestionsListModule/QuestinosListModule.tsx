import React from "react";
import { connect } from "react-redux";
import { Badge, Card, List, Tooltip, Typography } from "antd";
import { IQuestionExtended } from "@/interfaces";
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
  questions: IQuestionExtended[];
  isActual: boolean;
  getAllQuestions: () => Promise<void | IQuestionExtended[]>;
};

const renderQuestionItem = (item: IQuestionExtended) => (
  <List.Item>
    <List.Item.Meta
      // TODO: Аватар автора
      //   avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
      title={
        <>
          {item.answers_count === 0 && (
            <Tooltip title="Нет ни одного ответа">
              <Badge status="error" />
            </Tooltip>
          )}
          <Link to={`/question/${item.id}`}>{item.data}</Link>
        </>
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
      {/* <SelectAnswersForm
        answers={questions}
        selected={selected}
        onChange={setSelected}
      /> */}
    </div>
  );
};

export const QuestionsListModule = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionsListComponent);
