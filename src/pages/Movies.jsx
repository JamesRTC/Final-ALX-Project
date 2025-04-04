import { useEffect, useState } from "react";
import { heroSlidingDeckMovies } from "../API/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MovieCard from "../components/MovieCard";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
import { auth } from "../Firebase/firebaseConfig";

export default function Movies() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isWatchlistEmpty, setIsWatchlistEmpty] = useState(true);

  // URL Params
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

  const { data, isLoading, error } = useQuery({
    queryKey: ["movies", page, selectedGenre, selectedYear, selectedRating, sortBy],
    queryFn: () =>
      heroSlidingDeckMovies({ page, genre: selectedGenre, year: selectedYear, rating: selectedRating, sortBy }),
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data && page < data.total_pages) {
      queryClient.prefetchQuery({
        queryKey: ["movies", page + 1, selectedGenre, selectedYear, selectedRating, sortBy],
        queryFn: () =>
          heroSlidingDeckMovies({
            page: page + 1,
            genre: selectedGenre,
            year: selectedYear,
            rating: selectedRating,
            sortBy,
          }),
      });
    }
  }, [page, queryClient, data, selectedGenre, selectedYear, selectedRating, sortBy]);

  const checkWatchlistEmpty = () => {
    const user = auth.currentUser;
    if (!user) return true;

    const storedWatchlists = JSON.parse(localStorage.getItem("watchlist")) || {};
    const userWatchlist = storedWatchlists[user.uid] || [];

    return userWatchlist.length === 0;
  };

  useEffect(() => {
    setIsWatchlistEmpty(checkWatchlistEmpty());
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="dots-2"></div>
      </div>
    );

  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="max-w-[1200px] mx-auto p-4">
      <Filters
        initialFilters={{ genre: selectedGenre, year: selectedYear, rating: selectedRating, sortBy }}
        onSearch={handleSearch}
      />

      <h2 className="text-white font-bold text-4xl text-center mt-5 max-sm:text-2xl">Movies</h2>

      {data?.total_pages ? <Pagination totalPages={data.total_pages} /> : null}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {data.results.map((item) => (
          <MovieCard
            key={item.id}
            item={item}
            isWatchlistEmpty={isWatchlistEmpty}
            setIsWatchlistEmpty={setIsWatchlistEmpty}
          />
        ))}
      </div>

      {data?.total_pages ? <Pagination totalPages={data.total_pages} /> : null}
    </section>
  );
}
