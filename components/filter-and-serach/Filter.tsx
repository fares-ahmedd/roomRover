"use client";
import { IoFilter } from "react-icons/io5";
import Model from "../ui/Model";
import useLocation from "@/hooks/useLocation";
import { ChangeEvent, useEffect, useState } from "react";
import { ICity, IState } from "country-state-city";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PrimaryButton from "../ui/PrimaryButton";
import Select from "../ui/Select";
const priceArray = [
  { label: "Lowest Stars", value: "lowest" },
  { label: "highest Stars", value: "highest" },
];

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { getAllCountries, getCountryStates, getStateCities } = useLocation();
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const countries = getAllCountries();

  const defaultRating = searchParams.get("rating");

  const clearFilters = (close?: () => void) => {
    setSelectedCountry("");
    setSelectedCity("");
    setCities([]);
    setStates([]);

    router.replace(pathname, {
      scroll: false,
    });

    if (typeof close === "function") {
      close();
    }
  };
  useEffect(() => {
    const countryStates = getCountryStates(selectedCountry ?? "");
    if (countryStates) {
      setStates(countryStates);
    }
  }, [selectedCountry, getCountryStates]);

  useEffect(() => {
    const stateCities = getStateCities(
      selectedCountry ?? "",
      selectedCity ?? ""
    );
    if (stateCities) {
      setCities(stateCities);
    }
  }, [selectedCountry, selectedCity, getStateCities]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>, type: string) => {
    const value = e.target.value;

    if (type === "country") {
      setSelectedCountry(value);
    }
    if (type === "states") {
      setSelectedCity(value);
    }
    const params = new URLSearchParams(searchParams);
    params.set(type, type === "country" ? value.split("?")[0] : value);
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleRating = (e: ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set("rating", e.target.value);
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };
  const hasActiveFilters = () =>
    searchParams.get("country") !== null ||
    searchParams.get("states") !== null ||
    searchParams.get("cities") !== null ||
    searchParams.get("rating");

  return (
    <div className="flex space-x-2 items-center flex-1">
      <Model>
        <Model.OpenModel id="filter">
          <span className="flex items-center gap-1 bg-sec-background py-2 px-3 rounded duration-300 hover:brightness-110">
            Filter <IoFilter />
          </span>
        </Model.OpenModel>
        <Model.Content id="filter" deleteModel={true}>
          {({ close }) => (
            <div className="bg-sec-background text-main-text p-6  w-full h-full rounded-md">
              <h2 className="text-xl md:2xl font-bold mb-2 pb-2 border-b">
                Filter by
              </h2>
              <Select
                label="Filter Countries:"
                optionLabel="Filter By Country"
                id="country"
                onChange={(e) => handleChange(e, "country")}
                value={selectedCountry}
              >
                {countries.map((country) => (
                  <option
                    key={country.isoCode}
                    value={`${country.name}?${country.isoCode}`}
                  >
                    {country.name}
                  </option>
                ))}
              </Select>

              <Select
                label="Filter States:"
                optionLabel="Filter By State"
                id="states"
                onChange={(e) => handleChange(e, "states")}
                value={selectedCity}
                disabled={states.length < 1}
              >
                {states.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </Select>

              <Select
                label="Filter by cities:"
                optionLabel="Filter By cities"
                id="cities"
                onChange={(e) => handleChange(e, "cities")}
                defaultValue={""}
                disabled={cities.length < 1}
              >
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </Select>
              <section className="flex justify-end items-center gap-2 mt-2">
                <PrimaryButton type="button" onClick={close}>
                  Close
                </PrimaryButton>
                {hasActiveFilters() && (
                  <button
                    onClick={() => clearFilters(close)}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
                  >
                    Clear Filters
                  </button>
                )}
              </section>
            </div>
          )}
        </Model.Content>
      </Model>
      <select
        className="p-2   bg-sec-background  w-full max-w-[150px]  text-sm  border rounded-md font-bold disabled:opacity-35  max-md:max-w-[250px]"
        onChange={handleRating}
        value={defaultRating ?? ""}
      >
        <option disabled value="">
          (Sort by Stars)
        </option>
        {priceArray.map((price) => (
          <option key={price.value} value={price.value}>
            {price.label}
          </option>
        ))}
      </select>
      {hasActiveFilters() && (
        <button
          onClick={() => clearFilters()}
          className="bg-red-500 w-full max-w-[180px] text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}

export default Filter;
