"use client";

import { FaSearch } from "react-icons/fa";

function SearchInput() {
  return (
    <div className="flex items-center bg-sec-background border border-b-color rounded-md focus-within:ring-2 focus-within:ring-accent-500">
      <FaSearch className="text-sm ml-3 text-gray-400" />
      <input
        type="search"
        placeholder="Search for hotel..."
        className="py-2 pl-2 pr-4 w-full bg-transparent outline-none duration-300 min-w-[250px] focus:min-w-[265px] lg:min-w-[350px] lg:focus:min-w-[365px]"
      />
    </div>
  );
}

export default SearchInput;
