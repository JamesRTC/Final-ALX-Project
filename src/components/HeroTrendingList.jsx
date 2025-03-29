import { useQuery } from "@tanstack/react-query";
import { heroTrendingList } from "../API/api";
import TrendingMediaCard from "./TrendingMediaCard";
import { useNavigate } from "react-router-dom";

export default function HeroTrendingList() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["heroTrendingList", 1],
    queryFn: () => heroTrendingList(1),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 6,
    refetchOnWindowFocus: false,
    keepPrekeepPreviousData: true,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="bg-[#F7EBDF]">
      <div className="flex justify-between items-center px-4 pt-4 mt-10 ">
        <h2 className="text-xl font-bold text-black">Trending</h2>
        <p className="text-sm text-blue-600 cursor-pointer hover:underline" onClick={() => navigate("/trending")}>
          Browse all
        </p>
      </div>
      <div className="text-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {data.results.slice(0, 8).map((item) => (
          <TrendingMediaCard item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}
