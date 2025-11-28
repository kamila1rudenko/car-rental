"use client";

import { useCarStore } from "@/lib/api/store/useCarsStore";
import styles from "./CarsItem.module.css";
import type { Car } from "@/types/car";
import Link from "next/link";
import { formatMileage } from "@/utils/formatMileage";

interface Props {
  car: Car;
}

export function CarsItem({ car }: Props) {
  const { toggleFavorite, isFavorite } = useCarStore();
  const favorite = isFavorite(car.id);

  const price = `$${car.rentalPrice}`;

  return (
    <li className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={car.img} alt={`${car.brand} ${car.model}`} />
        <button
          type="button"
          className={`${styles.heart} ${favorite ? styles.heartActive : ""}`}
          onClick={() => toggleFavorite(car)}
        >
          ♥
        </button>
      </div>

      <div className={styles.topRow}>
        <h3 className={styles.title}>
          {car.brand}{" "}
          <span>
            {car.model}, {car.year}
          </span>
        </h3>
        <span className={styles.price}>{price}</span>
      </div>

      <p className={styles.subtitle}>
        {car.address.split(", ").slice(-2).join(", ")} | {car.type} |{" "}
        {formatMileage(car.mileage)} km
      </p>

      <Link href={`/catalog/${car.id}`} className={styles.button}>
        Read more
      </Link>
    </li>
  );
}
