"use client";
import { Country, State, City } from "country-state-city";
import { useCallback } from "react";

function useLocation() {
  function getCountryByCode(countryCode: string) {
    return Country.getAllCountries().find(
      (country) => country.isoCode === countryCode
    );
  }
  function getStateByCode(countryCode: string, stateCode: string) {
    const state = State.getAllStates().find(
      (state) =>
        state.countryCode === countryCode && state.isoCode === stateCode
    );
    if (!state) return null;

    return state;
  }
  console.log(State.getAllStates());

  const getCountryStates = useCallback((name: string) => {
    return State.getAllStates().filter((state) => {
      return state.name === name;
    });
  }, []);

  const getStateCities = useCallback((name: string, stateCode: string) => {
    return City.getAllCities().filter(
      (city) => city.name === name && city.stateCode === stateCode
    );
  }, []);

  return {
    getAllCountries: Country.getAllCountries,
    getCountryByCode,
    getStateByCode,
    getCountryStates,
    getStateCities,
  };
}

export default useLocation;
