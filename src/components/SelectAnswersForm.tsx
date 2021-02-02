import React from "react";
import { List, Checkbox, Card, Button } from "antd";
import { IAnswer } from "@/interfaces";
import { CheckboxChangeEvent, CheckboxOptionType } from "antd/lib/checkbox";

interface SelectAnswersFormProps {
  answers: IAnswer[];
  selected: string[];
  onChange: (
    newSelected: string[],
    event: { name: string; checked: boolean }
  ) => void;
  multiple?: boolean;
}

export const SelectAnswersForm = ({
  answers,
  selected,
  onChange,
  multiple,
}: SelectAnswersFormProps) => {
  const onChangeHandler = React.useCallback(
    (event: CheckboxChangeEvent) => {
      const { name, checked } = event.target;
      let newSelected;
      if (checked) {
        newSelected = [...selected, name as string];
      } else {
        newSelected = selected.filter((x) => x !== name);
      }

      onChange(newSelected, { name: name as string, checked });
    },
    [selected, onChange]
  );

  return (
    <List
      dataSource={answers}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Checkbox
                name={item.id}
                checked={selected.findIndex((x) => x === item.id) > -1}
                onChange={onChangeHandler}
              />
            }
            title={item.data}
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
};

// TODO: radiobox, если не multiple
