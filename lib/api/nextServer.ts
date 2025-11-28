import { serverGet } from "./serverApi";
import type { CarsResponse, Car } from "@/types/car";

export const fetchCarsOnServer = (searchParams: URLSearchParams) =>
  serverGet<CarsResponse>("/cars", searchParams);

export const fetchCarByIdOnServer = (id: string) =>
  serverGet<Car>(`/cars/${id}`);

export const fetchBrandsOnServer = () => serverGet<string[]>("/brands");
