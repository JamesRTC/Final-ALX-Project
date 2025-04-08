import { Link } from "react-router-dom";
import { getYear } from "../Utils/getMovieYear";
import UseHandleFavoriteClick from "../Hooks/useHandleFavoriteClick";
import FavoriteButton from "./FavoriteButton";

export default function MovieCard({ item, isWatchlistEmpty, setIsWatchlistEmpty }) {
  const { handleFavoriteClick, isFavorite } = UseHandleFavoriteClick(item, setIsWatchlistEmpty);

  return (
    <div className="bg-gray-300 p-2 rounded-lg shadow-md relative">
      <FavoriteButton
        handleFavoriteClick={handleFavoriteClick}
        isFavorite={isFavorite}
        isWatchlistEmpty={isWatchlistEmpty}
      />

      <Link to={`/movie/${item.id}`}>
        <img
          src={
            item.poster_path ? `https://image.tmdb.org/t/p/w342${item.poster_path}` : "/assets/image_not_available.png"
          }
          alt={item.original_title}
          loading="lazy"
          className="w-full rounded-md"
          width="342"
          height="513"
        />
        <div className="flex justify-between mt-2 text-sm items-center">
          <p className="font-bold max-w-[200px] max-sm:max-w-[100px]">{item.original_title}</p>
          <p>⭐ {item.vote_average ? item.vote_average.toFixed(1) : "N/A"}</p>
        </div>
        <div className="flex justify-between items-center text-xs mt-2">
          <p className="text-gray-600">{getYear(item.release_date)}</p>
        </div>
      </Link>
    </div>
  );
}
