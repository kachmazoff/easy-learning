import axios from "axios";

const callApiGet = (endpoint: string) => axios.get(`${endpoint}`);

const callApiPost = (endpoint: string, body?: any) =>
  axios.post(`${endpoint}`, body);

const callApiDelete = (endpoint: string, body?: any) =>
  axios.delete(`${endpoint}`, { data: body });
