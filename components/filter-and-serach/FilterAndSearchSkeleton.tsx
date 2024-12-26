import React from "react";

function FilterAndSearchSkeleton() {
  return (
    <header className="mt-2 mb-4 flex-between gap-2 flex-wrap-reverse max-md:flex-col">
      <div className="flex gap-3">
        <div className="bg-sec-background animate-skeleton h-10 w-20 rounded-md" />
        <div className="bg-sec-background animate-skeleton h-10 w-28 rounded-md" />
      </div>
      <div className="bg-sec-background animate-skeleton h-10 w-48 rounded-md" />
    </header>
  );
}

export default FilterAndSearchSkeleton;
