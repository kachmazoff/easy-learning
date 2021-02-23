import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

interface SideNavProps {
  routes: {
    label: string;
    icon?: string;
    url: string;
  }[];
}

export const SideNav = ({ routes }: SideNavProps) => {
  return (
    <nav>
      {routes.map((route) => (
        <Link key={route.url} to={route.url} className={styles.link}>
          {route.label}
        </Link>
      ))}
    </nav>
  );
};
