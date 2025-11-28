"use client";

import styles from "./CatalogPage.module.css";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { clientApi } from "@/lib/api/clientApi";
import type { CarsResponse } from "@/types/car";
import { Filters } from "@/components/Filters/Filters";
import { CarsList } from "@/components/CarsList/CarsList";
import { Loader } from "@/components/Loader/Loader";
import { ErrorMessage } from "@/components/ErrorMessage/ErrorMessage";
import { MessageNoCars } from "@/components/MessageNoCars/MessageNoCars";
import { useCarStore } from "@/lib/api/store/useCarsStore";

export function CatalogClient() {
  const { filters } = useCarStore();
  const [page, setPage] = useState(1);
  const [carsAcc, setCarsAcc] = useState<CarsResponse | null>(null);

  const queryKey = ["cars", { filters, page }];

  const { data, isLoading, isError, refetch, isFetching } =
    useQuery<CarsResponse>({
      queryKey,
      queryFn: async () => {
        const params = new URLSearchParams();
        if (filters.brand) params.set("brand", filters.brand);
        if (filters.rentalPrice) params.set("rentalPrice", filters.rentalPrice);
        if (filters.minMileage) params.set("minMileage", filters.minMileage);
        if (filters.maxMileage) params.set("maxMileage", filters.maxMileage);
        params.set("limit", "12");
        params.set("page", String(page));

        const { data } = await clientApi.get<CarsResponse>("/cars", {
          params,
        });
        return data;
      },
      keepPreviousData: true,
    });

  useEffect(() => {
    setPage(1);
    setCarsAcc(null);
  }, [
    filters.brand,
    filters.rentalPrice,
    filters.minMileage,
    filters.maxMileage,
  ]);

  useEffect(() => {
    if (!data) return;

    setCarsAcc((prev) => {
      if (!prev || page === 1) return data;
      return {
        ...data,
        cars: [...prev.cars, ...data.cars],
      };
    });
  }, [data, page]);

  const handleApplyFilters = () => {
    setPage(1);
    setCarsAcc(null);
    refetch();
  };

  const handleLoadMore = () => {
    if (!data || page >= data.totalPages) return;
    setPage((prev) => prev + 1);
  };

  const cars = carsAcc?.cars ?? [];

  return (
    <section className={styles.wrapper}>
      <div className={styles.inner}>
        <Filters onApply={handleApplyFilters} />
        {isLoading && !carsAcc && <Loader />}
        {isError && <ErrorMessage />}

        {!isLoading && !isError && cars.length === 0 && <MessageNoCars />}
        {cars.length > 0 && <CarsList cars={cars} />}

        {carsAcc && carsAcc.page < carsAcc.totalPages && (
          <div className={styles.loadMore}>
            <button
              className={styles.button}
              onClick={handleLoadMore}
              disabled={isFetching}
            >
              {isFetching ? "Loading..." : "Load more"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
