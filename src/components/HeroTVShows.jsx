import { useQuery } from "@tanstack/react-query";
import { heroTVShows } from "../API/api";
import { useNavigate } from "react-router-dom";
import SeriesCard from "./SeriesCard";

export default function HeroTVShows() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["heroTVShows", 1],
    queryFn: () => heroTVShows(1),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 6,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="bg-[#F7EBDF]">
      <div className="flex justify-between items-center px-4 pt-4 mt-10 ">
        <h2 className="text-xl font-bold text-black">Top-Rated TV Shows</h2>
        <p className="text-sm text-blue-600 cursor-pointer hover:underline" onClick={() => navigate("/popular-series")}>
          Browse all
        </p>
      </div>
      <div className="text-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {data
          .filter((movie) => movie.first_air_date.split("-")[0] >= 2020 && movie.vote_average >= 8)
          .slice(0, 8)
          .map((item) => (
            <SeriesCard item={item} key={item.id} />
          ))}
      </div>
    </section>
  );
}
