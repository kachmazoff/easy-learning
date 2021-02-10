import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  BarChartOutlined,
  UserOutlined,
  HomeOutlined,
  DatabaseOutlined,
  QuestionOutlined,
  FormOutlined,
} from "@ant-design/icons";

import { getIsAuthenticated } from "@/modules/AuthModule";
import { BasePageHeader } from "./BasePageHeader";

const { Content, Sider } = Layout;

// TODO: Выделить Menu в отдельный компонент

export const BasePage: FC = ({ children }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const location = useLocation();
  const [selectedKey, setSelectedKey] = React.useState("/");
  React.useEffect(() => {
    setSelectedKey(location.pathname.split("/")[1] || "/");
  }, [location.pathname]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <BasePageHeader isAuthenticated={isAuthenticated} />
      <Layout>
        <Sider width={300} collapsible={true}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["/"]}
            style={{ position: "sticky", top: 0 }}
            selectedKeys={[selectedKey]}
          >
            <Menu.Item key="/" icon={<HomeOutlined />}>
              Главная
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key="collections" icon={<DatabaseOutlined />}>
              Коллекции
              <Link to="/collections" />
            </Menu.Item>
            <Menu.Item key="questions" icon={<QuestionOutlined />}>
              Вопросы
              <Link to="/questions" />
            </Menu.Item>
            <Menu.Item key="4" icon={<FormOutlined />}>
              Создать
            </Menu.Item>
            <Menu.Item key="statistics" icon={<BarChartOutlined />}>
              Статистика
              <Link to="/statistics" />
            </Menu.Item>
            <Menu.Item key="6" icon={<UserOutlined />}>
              Профиль
            </Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ padding: "16px 24px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
};
