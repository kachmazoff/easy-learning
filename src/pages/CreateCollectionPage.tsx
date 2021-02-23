import React from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { message } from "antd";

import { CollectionFormModule } from "@/modules/CollectionModule";
import { actions as listActions } from "@/modules/CollectionsListModule";
import { ThreeColumnsLayout } from "./components";

const onFailedHandler = () => {
  message.error("Что-то пошло не так :(");
};

export const CreateCollectionPage = ({ history }: RouteComponentProps) => {
  const dispatch = useDispatch();

  const onSuccessHanlder = React.useCallback(() => {
    dispatch(listActions.setIsActual(false));
    message.success("Коллекция успешно создана");
  }, [dispatch]);

  const onFinishHandler = React.useCallback(() => history.push("/"), [history]);

  return (
    <ThreeColumnsLayout>
      <h1>Создание коллекции</h1>
      <CollectionFormModule
        onSuccess={onSuccessHanlder}
        onFailed={onFailedHandler}
        onFinish={onFinishHandler}
      />
    </ThreeColumnsLayout>
  );
};
