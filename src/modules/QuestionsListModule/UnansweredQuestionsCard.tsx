import React, { useState } from "react";
import { connect } from "react-redux";
import { RootState } from "@/store";
import { SideCard } from "@/components/SideCard";
import { IQuestionExtended } from "@/interfaces";
import { getAllQuestions } from "./asyncActions";

const mapStateToProps = (rootState: RootState) => ({
  questions: rootState.questionsList.questions,
  isActual: rootState.questionsList.isActual,
});

const mapDispatchToProps = {
  getAllQuestions,
};

type UnanwseredQuestionsCardComponentProps = {
  questions: IQuestionExtended[];
  isActual: boolean;
  getAllQuestions: () => Promise<void | IQuestionExtended[]>;
};

const UnanwseredQuestionsCardComponent = ({
  questions,
  isActual,
  getAllQuestions,
}: UnanwseredQuestionsCardComponentProps) => {
  React.useEffect(() => {
    if (!isActual) {
      getAllQuestions();
    }
  }, [isActual]);
  const [list, setList] = useState<{ label: string; link: string }[]>([]);

  React.useEffect(() => {
    setList(
      questions
        .filter((x) => x.answers_count === 0)
        .map((x) => ({ label: x.data, link: `question/${x.id}` }))
    );
  }, [questions]);

  return <SideCard title="Вопросы без ответов" list={list} />;
};

export const UnanwseredQuestionsCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnanwseredQuestionsCardComponent);
