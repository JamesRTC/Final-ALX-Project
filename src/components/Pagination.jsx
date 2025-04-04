import { useSearchParams } from "react-router-dom";

export default function Pagination({ totalPages }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  function goToPage(newPage) {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("page", newPage);
    setSearchParams(updatedParams);
  }

  return (
    <div className="flex justify-center items-center gap-4 p-4 mb-10 mt-5 max-sm:mb-5 max-sm:mt-2 text-white max-sm:text-sm">
      <button
        className="bg-blue-400 hover:bg-blue-500 delay-150 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
        onClick={() => goToPage(page - 1)}
        disabled={page <= 1}
      >
        Previous
      </button>
      <span className="text-lg font-semibold text-white max-sm:text-sm">
        Page {page} / {totalPages}
      </span>
      <button
        className="bg-blue-400 hover:bg-blue-500 delay-150 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
        onClick={() => goToPage(page + 1)}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
}
