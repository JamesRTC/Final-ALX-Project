import { useQuery } from "@tanstack/react-query";
import { heroTopRatedTVShows } from "../API/api";
import { useNavigate } from "react-router-dom";
import SeriesCard from "./SeriesCard";
import useWatchlistEmptyCheck from "../Hooks/useWatchlistEmptyCheck";

export default function HeroTopRatedTVShows() {
  const navigate = useNavigate();
  const { isWatchlistEmpty, setIsWatchlistEmpty } = useWatchlistEmptyCheck();

  const { data, isLoading, error } = useQuery({
    queryKey: ["heroTopRatedTVShows", 1],
    queryFn: () => heroTopRatedTVShows(1),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 6,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen backdrop-blur-md">
        <div className="dots-2"></div>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="bg-[#F7EBDF]">
      <div className="flex justify-between items-center px-4 pt-4 mt-10 max-sm:mt-[-1px]">
        <h2 className="text-xl font-bold text-black max-sm:uppercase max-sm:text-sm">Top-Rated TV Shows</h2>
        <p className="text-sm text-blue-600 cursor-pointer hover:underline" onClick={() => navigate("/popular-series")}>
          Browse all
        </p>
      </div>
      <div className="text-black grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {data.results
          .filter((tvShow) => tvShow.first_air_date.split("-")[0] >= 2020 && tvShow.vote_average >= 8)
          .slice(0, 8)
          .map((item) => (
            <SeriesCard
              item={item}
              key={item.id}
              isWatchlistEmpty={isWatchlistEmpty}
              setIsWatchlistEmpty={setIsWatchlistEmpty}
            />
          ))}
      </div>
    </section>
  );
}
