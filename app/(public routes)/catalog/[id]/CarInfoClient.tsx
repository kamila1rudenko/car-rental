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

interface Props {
  id: string;
}

export function CarInfoClient({ id }: Props) {
  const { data, isLoading, isError } = useQuery<Car>({
    queryKey: ["car", id],
    queryFn: async () => {
      const { data } = await clientApi.get<Car>(`/cars/${id}`);
      return data;
    },
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");

  if (isLoading) return <Loader />;
  if (isError || !data) return <ErrorMessage text="Car not found" />;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    toast.success("Car booked successfully!");
    setName("");
    setEmail("");
    setDate("");
    setComment("");
  };

  const cityCountry = data.address.split(", ").slice(-2).join(", ");

  return (
    <>
      <section className={styles.wrapper}>
        <div className={styles.image}>
          <img src={data.img} alt={`${data.brand} ${data.model}`} />
        </div>

        <div>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>
              {data.brand} {data.model}, {data.year}
            </h1>
            <span className={styles.price}>${data.rentalPrice}</span>
          </div>

          <p className={styles.meta}>
            {cityCountry} • Mileage: {formatMileage(data.mileage)} km • Type:{" "}
            {data.type}
          </p>

          <p className={styles.meta}>{data.description}</p>

          <p className={styles.conditionsTitle}>Rental Conditions:</p>
          <ul className={styles.conditions}>
            {data.rentalConditions.map((cond) => (
              <li key={cond}>{cond}</li>
            ))}
          </ul>

          <p className={styles.specTitle}>Car Specifications:</p>
          <ul className={styles.specList}>
            <li>Year: {data.year}</li>
            <li>Fuel Consumption: {data.fuelConsumption}</li>
            <li>Engine Size: {data.engineSize}</li>
          </ul>

          <p className={styles.specTitle}>Accessories & functionalities:</p>
          <ul className={styles.funcList}>
            {data.accessories.map((item) => (
              <li key={item}>{item}</li>
            ))}
            {data.functionalities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.formTitle}>Book your car now</h2>
            <input
              required
              placeholder="Name*"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              required
              type="email"
              placeholder="Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              required
              type="date"
              placeholder="Booking date*"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <textarea
              placeholder="Comment"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </section>
      <Toaster position="top-right" />
    </>
  );
}
