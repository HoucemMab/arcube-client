import axios from "axios";

export const axiosClient = () => {
  const client = axios.create({
    //todo add this to env file
    baseURL: `https://arcube-server-m5u0a77vh-houcemmabs-projects.vercel.app/`,
    timeout: 60000,
    withCredentials: true,
  });

  return client;
};
