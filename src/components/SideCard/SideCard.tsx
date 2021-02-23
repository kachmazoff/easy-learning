import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "antd";
import styles from "./styles.module.css";

interface SideCardProps {
  title: string;
  list: { label: string; link: string }[];
}

export const SideCard = ({ title, list }: SideCardProps) => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Typography.Title level={3} className={styles.title}>
          {title}
        </Typography.Title>
      </header>
      <div>
        {list.map((x) => (
          <Link key={x.link} className={styles.link} to={x.link}>
            {x.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
