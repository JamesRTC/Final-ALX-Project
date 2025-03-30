import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchMovieDetails } from "../API/api";
import DetailsLayout from "../components/DetailsLayout";

export default function MovieDetails() {
  const { id } = useParams();

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movieDetails", id],
    queryFn: () => searchMovieDetails(id),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="dots-2"></div>
      </div>
    );
  if (isError) return <p className="text-white text-center">Failed to fetch details</p>;

  return <DetailsLayout details={movie} />;
}
