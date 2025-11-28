import { NextRequest, NextResponse } from "next/server";

const BASE_URL =
  process.env.CAR_API_BASE_URL || "https://car-rental-api.goit.global";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const url = new URL("/cars", BASE_URL);
  searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  const res = await fetch(url.toString());

  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to fetch cars" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
