import React, { FC } from "react";
import styles from "./styles.module.css";

export const FixedAspectRatioBox: FC = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
