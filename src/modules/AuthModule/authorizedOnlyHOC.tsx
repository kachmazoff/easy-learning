import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const authStatusSelector = (state: RootState) => state.auth.status;

export const authorizedOnlyHoc = <Props extends object>(
  Component: React.ComponentType<Props>,
  redirectPath = "/login",
  onlyUnauthorized = false
) => (props: Props) => {
  const authStatus = useSelector(authStatusSelector);

  if (authStatus === "init" || authStatus === "loading") {
    return <div>Checking if user is authorized</div>;
  }

  if (
    (authStatus === "failed" && !onlyUnauthorized) ||
    (authStatus === "success" && onlyUnauthorized)
  ) {
    return <Redirect to={redirectPath} />;
  }

  return <Component {...props} />;
};
