// app/api/cars/[id]/route.ts
import { Car } from "@/types/car";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL =
  process.env.CAR_API_BASE_URL || "https://car-rental-api.goit.global";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const url = new URL("/cars", BASE_URL);
  url.searchParams.set("limit", "50");
  url.searchParams.set("page", "1");

  const res = await fetch(url.toString());

  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to fetch cars" },
      { status: res.status }
    );
  }

  const data: {
    cars: Car[];
    totalCars: number;
    page: number | string;
    totalPages: number;
  } = await res.json();

  const car = data.cars.find((c) => c.id === id);

  if (!car) {
    return NextResponse.json({ message: "Car not found" }, { status: 404 });
  }

  return NextResponse.json(car);
}
