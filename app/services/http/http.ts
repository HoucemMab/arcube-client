import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const axiosClient = () => {
  const client = axios.create({
    baseURL: baseURL,
    timeout: 60000,
    withCredentials: true,
  });

  return client;
};
