import { useState, useEffect } from "react";
import { auth } from "../Firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function useHandleFavoriteClick(item, setIsWatchlistEmpty) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const storedWatchlists = JSON.parse(localStorage.getItem("watchlist")) || {};
    const userWatchlist = storedWatchlists[user.uid] || [];
    console.log("userWatchlist:", storedWatchlists[user.uid]);
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
  return { handleFavoriteClick, isFavorite };
}
