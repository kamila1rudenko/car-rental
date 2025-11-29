"use client";

import styles from "./CarInfoClient.module.css";
import { useQuery } from "@tanstack/react-query";
import { clientApi } from "@/lib/api/clientApi";
import type { Car } from "@/types/car";
import { Loader } from "@/components/Loader/Loader";
import { ErrorMessage } from "@/components/ErrorMessage/ErrorMessage";
import { formatMileage } from "@/utils/formatMileage";
import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useCarStore } from "@/lib/api/store/useCarsStore";

interface Props {
  id: string;
}

export function CarInfoClient({ id }: Props) {
  const { data, isLoading, isError, error } = useQuery<Car>({
    queryKey: ["car", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const { data } = await clientApi.get<Car>(`/cars/${id}`);
      return data;
    },
  });

  const { toggleFavorite, isFavorite } = useCarStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");

  if (isLoading) return <Loader />;

  if (isError || !data) {
    return (
      <ErrorMessage
        text={error instanceof Error ? error.message : "Car not found"}
      />
    );
  }

  const favorite = isFavorite(data.id);
  const cityCountry = data.address.split(",").slice(1).join(",").trim();

  // id из имени файла изображения: "https://.../9582-ai.jpg" -> "9582"
  const imageFileName = data.img.split("/").pop() ?? "";
  const imageId = imageFileName.split("-")[0];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.success("Car booked successfully!");
    setName("");
    setEmail("");
    setDate("");
    setComment("");
  };

  return (
    <>
      <section className={styles.wrapper}>
        <div className={styles.inner}>
          <div className={styles.content}>
            <div className={styles.leftColumn}>
              <div className={styles.imageSection}>
                <img
                  src={data.img}
                  alt={`${data.brand} ${data.model}`}
                  className={styles.carImage}
                />
                <button
                  type="button"
                  className={styles.favoriteButton}
                  onClick={() => toggleFavorite(data)}
                  aria-label="Add to favorites"
                >
                  <svg className={styles.favoriteIcon}>
                    <use
                      href={`/svg-sprite.svg#${
                        favorite ? "icon-vector" : "icon-heart"
                      }`}
                    />
                  </svg>
                </button>
              </div>

              <div className={styles.formSection}>
                <h2 className={styles.formTitle}>Book your car now</h2>
                <p className={styles.formSubtitle}>
                  Stay connected! We are always ready to help you.
                </p>

                <form className={styles.rentalForm} onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <input
                      required
                      placeholder="Name*"
                      className={styles.formInput}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <input
                      required
                      type="email"
                      placeholder="Email*"
                      className={styles.formInput}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <input
                      required
                      type="date"
                      placeholder="Booking date*"
                      className={styles.formInput}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <textarea
                      placeholder="Comment"
                      rows={4}
                      className={`${styles.formInput} ${styles.formTextarea}`}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>

                  <button type="submit" className={styles.submitButton}>
                    Send
                  </button>
                </form>
              </div>
            </div>

            {/* RIGHT COLUMN: info */}
            <div className={styles.rightColumn}>
              {/* заголовок + Id в одну строку */}
              <div className={styles.titleRow}>
                <h1 className={styles.carTitle}>
                  {data.brand}&nbsp;
                  <span className={styles.carModel}>{data.model}</span>,{" "}
                  {data.year}
                </h1>

                <span className={styles.carId}>Id: {imageId}</span>
              </div>

              <div className={styles.carMeta}>
                <div className={styles.metaItem}>
                  <svg className={styles.metaIcon}>
                    <use href="/svg-sprite.svg#icon-location" />
                  </svg>
                  <span className={styles.metaText}>{cityCountry}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaText}>
                    Mileage: {formatMileage(data.mileage)} km
                  </span>
                </div>
              </div>

              <div className={styles.priceSection}>
                <span className={styles.price}>${data.rentalPrice}</span>
              </div>

              <p className={styles.description}>{data.description}</p>

              <div className={styles.conditionsSection}>
                <h2 className={styles.conditionsTitle}>Rental Conditions:</h2>
                <ul className={styles.conditionsList}>
                  {data.rentalConditions.map((cond) => (
                    <li key={cond} className={styles.conditionItem}>
                      <svg className={styles.conditionIcon}>
                        <use href="/svg-sprite.svg#icon-up" />
                      </svg>
                      <span className={styles.conditionText}>{cond}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.specsSection}>
                <h2 className={styles.specsTitle}>Car Specifications:</h2>
                <ul className={styles.carDetailsList}>
                  <li className={styles.detailRow}>
                    <svg className={styles.specIcon}>
                      <use href="/svg-sprite.svg#icon-group" />
                    </svg>
                    <span className={styles.detailItem}>Year: {data.year}</span>
                  </li>
                  <li className={styles.detailRow}>
                    <svg className={styles.specIcon}>
                      <use href="/svg-sprite.svg#icon-carr" />
                    </svg>
                    <span className={styles.detailItem}>Type: {data.type}</span>
                  </li>
                  <li className={styles.detailRow}>
                    <svg className={styles.specIcon}>
                      <use href="/svg-sprite.svg#icon-fuel-pump" />
                    </svg>
                    <span className={styles.detailItem}>
                      Fuel Consumption: {data.fuelConsumption}
                    </span>
                  </li>
                  <li className={styles.detailRow}>
                    <svg className={styles.specIcon}>
                      <use href="/svg-sprite.svg#icon-gear" />
                    </svg>
                    <span className={styles.detailItem}>
                      Engine Size: {data.engineSize}
                    </span>
                  </li>
                </ul>
              </div>

              <div className={styles.specsSection}>
                <h2 className={styles.specsTitle}>
                  Accessories and functionalities:
                </h2>
                <ul className={styles.specsList}>
                  {data.accessories.map((item) => (
                    <li key={`acc-${item}`} className={styles.specsRow}>
                      <svg className={styles.specIcon}>
                        <use href="/svg-sprite.svg#icon-up" />
                      </svg>
                      <span className={styles.specItem}>{item}</span>
                    </li>
                  ))}
                  {data.functionalities.map((item) => (
                    <li key={`func-${item}`} className={styles.specsRow}>
                      <svg className={styles.specIcon}>
                        <use href="/svg-sprite.svg#icon-up" />
                      </svg>
                      <span className={styles.specItem}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Toaster position="top-right" />
    </>
  );
}
