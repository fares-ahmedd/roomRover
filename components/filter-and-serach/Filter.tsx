"use client";
import { IoFilter } from "react-icons/io5";
import Model from "../ui/Model";
import useLocation from "@/hooks/useLocation";
import { ChangeEvent, useEffect, useState } from "react";
import { ICity, IState } from "country-state-city";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PrimaryButton from "../ui/PrimaryButton";
const priceArray = [
  { label: "Lowest Stars", value: "lowest" },
  { label: "highest Stars", value: "highest" },
];

function Filter() {
  const { getAllCountries, getCountryStates, getStateCities } = useLocation();
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const countries = getAllCountries();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const defaultRating = searchParams.get("rating");

  const clearFilters = () => {
    setSelectedCountry("");
    setSelectedCity("");
    setCities([]);
    setStates([]);

    const newParams = new URLSearchParams();
    newParams.set("display", "all");

    router.replace(`${pathname}?${newParams.toString()}`, {
      scroll: false,
    });
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
              <label htmlFor="country" className="mt-1 text-sm text-sec-text">
                Filter Countries:
              </label>
              <select
                className="py-2  bg-sec-background px-4 w-full  border rounded-md font-bold disabled:opacity-35 "
                value={selectedCountry}
                onChange={(e) => handleChange(e, "country")}
                id="country"
              >
                <option value="" disabled selected>
                  Filter By Country
                </option>
                {countries.map((country) => (
                  <option
                    key={country.isoCode}
                    value={`${country.name}?${country.isoCode}`}
                  >
                    {country.name}
                  </option>
                ))}
              </select>
              <label htmlFor="states" className="mt-1 text-sm text-sec-text">
                Filter States:
              </label>

              <select
                className="py-2  bg-sec-background px-4 w-full  border rounded-md font-bold disabled:opacity-35 "
                id="states"
                disabled={states.length < 1}
                value={selectedCity}
                onChange={(e) => handleChange(e, "states")}
              >
                <option value="" disabled selected>
                  Filter By State
                </option>
                {states.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>
              <label htmlFor="cities" className="mt-1 text-sm text-sec-text">
                Filter by cities:
              </label>

              <select
                className="py-2  bg-sec-background px-4 w-full mt-2 border rounded-md font-bold disabled:opacity-35 "
                disabled={cities.length < 1}
                id="cities"
                onChange={(e) => handleChange(e, "cities")}
              >
                <option value="" disabled selected>
                  Filter By City
                </option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
              <section className="flex justify-end items-center gap-2 mt-2">
                <PrimaryButton type="button" onClick={close}>
                  Close
                </PrimaryButton>
                {hasActiveFilters() && (
                  <button
                    onClick={clearFilters}
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
        value={defaultRating || ""}
      >
        <option value="" disabled selected>
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
          onClick={clearFilters}
          className="bg-red-500 w-full max-w-[180px] text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}

export default Filter;
