interface ClearFilterProps {
  close?: () => void;
  clearFilters: (close?: () => void) => void;
  hasActiveFilters: () => string | true | null;
}

function ClearFilter({
  close,
  clearFilters,
  hasActiveFilters,
}: ClearFilterProps) {
  if (!hasActiveFilters()) return null;
  return (
    <button
      onClick={() => clearFilters(close)}
      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
    >
      Clear Filters
    </button>
  );
}

export default ClearFilter;
