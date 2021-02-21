import axios from "axios";

export const callApiGet = (endpoint: string) => axios.get(`${endpoint}`);

export const callApiPost = (endpoint: string, body?: any) =>
  axios.post(`${endpoint}`, body);

export const callApiDelete = (endpoint: string, body?: any) => {
  return axios.delete(`${endpoint}`, { data: body });
};
