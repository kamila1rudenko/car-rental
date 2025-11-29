"use client";

import styles from "./Filters.module.css";
import { FormEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { clientApi } from "@/lib/api/clientApi";
import { useCarStore } from "@/lib/api/store/useCarsStore";

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
    staleTime: 1000 * 60 * 5,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setFilters({
      minMileage: localMin.trim(),
      maxMileage: localMax.trim(),
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
      <div className={styles.inner}>
        <div className={styles.field}>
          <span className={styles.label}>Car brand</span>
          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
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
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Price / 1 hour</span>
          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
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
        </div>

        <div className={styles.fieldGroup}>
          <span className={styles.label}>Car mileage / km</span>
          <div className={styles.mileageWrapper}>
            <input
              type="number"
              placeholder="From"
              className={styles.mileageInput}
              value={localMin}
              onChange={(e) => setLocalMin(e.target.value)}
            />
            <span className={styles.mileageDivider} />
            <input
              type="number"
              placeholder="To"
              className={styles.mileageInput}
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

export default Filters;
