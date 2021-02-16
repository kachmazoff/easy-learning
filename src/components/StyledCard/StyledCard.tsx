import React, { FC } from "react";
import styles from "./styles.module.css";

interface StyledCardProps {
  style?: React.CSSProperties;
}

export const StyledCard: FC<StyledCardProps> = ({ children, style }) => (
  <div className={styles.card} style={style}>
    {children}
  </div>
);
