import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Typography } from "antd";
import { HomePage, LoginPage, NotFoundPage, RegistrationPage } from "./pages";
import { store } from "./store";
import { AuthWrapper } from "./modules/AuthModule";
import { QuestionPage } from "./pages/QuestionPage";

const { Title } = Typography;

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthWrapper>
          <Switch>
            <Route path="/login" exact component={LoginPage} />
            <Route path="/question/:id" exact component={QuestionPage} />
            <Route path="/registration" exact component={RegistrationPage} />
            <Route path="/" exact component={HomePage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </AuthWrapper>
      </BrowserRouter>
    </Provider>
  );
};

export { App };
