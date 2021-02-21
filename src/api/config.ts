import axios from "axios";

interface APIConfig {
  token?: string | null;
  baseURL: string;
}

export const configAxios = ({ token, baseURL }: APIConfig) => {
  if (!!token) {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  }

  axios.defaults.baseURL = baseURL;
};
