import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";

import { App } from "./App";

import { configAxios } from "./api/config";

const BASE_API_URL = process.env.BASE_API_URL as string;
const token = localStorage.getItem("token");

configAxios({
  baseURL: BASE_API_URL,
  token,
});

ReactDOM.render(<App />, document.getElementById("root"));
