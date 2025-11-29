import { CarInfoClient } from "./CarInfoClient";

interface Props {
  params: { id: string };
}

export default function CarDetailsPage({ params }: Props) {
  return <CarInfoClient id={params.id} />;
}
