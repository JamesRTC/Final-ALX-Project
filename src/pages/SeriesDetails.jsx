import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchSeriesDetails } from "../API/api";
import DetailsLayout from "../components/DetailsLayout";

export default function SeriesDetails() {
  const { id } = useParams();

  const {
    data: series,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["seriesDetails", id],
    queryFn: () => searchSeriesDetails(id),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="dots-2"></div>
      </div>
    );
  if (isError) return <p className="text-white text-center">Failed to fetch details</p>;

  return <DetailsLayout details={series} />;
}
