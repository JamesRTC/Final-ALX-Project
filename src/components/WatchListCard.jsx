import { Link, useNavigate } from "react-router-dom";
import { getYearWatchlist } from "../Utils/getMovieYear"; // Assuming this utility is working fine
import { useState, useEffect } from "react";
import { auth } from "../Firebase/firebaseConfig"; // Keep auth for user login check
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function WatchListCard({ item, onWatchlistChange }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  // Load watchlist from local storage on mount
  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setIsFavorite(storedWatchlist.some((media) => media.id === item.id));
  }, [item.id]);

  const handleFavoriteClick = () => {
    const user = auth.currentUser;

    if (!user) {
      // Store last page and redirect to login
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      return navigate("/login");
    }

    // Toggle watchlist state in local storage
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    let updatedWatchlist;

    if (isFavorite) {
      updatedWatchlist = storedWatchlist.filter((media) => media.id !== item.id);
    } else {
      updatedWatchlist = [...storedWatchlist, item];
    }

    setIsFavorite(!isFavorite);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));

    // Trigger parent component to update
    if (onWatchlistChange) {
      onWatchlistChange(updatedWatchlist); // Notify parent to update the watchlist
    }
  };

  // Determine if it's a movie or a series based on available date fields
  const isMovie = item.release_date && !item.first_air_date;
  //   const isSeries = item.first_air_date && !item.release_date;

  const imageUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
    : "/assets/image_not_available.png";

  const displayTitle = isMovie ? item.title : item.original_name;

  return (
    <div className="bg-gray-300 p-2 rounded-lg shadow-md relative">
      <button
        className="absolute top-6 right-6 max-sm:top-3 max-sm:right-3 p-2 bg-black/50 rounded-full"
        onClick={handleFavoriteClick}
      >
        {isFavorite ? <AiFillHeart color="red" size={20} /> : <AiOutlineHeart color="white" size={20} />}
      </button>
      <Link to={isMovie ? `/movie/${item.id}` : `/series/${item.id}`}>
        <img
          src={imageUrl}
          alt={displayTitle}
          className="w-full h-auto rounded-md"
          loading="lazy"
          width="342"
          height="513"
        />
        <div className="flex justify-between mt-2 text-sm">
          <p className="font-bold">{displayTitle}</p>
          <p>⭐ {item.vote_average?.toFixed(1)}</p>
        </div>
        <div className="flex justify-between items-center text-xs mt-2">
          <p className="text-gray-600">{getYearWatchlist(item)}</p>
          <p className="px-2 py-1 bg-blue-500 text-white rounded-md flex items-center justify-center">
            {isMovie ? "Movie" : "Series"}
          </p>
        </div>
      </Link>
    </div>
  );
}
