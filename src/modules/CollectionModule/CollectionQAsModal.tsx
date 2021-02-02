import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal, Button, List, Typography, Empty } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import { RootState } from "@/store";
import { collectionSlice } from "./reducer";
import {
  getCollectionQAs,
  addAnswersToCollection,
  addQuestionsToCollection,
  getCollectionQuestions,
  deleteQuestionFromCollection,
} from "./asyncActions";
import { CardsSelectionForm } from "../CardsModule/CardsSelectionForm";
import { IQAPair } from "./types";
import { QSearch } from "../QuestionsSearchModule/QSearch";
import { IQuestion } from "@/interfaces";
import { listLocale, questionsListRenderItem } from "./helpers";

const mapStateToProps = (
  rootState: RootState,
  ownProps: { collectionId: string }
) => {
  const { collectionId } = ownProps;
  const collectionData = rootState[collectionSlice.name][collectionId] || {};

  return {
    qaPairs: collectionData.qaPairs,
    needInit: !collectionData.qaPairs,
    questions: collectionData.questions || [],
    editable:
      rootState.auth.userData?.id === collectionData.collectionInfo?.author_id,
  };
};

const mapDispatchToProps = {
  getCollectionQAs: getCollectionQAs,
  addAnswersToCollection: addAnswersToCollection,
  addQuestionsToCollection: addQuestionsToCollection,
  getCollectionQuestions: getCollectionQuestions,
  deleteQuestion: deleteQuestionFromCollection,
};

export interface CollectionCardsModalProps {
  collectionId: string;
  qaPairs?: IQAPair[];
  needInit: boolean;
  editable: boolean;

  questions: IQuestion[];

  getCollectionQAs: Function;
  addAnswersToCollection: Function;
  addQuestionsToCollection: Function;
  getCollectionQuestions: Function;
  deleteQuestion: Function;
}

export const CollectionQAsModalComponent = ({
  qaPairs,
  needInit,
  collectionId,
  questions,
  editable,
  getCollectionQAs,
  addAnswersToCollection,
  addQuestionsToCollection,
  getCollectionQuestions,
  deleteQuestion,
}: // onDeleteCardFromCollection,
CollectionCardsModalProps): JSX.Element => {
  React.useEffect(() => {
    if (!!collectionId && needInit) {
      // getCollectionQAs(collectionId);
      getCollectionQuestions(collectionId);
    }
  }, [collectionId, needInit]);
  const [visible, setVisible] = useState(false);

  const showModal = React.useCallback(() => {
    setVisible(true);
  }, []);

  const handleCancel = React.useCallback(() => {
    setVisible(false);
  }, []);

  const onDelete = React.useCallback(
    (questionId: string) => deleteQuestion(collectionId, questionId),
    [deleteQuestion, collectionId]
  );

  return (
    <>
      <Button type="link" onClick={showModal}>
        <UnorderedListOutlined />
        Вопросы {!!questions && ` (${questions.length})`}
      </Button>
      <Modal
        title="Вопросы в коллекции"
        visible={visible}
        footer={null}
        okText="Создать"
        cancelText="Отменить"
        onCancel={handleCancel}
        width={600}
      >
        {editable && (
          <QSearch
            name="addQuery"
            style={{ width: "100%", marginBottom: "20px" }}
            onSelect={(a, option) =>
              addQuestionsToCollection(collectionId, [option.name])
            }
          />
        )}
        <List
          size="small"
          bordered
          dataSource={questions}
          renderItem={(item) => questionsListRenderItem(item, onDelete)}
          locale={listLocale}
        />
      </Modal>
    </>
  );
};

export const CollectionQAsModalModule = connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionQAsModalComponent);
