import { axiosClient } from "./../http/http";
export const createShortUrl = async (orginalUrl: string) => {
  return await (
    await axiosClient().post(`/url-shortener/`, { url: orginalUrl })
  ).data;
};

export const getOriginalUrl = async (shortCode: string) => {
  return await (
    await axiosClient().get(`/url-shortener/${shortCode}`)
  ).data;
};
