import React from "react";
import { RouteComponentProps } from "react-router";
import { useDispatch } from "react-redux";
import { message } from "antd";

import { actions as listActions } from "@/modules/CollectionsListModule";
import {
  CollectionFormModule,
  CollectionModuleWrapper,
} from "@/modules/CollectionModule";
import { ThreeColumnsLayout } from "./components";

const onFailedHandler = () => {
  message.error("Что-то пошло не так :(");
};

export const EditCollectionPage = ({
  match,
  history,
}: RouteComponentProps<{ id: string }>) => {
  const dispatch = useDispatch();

  const collectionId = match.params.id as string;

  const onSuccessHanlder = React.useCallback(() => {
    dispatch(listActions.setIsActual(false));
    message.success("Коллекция успешно изменена");
  }, [dispatch]);

  const onFinishHandler = React.useCallback(() => history.push("/"), [history]);

  return (
    <ThreeColumnsLayout>
      <h1>Редактирование коллекции</h1>
      <CollectionModuleWrapper collectionId={collectionId}>
        <CollectionFormModule
          onSuccess={onSuccessHanlder}
          onFailed={onFailedHandler}
          onFinish={onFinishHandler}
        />
      </CollectionModuleWrapper>
    </ThreeColumnsLayout>
  );
};
