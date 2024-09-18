"use client";

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import useDebounce from "@/hooks/useDebounce";
import useHotelsTitles from "./useHotelsTitles";

function SearchInput() {
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("query") ?? "");
  const [initialRender, setInitialRender] = useState(true);
  const hotelsTitles = useHotelsTitles();

  const debouncedValue = useDebounce<string>(value, 300);
  const router = useRouter();

  useEffect(() => {
    if (initialRender) return;
    const query = { query: debouncedValue };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );
    router.push(url);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, router]);

  useEffect(() => {
    setInitialRender(false);
  }, []);
  return (
    <div className="flex items-center bg-sec-background border border-b-color rounded-md focus-within:ring-2 focus-within:ring-accent-500">
      <FaSearch className="text-sm ml-3 text-gray-400" />
      <input
        type="search"
        placeholder="Search for hotel..."
        className="py-2 pl-2 pr-4 w-full bg-transparent outline-none duration-300 min-w-[250px]  focus:min-w-[265px] lg:min-w-[350px] lg:focus:min-w-[365px]"
        onChange={(e) => setValue(e.target.value)}
        defaultValue={value}
        list="countries-names"
      />
      <datalist id="countries-names">
        {hotelsTitles.map((hotel: { title: string }, index: number) => (
          <option value={hotel.title} key={index}></option>
        ))}
      </datalist>
    </div>
  );
}

export default SearchInput;
