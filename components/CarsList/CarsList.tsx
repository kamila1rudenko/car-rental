import type { Car } from "@/types/car";
import styles from "./CarsList.module.css";
import { CarsItem } from "@/components/CarsItem/CarsItem";

interface Props {
  cars: Car[];
}

export function CarsList({ cars }: Props) {
  if (!cars.length) return null;

  return (
    <ul className={styles.list}>
      {cars.map((car) => (
        <CarsItem key={car.id} car={car} />
      ))}
    </ul>
  );
}
