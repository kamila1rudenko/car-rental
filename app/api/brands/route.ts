import { NextResponse } from "next/server";

const BASE_URL =
  process.env.CAR_API_BASE_URL || "https://car-rental-api.goit.global";

export async function GET() {
  const res = await fetch(`${BASE_URL}/brands`);

  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to fetch brands" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
