const BASE_URL =
  process.env.CAR_API_BASE_URL || "https://car-rental-api.goit.global";

export async function serverGet<T>(
  path: string,
  searchParams?: URLSearchParams
) {
  const url = `${BASE_URL}${path}${searchParams ? `?${searchParams.toString()}` : ""}`;

  const res = await fetch(url, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error(`Server request failed: ${res.status}`);
  }

  return (await res.json()) as T;
}
