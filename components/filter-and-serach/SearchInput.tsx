"use client";

import { FaSearch } from "react-icons/fa";
import { useDataContext } from "../DataContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string";

import useDebounce from "@/hooks/useDebounce";

function SearchInput() {
  const [value, setValue] = useState("");
  const [initialRender, setInitialRender] = useState(true);
  const debouncedValue = useDebounce<string>(value, 300);
  const pathname = usePathname();

  const router = useRouter();

  useEffect(() => {
    const query = { query: debouncedValue };

    if (!window.location.href.includes("query") && initialRender) return;

    const url = qs.stringifyUrl({
      url: window.location.href,
      query:
        window.location.href.includes("query") && initialRender
          ? { query: " " }
          : query,
    });
    router.push(url);
  }, [debouncedValue, router, initialRender]);

  useEffect(() => {
    setInitialRender(false);
  }, [initialRender]);
  if (pathname !== "/") return null;

  return (
    <div className="flex items-center bg-sec-background border border-b-color rounded-md focus-within:ring-2 focus-within:ring-accent-500">
      <FaSearch className="text-sm ml-3 text-gray-400" />
      <input
        type="search"
        placeholder="Search for hotel..."
        className="py-2 pl-2 pr-4 w-full bg-transparent outline-none duration-300 min-w-[250px] focus:min-w-[265px] lg:min-w-[350px] lg:focus:min-w-[365px]"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default SearchInput;
