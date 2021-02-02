import React from "react";
import { useSelector } from "react-redux";
import { Layout, Typography } from "antd";
import { getIsAuthenticated } from "@/modules/AuthModule";
import { BasePage } from "./components";
import { QuestionModule } from "@/modules/QuestionModule/QuestionModule";

export const QuestionPage = ({ match }) => {
  const questionId = match.params.id;
  const isAuthenticated = useSelector(getIsAuthenticated);
  return (
    <BasePage>
      {`Question ${questionId}`}
      <QuestionModule questionId={questionId} />
    </BasePage>
  );
};
