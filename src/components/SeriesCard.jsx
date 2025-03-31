import { Link } from "react-router-dom";
import { getYear } from "../Utils/getMovieYear";

export default function SeriesCard({ item }) {
  const imageUrl = item.poster_path ? `https://image.tmdb.org/t/p/w342${item.poster_path}` : "/assets/failedLoad.png";
  return (
    <Link to={`/series/${item.id}`}>
      <div className="bg-gray-300 p-2 rounded-lg shadow-md">
        <img
          src={imageUrl}
          alt={item.original_name}
          width="342"
          height="513"
          className="w-full rounded-md"
          loading="lazy"
        />
        <div className="flex justify-between mt-2 text-sm">
          <p className="font-bold">{item.original_name}</p>
          <p>⭐ {item.vote_average ? item.vote_average.toFixed(1) : "N/A"}</p>
        </div>
        <div className="flex justify-between items-center text-xs mt-2">
          <p className="text-gray-600">{getYear(item.first_air_date)}</p>
        </div>
      </div>
    </Link>
  );
}
