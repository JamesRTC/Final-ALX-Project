import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { heroTVShows } from "../API/api";
import SeriesCard from "../components/SeriesCard";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";

export default function PopularSeries() {
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
      queryKey: ["heroTVShows", page + 1],
      queryFn: () => heroTVShows(page + 1),
    });
  }, [page, queryClient]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["heroTVShows", page],
    queryFn: () => heroTVShows(page),
    keepPreviousData: true,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="max-w-[1200px] mx-auto">
      <Pagination />
      <div className="text-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {data.map((item) => (
          <SeriesCard key={item.id} item={item} />
        ))}
      </div>
      <Pagination />
    </section>
  );
}
