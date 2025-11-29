import { NextRequest, NextResponse } from "next/server";

type CarInfoParams = {
  params: Promise<{ id: string }>;
};

const BASE_URL =
  process.env.CAR_API_BASE_URL || "https://car-rental-api.goit.global";

export async function GET(_req: NextRequest, { params }: CarInfoParams) {
  const { id } = await params;

  try {
    const res = await fetch(`${BASE_URL}/cars/${id}`);

    if (!res.ok) {
      return NextResponse.json(
        { message: "Car not found" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to fetch car" },
      { status: 500 }
    );
  }
}
