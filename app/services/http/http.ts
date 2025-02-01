import axios from "axios";

export const axiosClient = () => {
  const client = axios.create({
    //todo add this to env file
    baseURL: `https://arcube-api.netlify.app/`,
    timeout: 60000,
    withCredentials: true,
  });

  return client;
};
