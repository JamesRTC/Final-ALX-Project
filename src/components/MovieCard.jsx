import { Link } from "react-router-dom";
import { getYear } from "../Utils/getMovieYear";

export default function MovieCard({ item }) {
  const imageUrl = item.poster_path ? `https://image.tmdb.org/t/p/w342${item.poster_path}` : "/assets/failedLoad.png";
  return (
    <Link to={`/movie/${item.id}`}>
      <div className="bg-gray-300 p-2 rounded-lg shadow-md">
        <img
          src={imageUrl}
          alt={item.original_name}
          loading="lazy"
          width="342"
          height="513"
          className="w-full rounded-md"
        />
        <div className="flex justify-between mt-2 text-sm items-center ">
          <p className="font-bold">{item.original_title}</p>
          <p>⭐ {item.vote_average.toFixed(1)}</p>
        </div>
        <div className="flex justify-between items-center text-xs mt-2">
          <p className="text-gray-600">{getYear(item.release_date)}</p>
        </div>
      </div>
    </Link>
  );
}
