import axios from "axios";

const callApiGet = <T = any>(endpoint: string) => axios.get<T>(`${endpoint}`);

const callApiPost = <T = any>(endpoint: string, body?: any) =>
  axios.post<T>(`${endpoint}`, body);

const callApiDelete = <T = any>(endpoint: string, body?: any) =>
  axios.delete<T>(`${endpoint}`, { data: body });

export { callApiGet, callApiPost, callApiDelete };
