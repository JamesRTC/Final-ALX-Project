import { useEffect, useState } from "react";
import { auth } from "../Firebase/firebaseConfig";

export default function useWatchlistEmptyCheck() {
  const [isWatchlistEmpty, setIsWatchlistEmpty] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const storedWatchlists = JSON.parse(localStorage.getItem("watchlist")) || {};
    const userWatchlist = storedWatchlists[user.uid] || [];

    setIsWatchlistEmpty(userWatchlist.length === 0);
  }, []);

  return { isWatchlistEmpty, setIsWatchlistEmpty };
}
