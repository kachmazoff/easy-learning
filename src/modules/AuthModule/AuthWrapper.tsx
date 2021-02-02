import { RootState } from "@/store";
import React, { ReactNode, FC } from "react";
import { connect } from "react-redux";
import { checkLoginStatus, tryLoadSession } from "./asyncActions";

const mapStateToProps = ({ auth }: RootState) => ({
  status: auth.status,
});

const mapDispatchToProps = {
  tryAuthorization: tryLoadSession,
  checkLoginStatus,
};

export interface Props extends ReturnType<typeof mapStateToProps> {
  children: ReactNode;
  tryAuthorization: Function;
  checkLoginStatus: Function;
}

const AuthWrapperComponent: FC<Props> = ({
  status,
  children,
  tryAuthorization,
  checkLoginStatus,
}) => {
  React.useEffect(() => {
    if (status === "init") {
      tryAuthorization();
    } else if (status === "success") {
      checkLoginStatus();
    }
  }, [status]);

  return <>{children}</>;
};

export const AuthWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthWrapperComponent);
