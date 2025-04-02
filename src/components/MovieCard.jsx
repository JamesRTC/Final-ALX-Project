import { Link, useNavigate } from "react-router-dom";
import { getYear } from "../Utils/getMovieYear";
import { useState, useEffect } from "react";
import { auth } from "../Firebase/firebaseConfig"; // Keep auth for user login check
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function MovieCard({ item }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  // Load watchlist from local storage on mount
  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setIsFavorite(storedWatchlist.some((movie) => movie.id === item.id));
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
      updatedWatchlist = storedWatchlist.filter((movie) => movie.id !== item.id);
    } else {
      updatedWatchlist = [...storedWatchlist, item];
    }

    setIsFavorite(!isFavorite);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  return (
    <div className="bg-gray-300 p-2 rounded-lg shadow-md relative">
      <button
        className="absolute top-6 right-6 max-sm:top-3 max-sm:right-3 p-2 bg-black/50 rounded-full"
        onClick={handleFavoriteClick}
      >
        {isFavorite ? <AiFillHeart color="red" size={20} /> : <AiOutlineHeart color="white" size={20} />}
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
          <p className="font-bold">{item.original_title}</p>
          <p>⭐ {item.vote_average ? item.vote_average.toFixed(1) : "N/A"}</p>
        </div>
        <div className="flex justify-between items-center text-xs mt-2">
          <p className="text-gray-600">{getYear(item.release_date)}</p>
        </div>
      </Link>
    </div>
  );
}
