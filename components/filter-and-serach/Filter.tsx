"use client";
import { IoFilter } from "react-icons/io5";
import Model from "../ui/Model";
import useLocation from "@/hooks/useLocation";
import { useEffect, useState } from "react";
import { ICity, IState } from "country-state-city";

function Filter() {
  const { getAllCountries, getCountryStates, getStateCities } = useLocation();
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const countries = getAllCountries();

  console.log(states);

  useEffect(() => {
    const countryStates = getCountryStates("Egypt" ?? "");
    if (countryStates) {
      setStates(countryStates);
      console.log(countryStates);
    }
  }, [selectedCountry, getCountryStates]);

  useEffect(() => {
    const storeCountry = selectedCountry;
    const storeSelectedState = selectedCity;
    const stateCities = getStateCities(
      storeCountry ?? "",
      storeSelectedState ?? ""
    );
    if (stateCities) {
      setCities(stateCities);
    }
  }, [selectedCountry, selectedCity, getStateCities]);
  console.log(selectedCountry);

  return (
    <div className="flex space-x-2">
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
                onChange={(e) => setSelectedCountry(e.target.value)}
                id="country"
              >
                <option value="" disabled selected>
                  Filter By Country
                </option>
                {countries.map((country) => (
                  <option key={country.isoCode} value={country.name}>
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
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="" disabled selected>
                  Filter By State
                </option>
                {states.map((state) => (
                  <option key={state.isoCode} value={state.name}>
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
            </div>
          )}
        </Model.Content>
      </Model>
      <h1>Place holder</h1>
      <h1>Place holder</h1>
    </div>
  );
}

export default Filter;
