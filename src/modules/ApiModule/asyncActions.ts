import axios from "axios";
import { RootState } from "@/store";

const BASE_API_URL = "http://localhost:8000";

export const callApiGet = (endpoint: string) => (
  dispatch: Function,
  getState: () => RootState
) => {
  const {
    auth: { token },
  } = getState();
  const headers = {};

  if (!!token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios.get(`${BASE_API_URL}${endpoint}`, { headers });
};

export const callApiPost = (endpoint: string, body?: any) => (
  dispatch: Function,
  getState: () => RootState
) => {
  const {
    auth: { token },
  } = getState();

  const headers = {};

  if (!!token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios.post(`${BASE_API_URL}${endpoint}`, body, { headers });
};

export const callApiDelete = (endpoint: string, body?: any) => (
  dispatch: Function,
  getState: () => RootState
) => {
  const {
    auth: { token },
  } = getState();

  const headers = {};

  if (!!token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios.delete(`${BASE_API_URL}${endpoint}`, { headers, data: body });
};
