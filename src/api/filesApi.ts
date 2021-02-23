import axios from "axios";

interface UploadedFileResponse {
  status: boolean;
  message: string;
  data: {
    name: string;
    mimetype: string;
    size: number;
    generatedName: string;
  };
}

const BASE_API_URL = process.env.BASE_API_URL as string;

export const filesApi = {
  upload: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return axios.post<UploadedFileResponse>(`/files/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  getUrl: (filename: string) =>
    `${BASE_API_URL}/files/download?filename=${filename}`,
};
