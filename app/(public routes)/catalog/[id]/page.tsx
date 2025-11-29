import { CarInfoClient } from "./CarInfoClient";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CarDetailsPage({ params }: Props) {
  const { id } = await params;
  return <CarInfoClient id={id} />;
}
