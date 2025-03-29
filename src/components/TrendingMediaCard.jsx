import { getYearTrending } from "../Utils/getMovieYear";

export default function TrendingMediaCard({ item }) {
  return (
    <div className="bg-gray-300 p-2 rounded-lg shadow-md">
      <img src={`https://image.tmdb.org/t/p/w780${item.poster_path}`} className="w-full rounded-md" />
      <div className="flex justify-between mt-2 text-sm">
        <p className="font-bold">{item.media_type === "movie" ? item.title : item.original_name}</p>
        <p>⭐ {item.vote_average?.toFixed(1)}</p>
      </div>
      <div className="flex justify-between items-center text-xs mt-2">
        <p className="text-gray-600">{getYearTrending(item)}</p>
        <p className="px-2 py-1 bg-blue-500 text-white rounded-md flex items-center justify-center">
          {item.media_type === "movie" ? "Movie" : "Series"}
        </p>
      </div>
    </div>
  );
}
