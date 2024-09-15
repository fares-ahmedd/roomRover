import Filter from "./Filter";
import SearchInput from "./SearchInput";

function FilterAndSearch() {
  return (
    <section className="mt-2 mb-4 flex-between gap-2 flex-wrap-reverse max-md:flex-col">
      <Filter />
      <SearchInput />
    </section>
  );
}

export default FilterAndSearch;
