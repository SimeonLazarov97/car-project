import httpClient from "./httpClient";

export const addCar = async ({ brand, regionId }: { brand: string, regionId: number }) => {
  const res = await httpClient.post("/api/cars/add", { brand, regionId });

  return res.data;
};

export const getAllCars = async ({ page, brand, regionId }: { page: number, brand?: string, regionId?: number }) => {
  var url = new URL(httpClient.defaults.baseURL + `/api/cars/all`);

  url.searchParams.append('page', `${page}`);

  if (brand) {
    url.searchParams.append('brand', brand);
  }

  if (regionId) {
    url.searchParams.append('regionId', `${regionId}`);
  }

  const res = await httpClient.get(url.toString());

  return res.data;
};

export const removeCar = async (carId: number) => {
  const res = await httpClient.delete(`/api/cars/delete/${carId}`);

  return res.data;
};
