"use client";
import useLocation from "@/hooks/useLocation";
import { ICity, IState } from "country-state-city";
import { useEffect, useState } from "react";

type Props = {
  country: string | undefined;
  city: string | undefined;
  state: string | undefined;
};

function SelectLocation({ country, city, state }: Props) {
  const { getAllCountries, getCountryStates, getStateCities } = useLocation();
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  console.log(selectedCountry);

  const countries = getAllCountries();
  useEffect(() => {
    const country = selectedCountry;
    const countryStates = getCountryStates(country);
    if (countryStates) {
      setStates(countryStates);
    }
  }, [selectedCountry, getCountryStates]);

  useEffect(() => {
    const country = selectedCountry;
    const selectedState = selectedCity;
    const stateCities = getStateCities(country, selectedState);
    if (stateCities) {
      setCities(stateCities);
    }
  }, [selectedCountry, selectedCity, getStateCities]);
  return (
    <section className="mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
        {/* country */}
        <div>
          <span className="block">Select Country</span>
          <label className="block text-sec-text text-sm mb-1">
            In which country is your property located?
          </label>
          <select
            name="country"
            className="py-2 bg-sec-background px-4 w-full border rounded-md font-bold"
            value={selectedCountry ? selectedCountry : country}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="" disabled selected>
              Please Select a country
            </option>
            {countries.map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        {/* State */}
        <div>
          <span className="block">Select State</span>
          <label className="block text-sec-text text-sm mb-1">
            In which state is your property located?
          </label>
          <select
            className="py-2  bg-sec-background px-4 w-full border rounded-md font-bold disabled:opacity-35 "
            name="state"
            disabled={states.length < 1}
            value={selectedCity ? selectedCity : state}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="" disabled selected>
              Please Select a State
            </option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* City */}
      <span className="block">Select City</span>
      <label className="block text-sec-text text-sm mb-1">
        In which city is your property located?{" "}
      </label>
      <select
        className="py-2  bg-sec-background px-4 w-full border rounded-md font-bold disabled:opacity-35 "
        name="city"
        disabled={cities.length < 1}
        value={city}
      >
        <option value="" disabled selected>
          Please Select a City
        </option>
        {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </section>
  );
}

export default SelectLocation;
