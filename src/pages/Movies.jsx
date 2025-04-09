import { useEffect } from "react";
import { heroSlidingDeckMovies } from "../API/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
import useWatchlistEmptyCheck from "../Hooks/useWatchlistEmptyCheck";
import useSetSearchParams from "../Hooks/useSetSearchParams";

export default function Movies() {
  const { handleSearch, page, selectedGenre, selectedRating, selectedYear, sortBy } = useSetSearchParams();
  const { isWatchlistEmpty, setIsWatchlistEmpty } = useWatchlistEmptyCheck();

  const queryClient = useQueryClient();

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

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="dots-2"></div>
      </div>
    );

  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="max-w-[1200px] mx-auto p-4 relative">
      <Filters
        initialFilters={{ genre: selectedGenre, year: selectedYear, rating: selectedRating, sortBy }}
        onSearch={handleSearch}
      />

      <h2 className="text-white font-bold text-4xl text-center mt-5 max-sm:text-2xl">Movies</h2>

      {data?.total_pages && data.results.length !== 0 ? <Pagination totalPages={data.total_pages} /> : null}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {data.results.length === 0 ? (
          <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col justify-center items-center">
            <p className="text-center text-gray-500 text-lg mb-4">No items found.</p>
            <img src="/assets/sad4.png" alt="Sad Face" className="w-64 h-auto" />
          </div>
        ) : (
          data.results.map((item) => (
            <MovieCard
              key={item.id}
              item={item}
              isWatchlistEmpty={isWatchlistEmpty}
              setIsWatchlistEmpty={setIsWatchlistEmpty}
            />
          ))
        )}
      </div>

      {data?.total_pages && data.results.length !== 0 ? <Pagination totalPages={data.total_pages} /> : null}
    </section>
  );
}
