import { clientApi } from "./clientApi";
import type { Car, CarsResponse } from "@/types/car";

export interface CarsQuery {
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
  page?: number;
  limit?: number;
}

export const carApi = {
  async getCars(params: CarsQuery): Promise<CarsResponse> {
    const { data } = await clientApi.get<CarsResponse>("/cars", { params });
    return data;
  },

  async getCarById(id: string): Promise<Car> {
    const { data } = await clientApi.get<Car>(`/cars/${id}`);
    return data;
  },

  async getBrands(): Promise<string[]> {
    const { data } = await clientApi.get<string[]>("/brands");
    return data;
  },
};
