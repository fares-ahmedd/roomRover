import useUrl from "@/hooks/useUrl";

const priceArray = [
  { label: "Lowest Stars", value: "lowest" },
  { label: "highest Stars", value: "highest" },
];
function SortByHotelsStars() {
  const { pathname, router, searchParams } = useUrl();
  const defaultRating = searchParams.get("rating");

  const handleRating = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set("rating", e.target.value);
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };
  return (
    <select
      className="p-2  bg-sec-background  w-full max-w-[150px]  text-sm  border rounded-md font-bold disabled:opacity-35  max-md:max-w-[250px]"
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
  );
}

export default SortByHotelsStars;
