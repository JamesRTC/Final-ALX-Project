import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { heroTopRatedMovies } from "../API/api";
import MovieCard from "../components/MovieCard";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";

export default function TopRatedMovies() {
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
      queryKey: ["heroTopRatedMovies", page + 1],
      queryFn: () => heroTopRatedMovies(page + 1),
    });
  }, [page, queryClient]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["heroTopRatedMovies", page],
    queryFn: () => heroTopRatedMovies(page),
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
    <section className="max-w-[1200px] mx-auto">
      <h2 className="text-white font-bold text-4xl text-center mt-5 max-sm:text-2xl">Top-Rated Movies</h2>
      {data?.total_pages ? <Pagination totalPages={data.total_pages} /> : null}
      <div className="text-black grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {data.results.map((item) => (
          <MovieCard key={item.id} item={item} />
        ))}
      </div>
      {data?.total_pages ? <Pagination totalPages={data.total_pages} /> : null}
    </section>
  );
}
