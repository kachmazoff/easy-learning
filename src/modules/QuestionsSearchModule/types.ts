import { QSearchData } from "./reducer";

export interface IQOption {
  label: string | JSX.Element;
  options: {
    value: string;
    label: JSX.Element;
    name: string;
  }[];
}

export interface QSearchOwnProps {
  name: string;
  style?: React.CSSProperties;
  onSelect?: (
    value: string | JSX.Element,
    option: {
      value: string;
      label: JSX.Element;
      name: string;
    }
  ) => void;
}

export interface QSearchProps extends QSearchOwnProps {
  questions: QSearchData;
  searchQuestions: Function;
}
