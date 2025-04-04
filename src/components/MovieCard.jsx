import { Link, useNavigate } from "react-router-dom";
import { getYear } from "../Utils/getMovieYear";
import { useState, useEffect } from "react";
import { auth } from "../Firebase/firebaseConfig";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function MovieCard({ item, isWatchlistEmpty, setIsWatchlistEmpty }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const storedWatchlists = JSON.parse(localStorage.getItem("watchlist")) || {};
    const userWatchlist = storedWatchlists[user.uid] || [];

    setIsFavorite(userWatchlist.some((movie) => movie.id === item.id));
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
      updatedWatchlist = userWatchlist.filter((movie) => movie.id !== item.id);
    } else {
      updatedWatchlist = [...userWatchlist, item];
    }

    storedWatchlists[user.uid] = updatedWatchlist;
    localStorage.setItem("watchlist", JSON.stringify(storedWatchlists));

    setIsFavorite(!isFavorite);
    setIsWatchlistEmpty(updatedWatchlist.length === 0);
  };

  return (
    <div className="bg-gray-300 p-2 rounded-lg shadow-md relative">
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
