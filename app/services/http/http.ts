import axios from "axios";

export const axiosClient = () => {
  const client = axios.create({
    //todo add this to env file
    baseURL: `https://arcube-server-jngepf8io-houcemmabs-projects.vercel.app`,
    timeout: 60000,
    withCredentials: true,
  });

  return client;
};
