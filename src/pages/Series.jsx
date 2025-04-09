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
    <section className="max-w-[1200px] mx-auto p-4">
      <Filters
        initialFilters={{ genre: selectedGenre, year: selectedYear, rating: selectedRating, sortBy }}
        onSearch={handleSearch}
      />
      <h2 className="text-white font-bold text-4xl text-center mt-5 max-sm:text-2xl">TV Shows</h2>
      {data?.total_pages ? <Pagination totalPages={data.total_pages} /> : null}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {data.results.map((item) => (
          <SeriesCard
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
