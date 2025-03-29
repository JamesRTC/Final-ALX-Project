import { useEffect } from "react";
import { heroUpcomingMovies } from "../API/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MovieCard from "../components/MovieCard";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";

export default function UpcomingMovies() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    if (!searchParams.has("page")) {
      setSearchParams({ page: "1" }, { replace: true });
    }
  }, []);

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["heroUpcomingMovies", page + 1],
      queryFn: () => heroUpcomingMovies(page + 1),
    });
  }, [page, queryClient]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["heroUpcomingMovies", page],
    queryFn: () => heroUpcomingMovies(page),
    keepPreviousData: true,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="max-w-[1200px] mx-auto">
      {data?.total_pages ? <Pagination totalPages={data.total_pages} /> : null}
      <div className="text-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {data.results.map((item) => (
          <MovieCard key={item.id} item={item} />
        ))}
      </div>
      {data?.total_pages ? <Pagination totalPages={data.total_pages} /> : null}
    </section>
  );
}
