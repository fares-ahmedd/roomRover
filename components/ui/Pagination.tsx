"use client";
import { useRouter, useSearchParams } from "next/navigation";
import PrimaryButton from "./PrimaryButton";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type Props = {
  currentPage: number;
  pageCount: number;
  query?: string | undefined;
};

function Pagination({ currentPage, pageCount, query }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleNextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    const params = new URLSearchParams(searchParams);
    params.set("page", next.toString());
    router.push(`?${params.toString()}`);
  }

  function handlePrevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    const params = new URLSearchParams(searchParams);
    params.set("page", prev.toString());
    router.push(`?${params.toString()}`);
  }

  console.log(query);

  if (query && query !== " ") return;
  return (
    <div className="mt-4 flex-center gap-4">
      <PrimaryButton
        type="button"
        className="flex items-center gap-1"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        <FaArrowLeft /> Previous
      </PrimaryButton>

      <PrimaryButton
        type="button"
        className="flex items-center gap-1"
        onClick={handleNextPage}
        disabled={currentPage === pageCount}
      >
        Next <FaArrowRight />
      </PrimaryButton>
    </div>
  );
}

export default Pagination;
