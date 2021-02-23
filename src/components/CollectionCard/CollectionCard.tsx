import React from "react";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import { StyledCard } from "../StyledCard";
import styles from "./styles.module.css";

// TODO: author's avatar

interface CollectionCardProps {
  title: string;
  link?: string;
  coverUrl?: string;
  editLink?: string;
  hideCover?: boolean;
  canEdit?: boolean;
}

export const CollectionCard = ({
  title,
  link,
  hideCover,
  coverUrl,
  editLink,
  canEdit,
}: CollectionCardProps) => (
  <StyledCard>
    {!!coverUrl && !hideCover && (
      <div
        className={styles.cover}
        style={{ backgroundImage: `url(${coverUrl})` }}
      />
    )}
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.author_info}>
          <span className={styles.avatar}></span>kachmazoff
        </span>
        {canEdit && editLink && (
          <Link to={editLink}>
            <EditOutlined className={styles.editButton} />
          </Link>
        )}
      </div>
      <div className={styles.content}>
        {!!link ? (
          <Link to={link} className={styles.link}>
            {title}
          </Link>
        ) : (
          title
        )}
      </div>
    </div>
  </StyledCard>
);
