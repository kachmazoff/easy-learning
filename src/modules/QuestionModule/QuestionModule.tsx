import React from "react";
import { connect } from "react-redux";
import { RootState } from "@/store";

const mapStateToProps = (rootState: RootState) => {};

const mapDispatchToProps = {};

const QuestionComponent = () => {
  return <div>Question</div>;
};

export const QuestionModule = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionComponent);
