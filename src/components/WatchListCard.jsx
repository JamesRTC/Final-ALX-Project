import { Link, useNavigate } from "react-router-dom";
import { getYearWatchlist } from "../Utils/getMovieYear";
import { useState, useEffect } from "react";
import { auth } from "../Firebase/firebaseConfig";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function WatchListCard({ item, onWatchlistChange }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const storedWatchlists = JSON.parse(localStorage.getItem("watchlist")) || {};
    const userWatchlist = storedWatchlists[user.uid] || [];

    setIsFavorite(userWatchlist.some((media) => media.id === item.id));
  }, [user, item.id]);

  const handleFavoriteClick = () => {
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

    if (onWatchlistChange) {
      onWatchlistChange(updatedWatchlist);
    }
  };

  const isMovie = item.release_date && !item.first_air_date;
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
