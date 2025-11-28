import styles from "./CarsList.module.css";
import type { Car } from "@/types/car";
import { CarsItem } from "@/components/CarsItem/CarsItem";

interface Props {
  cars: Car[];
}

export function CarsList({ cars }: Props) {
  return (
    <ul className={styles.list}>
      {cars.map((car) => (
        <CarsItem key={car.id} car={car} />
      ))}
    </ul>
  );
}
