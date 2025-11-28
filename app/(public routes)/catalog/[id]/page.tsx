interface Props {
  params: { id: string };
}

import { CarInfoClient } from "./CarInfoClient";

export default function CarDetailsPage({ params }: Props) {
  return <CarInfoClient id={params.id} />;
}
