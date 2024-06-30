import Filter from "./Filter";
import SearchInput from "./SearchInput";

function FilterAndSearch() {
  return (
    <>
      <section className="mt-2 mb-4 flex-between">
        <Filter />
        <SearchInput />
      </section>
    </>
  );
}

export default FilterAndSearch;
