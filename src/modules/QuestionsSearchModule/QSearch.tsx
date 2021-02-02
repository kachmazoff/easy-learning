import React, { useState } from "react";
import { connect } from "react-redux";
import { Input, AutoComplete } from "antd";
import { RootState } from "@/store";
import { questionsSearchSlice } from "./reducer";
import { qSearchQuery } from "./asyncActions";
import { QSearchProps, QSearchOwnProps, IQOption } from "./types";
import { mapQuestionsToOptions } from "./helpers";

const mapStateToProps = (rootState: RootState, ownProps: QSearchOwnProps) => {
  const { name } = ownProps;
  const questions = rootState[questionsSearchSlice.name][name];
  return {
    questions: questions || { own: [], other: [] },
  };
};

const mapDispatchToProps = {
  searchQuestions: qSearchQuery,
};

const QSearchComponent = ({
  name,
  questions,
  searchQuestions,
  style,
  onSelect,
}: QSearchProps) => {
  const [options, setOptions] = useState<IQOption[]>([]);
  React.useEffect(() => {
    setOptions(mapQuestionsToOptions(questions));
  }, [questions]);

  return (
    <AutoComplete
      dropdownClassName="certain-category-search-dropdown"
      dropdownMatchSelectWidth={500}
      style={style}
      options={options}
      onSelect={onSelect}
    >
      <Input.Search
        placeholder="Поиск вопросов"
        onSearch={(query) => searchQuestions(query, name)}
      />
    </AutoComplete>
  );
};

export const QSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(QSearchComponent);
