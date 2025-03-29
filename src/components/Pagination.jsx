import { useSearchParams } from "react-router-dom";

export default function Pagination({ totalPages }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  function goToPage(newPage) {
    setSearchParams({ page: newPage });
  }

  return (
    <div className="flex justify-center items-center gap-4 p-4">
      <button
        className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={() => goToPage(page - 1)}
        disabled={page <= 1}
      >
        Previous
      </button>
      <span className="text-lg font-semibold text-white">
        Page {page} / {totalPages}
      </span>

      <button
        className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={() => goToPage(page + 1)}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
}
