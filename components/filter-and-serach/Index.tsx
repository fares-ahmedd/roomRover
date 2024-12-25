import { supabase } from "@/lib/supabase";
import Filter from "./Filter";
import SearchInput from "./SearchInput";

async function FilterAndSearch() {
  const { data: hotelsTitles } = await supabase.from("hotels").select("title");
  return (
    <header className="mt-2 mb-4 flex-between gap-2 flex-wrap-reverse max-md:flex-col">
      <Filter />
      <SearchInput hotelsTitles={hotelsTitles} />
    </header>
  );
}

export default FilterAndSearch;
