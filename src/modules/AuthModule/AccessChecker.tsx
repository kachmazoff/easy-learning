import React, { ReactNode, FC } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { RootState } from "@/store";

const mapStateToProps = ({ auth }: RootState) => ({
  status: auth.status,
});

export interface Props extends ReturnType<typeof mapStateToProps> {
  children: ReactNode;
  onlyUnauthorized?: boolean;
  redirectPath?: string;
}

const AccessCheckerComponent: FC<Props> = ({
  children,
  status,
  onlyUnauthorized,
  redirectPath = "/login",
}) => {
  if (status === "init" || status === "loading") {
    return <div>Check user session...</div>;
  }

  if (
    (status === "failed" && !onlyUnauthorized) ||
    (status === "success" && onlyUnauthorized)
  ) {
    return <Redirect to={redirectPath} />;
  }

  return <>{children}</>;
};

export const AccessChecker = connect(mapStateToProps)(AccessCheckerComponent);
