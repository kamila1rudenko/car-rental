import { NextRequest, NextResponse } from "next/server";

const BASE_URL =
  process.env.CAR_API_BASE_URL || "https://car-rental-api.goit.global";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const url = `${BASE_URL}/cars/${id}`;

  const res = await fetch(url);

  if (!res.ok) {
    return NextResponse.json(
      { message: "Car not found" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
