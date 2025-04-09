import { useEffect } from "react";
import { heroTVShows } from "../API/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SeriesCard from "../components/SeriesCard";

import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
import useWatchlistEmptyCheck from "../Hooks/useWatchlistEmptyCheck";
import useSetSearchParams from "../Hooks/useSetSearchParams";

export default function Series() {
  const { handleSearch, page, selectedGenre, selectedRating, selectedYear, sortBy } = useSetSearchParams();
  const { isWatchlistEmpty, setIsWatchlistEmpty } = useWatchlistEmptyCheck();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["series", page + 1, selectedGenre, selectedYear, selectedRating, sortBy],
      queryFn: () =>
        heroTVShows({
          page: page + 1,
          genre: selectedGenre,
          year: selectedYear,
          rating: selectedRating,
          sortBy,
        }),
    });
  }, [page, queryClient, selectedGenre, selectedYear, selectedRating, sortBy]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["series", page, selectedGenre, selectedYear, selectedRating, sortBy],
    queryFn: () => heroTVShows({ page, genre: selectedGenre, year: selectedYear, rating: selectedRating, sortBy }),
    keepPreviousData: true,
  });

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

      <h2 className="text-white font-bold text-4xl text-center mt-5 max-sm:text-2xl">Series</h2>

      {data?.total_pages && data.results.length !== 0 ? <Pagination totalPages={data.total_pages} /> : null}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {data.results.length === 0 ? (
          <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col justify-center items-center">
            <p className="text-center text-gray-500 text-lg mb-4">No items found.</p>
            <img src="/assets/sad4.png" alt="Sad Face" className="w-64 h-auto" />
          </div>
        ) : (
          data.results.map((item) => (
            <SeriesCard
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
