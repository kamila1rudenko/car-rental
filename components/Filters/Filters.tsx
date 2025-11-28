"use client";

import { FormEvent, useState } from "react";
import styles from "./Filters.module.css";
import { useCarStore } from "@/lib/api/store/useCarsStore";
import { useQuery } from "@tanstack/react-query";
import { clientApi } from "@/lib/api/clientApi";

interface FiltersProps {
  onApply: () => void;
}

export function Filters({ onApply }: FiltersProps) {
  const { filters, setFilters, resetFilters } = useCarStore();

  const [localMin, setLocalMin] = useState(filters.minMileage);
  const [localMax, setLocalMax] = useState(filters.maxMileage);

  const { data: brands } = useQuery<string[]>({
    queryKey: ["brands"],
    queryFn: async () => {
      const { data } = await clientApi.get<string[]>("/brands");
      return data;
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setFilters({
      minMileage: localMin,
      maxMileage: localMax,
    });

    onApply();
  };

  const handleReset = () => {
    resetFilters();
    setLocalMin("");
    setLocalMax("");
    onApply();
  };

  return (
    <form className={styles.filters} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.field}>
          <label>Car brand</label>
          <select
            value={filters.brand ?? ""}
            onChange={(e) => setFilters({ brand: e.target.value || null })}
          >
            <option value="">Choose a brand</option>
            {brands?.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label>Price / 1 hour</label>
          <select
            value={filters.rentalPrice ?? ""}
            onChange={(e) =>
              setFilters({ rentalPrice: e.target.value || null })
            }
          >
            <option value="">Choose a price</option>
            {[30, 40, 50, 60, 70, 80].map((price) => (
              <option key={price} value={String(price)}>
                To ${price}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.fieldGroup}>
          <label>Car mileage / km</label>
          <div className={styles.mileageInputs}>
            <input
              type="number"
              placeholder="From"
              value={localMin}
              onChange={(e) => setLocalMin(e.target.value)}
            />
            <input
              type="number"
              placeholder="To"
              value={localMax}
              onChange={(e) => setLocalMax(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className={styles.searchBtn}>
          Search
        </button>
        <button type="button" className={styles.resetBtn} onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  );
}
