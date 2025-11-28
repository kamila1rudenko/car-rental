// components/Filters/Filters.tsx
import { useState, useEffect, useRef } from "react";
import css from "./Filters.module.css";
import { useCarStore } from "@/lib/api/store/useCarsStore";

type FiltersProps = {
  brands?: string[];
};

const Filters = ({ brands }: FiltersProps) => {
  const [isOpenBrand, setIsOpenBrand] = useState(false);
  const [isOpenPrice, setIsOpenPrice] = useState(false);

  const filters = useCarStore((state) => state.filters);
  const editFilters = useCarStore((state) => state.editFilters);

  const [newFilters, setNewFilters] = useState({ ...filters });

  const dropdownRefBrand = useRef<HTMLDivElement>(null);
  const dropdownRefPrice = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNewFilters({ ...filters });
  }, [filters]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        dropdownRefBrand.current &&
        !dropdownRefBrand.current.contains(target) &&
        isOpenBrand
      ) {
        setIsOpenBrand(false);
      }

      if (
        dropdownRefPrice.current &&
        !dropdownRefPrice.current.contains(target) &&
        isOpenPrice
      ) {
        setIsOpenPrice(false);
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpenBrand, isOpenPrice]);

  const onSubmitFiltersClick = () => {
    editFilters(newFilters);
  };

  const formatNumber = (value: string) => {
    const num = value.replace(/\D/g, "");
    return num ? Number(num).toLocaleString("en-US") : "";
  };

  const handleMileageChange = (
    field: "minMileage" | "maxMileage",
    value: string
  ) => {
    const numericValue = value.replace(/\D/g, "");
    setNewFilters((prev) => ({ ...prev, [field]: numericValue }));
  };

  const onClickDropdown = (field: "brand" | "rentalPrice", value: string) => {
    setNewFilters((prev) => ({ ...prev, [field]: value }));
  };

  const priceLabel = newFilters.rentalPrice
    ? `To $${newFilters.rentalPrice}`
    : "Choose a price";

  const brandLabel = newFilters.brand || "Choose a brand";

  return (
    <div className={css.filtersWrapper}>
      <div className={css.filters}>
        {/* BRAND */}
        <div className={css.dropdown} ref={dropdownRefBrand}>
          <p className={css.dropdownLabel}>Car brand</p>
          <button
            type="button"
            className={css.dropdownToggle}
            onClick={() => setIsOpenBrand((prev) => !prev)}
          >
            {brandLabel}
            <svg className={css.arrow}>
              <use
                href={`/sprite.svg#${isOpenBrand ? "icon-arrow-up" : "icon-arrow-down"}`}
              />
            </svg>
          </button>

          {isOpenBrand && (
            <ul className={css.dropdownMenu}>
              <li
                className={css.dropdownItem}
                onClick={() => onClickDropdown("brand", "")}
              >
                All brands
              </li>
              {brands?.map((brand) => (
                <li
                  key={brand}
                  className={css.dropdownItem}
                  onClick={() => onClickDropdown("brand", brand)}
                >
                  {brand}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* PRICE */}
        <div className={css.dropdown} ref={dropdownRefPrice}>
          <p className={css.dropdownLabel}>Price / 1 hour</p>
          <button
            type="button"
            className={css.dropdownToggle}
            onClick={() => setIsOpenPrice((prev) => !prev)}
          >
            {priceLabel}
            <svg className={css.arrow}>
              <use
                href={`/sprite.svg#${isOpenPrice ? "icon-arrow-up" : "icon-arrow-down"}`}
              />
            </svg>
          </button>

          {isOpenPrice && (
            <ul className={css.dropdownMenu}>
              <li
                className={css.dropdownItem}
                onClick={() => onClickDropdown("rentalPrice", "")}
              >
                All prices
              </li>
              {Array.from({ length: 17 }, (_, i) => (i + 1) * 10).map(
                (price) => (
                  <li
                    key={price}
                    className={css.dropdownItem}
                    onClick={() =>
                      onClickDropdown("rentalPrice", price.toString())
                    }
                  >
                    {price}
                  </li>
                )
              )}
            </ul>
          )}
        </div>

        {/* MILEAGE */}
        <div className={css.mileage}>
          <label htmlFor="minMileage" className={css.mileageLabel}>
            Car mileage / km
          </label>
          <div className={css.mileageInputs}>
            <div className={css.mileageInputWrapper}>
              <span className={css.mileagePrefix}>From&nbsp;</span>
              <input
                type="text"
                className={css.mileageInput}
                id="minMileage"
                name="minMileage"
                pattern="[0-9,]*"
                value={formatNumber(newFilters.minMileage || "")}
                onChange={(e) =>
                  handleMileageChange("minMileage", e.target.value)
                }
              />
            </div>
            <div className={css.mileageInputWrapper}>
              <span className={css.mileagePrefix}>To&nbsp;</span>
              <input
                type="text"
                className={css.mileageInput}
                id="maxMileage"
                name="maxMileage"
                pattern="[0-9,]*"
                value={formatNumber(newFilters.maxMileage || "")}
                onChange={(e) =>
                  handleMileageChange("maxMileage", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          className={css.searchButton}
          onClick={onSubmitFiltersClick}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Filters;
