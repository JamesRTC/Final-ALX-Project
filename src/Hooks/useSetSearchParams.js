import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function useSetSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const selectedGenre = searchParams.get("genre") || "";
  const selectedYear = searchParams.get("year") || "";
  const selectedRating = searchParams.get("rating") || "";
  const sortBy = searchParams.get("sort_by") || "popularity.desc";

  const handleSearch = (filters) => {
    setSearchParams({
      page: "1",
      genre: filters.genre,
      year: filters.year,
      rating: filters.rating,
      sort_by: filters.sortBy,
    });
  };

  useEffect(() => {
    if (!searchParams.has("page")) {
      setSearchParams({ page: "1" }, { replace: true });
    }
  }, []);

  return { handleSearch, page, selectedGenre, selectedRating, selectedYear, sortBy };
}
