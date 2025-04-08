import { Link, useNavigate } from "react-router-dom";
import { getYearTrending } from "../Utils/getMovieYear";
import { useState, useEffect } from "react";
import { auth } from "../Firebase/firebaseConfig";
import FavoriteButton from "./FavoriteButton";

export default function TrendingMediaCard({ item, isWatchlistEmpty, setIsWatchlistEmpty }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const storedWatchlists = JSON.parse(localStorage.getItem("watchlist")) || {};
    const userWatchlist = storedWatchlists[user.uid] || [];

    setIsFavorite(userWatchlist.some((media) => media.id === item.id));
  }, [item.id]);

  const handleFavoriteClick = () => {
    const user = auth.currentUser;

    if (!user) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      return navigate("/login");
    }

    const storedWatchlists = JSON.parse(localStorage.getItem("watchlist")) || {};
    const userWatchlist = storedWatchlists[user.uid] || [];

    let updatedWatchlist;
    if (isFavorite) {
      updatedWatchlist = userWatchlist.filter((media) => media.id !== item.id);
    } else {
      updatedWatchlist = [...userWatchlist, item];
    }

    storedWatchlists[user.uid] = updatedWatchlist;
    localStorage.setItem("watchlist", JSON.stringify(storedWatchlists));

    setIsFavorite(!isFavorite);

    setIsWatchlistEmpty(updatedWatchlist.length === 0);
  };

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

      <Link to={item.media_type === "movie" ? `/movie/${item.id}` : `/series/${item.id}`}>
        <img
          src={imageUrl}
          alt={item.title || item.original_name}
          className="w-full h-auto rounded-md"
          loading="lazy"
          width="342"
          height="513"
        />
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
      </Link>
    </div>
  );
}
