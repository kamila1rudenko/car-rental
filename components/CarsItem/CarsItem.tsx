"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./CarsItem.module.css";
import type { Car } from "@/types/car";
import { useCarStore } from "@/lib/api/store/useCarsStore";
import { formatMileage } from "@/utils/formatMileage";

interface Props {
  car: Car;
}

export function CarsItem({ car }: Props) {
  const { toggleFavorite, isFavorite } = useCarStore();
  const favorite = isFavorite(car.id);

  const handleFavoriteClick = () => {
    toggleFavorite(car);
  };

  // город и страна из address
  const [, cityRaw, countryRaw] = car.address.split(",");
  const city = cityRaw?.trim() ?? "";
  const country = countryRaw?.trim() ?? "";

  return (
    <li className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.carImage}
          src={car.img}
          alt={car.description || `${car.brand} ${car.model}`}
          width={276}
          height={268}
          priority
        />
        <button
          type="button"
          className={`${styles.heart} ${favorite ? styles.heartActive : ""}`}
          onClick={handleFavoriteClick}
          aria-label="Add to favorites"
        >
          <svg className={styles.heartIcon}>
            <use
              href={`/svg-sprite.svg#${
                favorite ? "icon-vector" : "icon-heart"
              }`}
            />
          </svg>
        </button>
      </div>

      <div className={styles.carInfo}>
        <h3 className={styles.title}>
          {car.brand} <span className={styles.model}>{car.model},</span>
          <span className={styles.year}>{car.year}</span>
          <span className={styles.price}>${car.rentalPrice}</span>
        </h3>

        <ul className={styles.details}>
          <li className={styles.detailsItem}>{city}</li>
          <li className={styles.detailsItem}>{country}</li>
          <li className={styles.detailsItem}>{car.rentalCompany}</li>
          <li className={styles.detailsItem}>{car.type}</li>
          <li className={styles.detailsItem}>
            {formatMileage(car.mileage)} km
          </li>
        </ul>
      </div>

      <Link href={`/catalog/${car.id}`} className={styles.button}>
        Read more
      </Link>
    </li>
  );
}
