import { Link } from "react-router-dom";
import { getYearWatchlist } from "../Utils/getMovieYear";
import UseHandleFavoriteClick from "../Hooks/useHandleFavoriteClick";
import FavoriteButton from "./FavoriteButton";

export default function SeriesCard({ item, isWatchlistEmpty, setIsWatchlistEmpty }) {
  const { handleFavoriteClick, isFavorite } = UseHandleFavoriteClick(item, setIsWatchlistEmpty);

  const imageUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
    : "/assets/image_not_available.png";

  return (
    <div className="bg-gray-300 p-2 rounded-lg shadow-md relative">
      <FavoriteButton
        handleFavoriteClick={handleFavoriteClick}
        isFavorite={isFavorite}
        isWatchlistEmpty={isWatchlistEmpty}
      />

      <Link to={`/series/${item.id}`}>
        <img
          src={imageUrl}
          alt={item.original_name}
          className="w-full h-auto rounded-md"
          loading="lazy"
          width="342"
          height="513"
        />
        <div className="flex justify-between mt-2 text-sm">
          <p className="font-bold max-w-[200px] max-sm:max-w-[100px]">{item.original_name}</p>
          <p className="flex-nowrap">⭐ {item.vote_average?.toFixed(1)}</p>
        </div>
        <div className="flex justify-between items-center text-xs mt-2">
          <p className="text-gray-600">{getYearWatchlist(item)}</p>
          <p className="px-2 py-1 bg-blue-500 text-white rounded-md flex items-center justify-center">Series</p>
        </div>
      </Link>
    </div>
  );
}
