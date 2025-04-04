import { useQuery } from "@tanstack/react-query";
import { heroTopRatedMovies } from "../API/api";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";
import { auth } from "../Firebase/firebaseConfig";

export default function HeroTopRatedMovies() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["heroTopRatedMovies", 1],
    queryFn: () => heroTopRatedMovies(1),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 6,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const [isWatchlistEmpty, setIsWatchlistEmpty] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const storedWatchlists = JSON.parse(localStorage.getItem("watchlist")) || {};
    const userWatchlist = storedWatchlists[user.uid] || [];

    setIsWatchlistEmpty(userWatchlist.length === 0);
  }, []);

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
        <h2 className="text-xl font-bold text-black max-sm:uppercase max-sm:text-sm">Top-Rated Movies</h2>
        <p
          className="text-sm text-blue-600 cursor-pointer hover:underline"
          onClick={() => navigate("/top-rated-movies")}
        >
          Browse all
        </p>
      </div>
      <div className="text-black grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {data.results.slice(0, 8).map((item) => (
          <MovieCard
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
