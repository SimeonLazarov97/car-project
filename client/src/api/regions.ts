import httpClient from "./httpClient";

export const getAllRegions = async () => {
  const res = await httpClient.get(`/api/regions/all`);

  return res.data;
};
