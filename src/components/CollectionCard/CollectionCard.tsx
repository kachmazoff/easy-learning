import React from "react";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import { StyledCard } from "../StyledCard";
import styles from "./styles.module.css";

// TODO: author's avatar

interface CollectionCardProps {
  title: string;
  link?: string;
  imageUrl?: string;
}

export const CollectionCard = ({
  title,
  link,
  imageUrl,
}: CollectionCardProps) => {
  let censured = title;
  censured = censured.replace("пидОра", "#");
  return (
    <StyledCard>
      {!!imageUrl && (
        <div
          className={styles.cover}
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <span className={styles.author_info}>
            <span className={styles.avatar}></span>kachmazoff
          </span>
          <EditOutlined className={styles.editButton} />
        </div>
        <div className={styles.content}>
          {!!link ? <Link to={link}>{censured}</Link> : censured}
        </div>
      </div>
    </StyledCard>
  );
};
