import axios, { AxiosError, AxiosResponse } from "axios";
import { callApiGet, callApiPost } from "../ApiModule";
import { parseJwt } from "./helpers";
import { actions, IAuthUserData, AuthStatus } from "./reducer";
import { ILoginFormData, IRegistrationFormData } from "./types";

// TODO: переделать (localStorage / sessionStorage в зависимости от 'запимнить'/'нет' на форме авторизации)

const extractUserData = (token: string): IAuthUserData => {
  const parsedPayload = parseJwt(token);
  const userData: IAuthUserData = {
    username: parsedPayload.username as string,
    id: parsedPayload.userId as string,
  };
  return userData;
};

export const registration = (
  registrationFormData: IRegistrationFormData
) => () => callApiPost("/auth/registration", registrationFormData);

export const getToken = (loginFormData: ILoginFormData) => (
  dispatch: Function
) => {
  const { setStatus, setAuthData } = actions;

  dispatch(setStatus("loading"));

  return callApiPost("/auth/login", loginFormData)
    .then((response: AxiosResponse) => {
      if (response.status === 200) {
        const token = response.data.token;
        const userData = extractUserData(token);

        axios.defaults.headers.Authorization = `Bearer ${token}`;
        localStorage.setItem("token", token);

        dispatch(setAuthData({ token, userData }));
      } else {
        dispatch(setStatus("failed"));
      }
    })
    .catch((err) => {
      dispatch(setStatus("failed"));
    });
};

export const tryLoadSession = () => (dispatch: Function) => {
  const { setStatus, setAuthData } = actions;

  const token = localStorage.getItem("token");

  if (token !== null) {
    const userData = extractUserData(token);

    dispatch(setAuthData({ token, userData }));

    return Promise.resolve<AuthStatus>("success");
  } else {
    dispatch(setStatus("failed"));
    return Promise.resolve<AuthStatus>("failed");
  }
};

export const logout = () => (dispatch: Function) => {
  const { clearAuthData } = actions;

  localStorage.removeItem("token");
  axios.defaults.headers.Authorization = undefined;

  dispatch(clearAuthData());
};

export const checkLoginStatus = () => (dispatch: Function) =>
  callApiGet("/auth/check")
    .then((res: AxiosResponse) => {
      if (res.status === 401) {
        dispatch(logout());
      }
    })
    .catch((err: AxiosError) => {
      if (err.response?.status === 401) {
        dispatch(logout());
      }
    });
