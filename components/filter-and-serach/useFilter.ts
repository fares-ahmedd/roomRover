import useUrl from "@/hooks/useUrl";
import { ICity, IState } from "country-state-city";

interface FilterProps {
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCity: React.Dispatch<React.SetStateAction<string>>;
  setStates: React.Dispatch<React.SetStateAction<IState[]>>;
  setCities: React.Dispatch<React.SetStateAction<ICity[]>>;
}
function useFilter({
  setSelectedCountry,
  setSelectedCity,
  setStates,
  setCities,
}: FilterProps) {
  const { pathname, router, searchParams } = useUrl();
  const clearFilters = (close?: () => void) => {
    setSelectedCountry("");
    setSelectedCity("");
    setCities([]);
    setStates([]);

    router.replace(pathname, {
      scroll: false,
    });

    if (typeof close === "function") close();
  };

  const hasActiveFilters = () =>
    searchParams.get("country") !== null ||
    searchParams.get("states") !== null ||
    searchParams.get("cities") !== null ||
    searchParams.get("rating");

  return { clearFilters, hasActiveFilters };
}

export default useFilter;
