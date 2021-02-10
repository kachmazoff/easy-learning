import React from "react";
import { Link } from "react-router-dom";
import { Result } from "antd";

export const NotFoundPage = () => (
  <Result
    status="404"
    title="404"
    subTitle="К сожалению, посещенная вами страница не существует."
    extra={<Link to="/">На главную</Link>}
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }}
  />
);
