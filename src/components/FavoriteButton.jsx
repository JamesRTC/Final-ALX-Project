import UseHandleFavoriteClick from "../Hooks/useHandleFavoriteClick";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
export default function FavoriteButton({ isWatchlistEmpty, handleFavoriteClick, isFavorite }) {
  return (
    <button
      className="absolute top-6 right-6 max-sm:top-3 max-sm:right-3 p-2 bg-black/50 rounded-full group"
      onClick={handleFavoriteClick}
    >
      {isFavorite ? <AiFillHeart color="red" size={20} /> : <AiOutlineHeart color="white" size={20} />}

      {isWatchlistEmpty && (
        <span className="absolute min-w-[100px] bottom-[-40px] left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs px-1 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          {isFavorite ? "Remove from Watchlist" : "Add to Watchlist"}
        </span>
      )}
    </button>
  );
}
