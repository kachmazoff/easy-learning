import axios from "axios";

const BASE_API_URL = process.env.BASE_API_URL;

export const uploadImages = async (files: { [name: string]: File }) => {
  const formData = new FormData();
  Object.keys(files).forEach((x) => formData.append(x, files[x]));

  // TODO: change url
  return axios.post(`${BASE_API_URL}/files/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
