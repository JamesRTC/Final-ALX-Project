import { useState } from "react";
import { heroTrendingList } from "../API/api";
import { useQuery } from "@tanstack/react-query";
import TrendingMediaCard from "../components/TrendingMediaCard";

export default function Trending() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useQuery({
    queryKey: ["heroTrendingList", page],
    queryFn: () => heroTrendingList(page),
    keepPreviousData: true,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <section className="max-w-[1200px] mx-auto">
      <div className="text-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {data.map((item) => (
          <TrendingMediaCard key={item.id} item={item} />
        ))}

        <button className="text-white" onClick={() => setPage((prev) => prev + 1)}>
          Next Page
        </button>
      </div>
    </section>
  );
}
