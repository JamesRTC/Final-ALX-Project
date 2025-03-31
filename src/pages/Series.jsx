import { useEffect, useState } from "react";
import { fetchGenres, heroTVShows } from "../API/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SeriesCard from "../components/SeriesCard";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";

export default function Series() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const selectedGenre = searchParams.get("genre") || "";
  const selectedYear = searchParams.get("year") || "";
  const selectedRating = searchParams.get("rating") || "";
  const sortBy = searchParams.get("sort_by") || "popularity.desc";

  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState({
    genre: selectedGenre,
    year: selectedYear,
    rating: selectedRating,
    sortBy: sortBy,
  });

  useEffect(() => {
    fetchGenres().then((data) => setGenres(data.genres));
  }, []);

  useEffect(() => {
    setFilters({
      genre: selectedGenre,
      year: selectedYear,
      rating: selectedRating,
      sortBy: sortBy,
    });
  }, [selectedGenre, selectedYear, selectedRating, sortBy]);

  const handleSearch = (newFilters) => {
    setSearchParams({
      page: "1",
      genre: newFilters.genre,
      year: newFilters.year,
      rating: newFilters.rating,
      sort_by: newFilters.sortBy,
    });
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["series", page, selectedGenre, selectedYear, selectedRating, sortBy],
    queryFn: () => heroTVShows({ page, genre: selectedGenre, year: selectedYear, rating: selectedRating, sortBy }),
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data && page < data.total_pages) {
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
    <section className="max-w-[1200px] mx-auto p-4">
      <Filters genres={genres} initialFilters={filters} onSearch={handleSearch} />
      <h2 className="text-white font-bold text-4xl text-center mt-5">TV Series</h2>
      {data?.total_pages ? <Pagination totalPages={data.total_pages} /> : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {data.results.map((item) => (
          <SeriesCard key={item.id} item={item} />
        ))}
      </div>
      {data?.total_pages ? <Pagination totalPages={data.total_pages} /> : null}
    </section>
  );
}
