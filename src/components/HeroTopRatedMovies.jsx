import { useQuery } from "@tanstack/react-query";
import { heroTopRatedMovies } from "../API/api";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";

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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="bg-[#F7EBDF]">
      <div className="flex justify-between items-center px-4 pt-4 mt-10 ">
        <h2 className="text-xl font-bold text-black">Top-Rated Movies</h2>
        <p
          className="text-sm text-blue-600 cursor-pointer hover:underline"
          onClick={() => navigate("/top-rated-movies")}
        >
          Browse all
        </p>
      </div>
      <div className="text-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {data.slice(0, 8).map((item) => (
          <MovieCard item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}
