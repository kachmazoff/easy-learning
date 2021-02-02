import React from "react";
import { connect } from "react-redux";
import { Avatar, Button, Popover, Space, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { RootState } from "@/store";
import { logout } from "./asyncActions";

const mapStateToProps = (state: RootState) => ({
  username: state.auth.userData?.username,
});

const mapDispatchToProps = {
  onLogout: logout,
};

interface AccountWidgetProps {
  username?: string;
  onLogout: Function;
}

const PopoverContent = ({ onLogout }: { onLogout: Function }) => (
  <Button danger block type={"primary"} onClick={onLogout}>
    Выйти
  </Button>
);

const AccountWidgetComponent = ({ username, onLogout }: AccountWidgetProps) => {
  if (!username) {
    return (
      <Typography.Text style={{ color: "white" }}>
        Вы не вошли в аккаут :-(
      </Typography.Text>
    );
  }

  return (
    <Popover
      placement="bottomRight"
      title={"Быстрые действия"}
      content={<PopoverContent onLogout={onLogout} />}
      trigger="click"
    >
      <Space style={{ cursor: "pointer" }}>
        <Avatar icon={<UserOutlined />} />
        <Typography.Text style={{ color: "white" }}>root</Typography.Text>
      </Space>
    </Popover>
  );
};

export const AccountWidget = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountWidgetComponent);
