import axios from "axios";

export const axiosClient = () => {
  const client = axios.create({
    //todo add this to env file
    baseURL: `http://localhost:3005/`,
    timeout: 60000,
    withCredentials: true,
  });

  return client;
};
