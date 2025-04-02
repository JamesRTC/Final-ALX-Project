import { useState, useEffect } from "react";
import WatchListCard from "../components/WatchListCard";

export default function WatchingList() {
  const [watchlistItems, setWatchlistItems] = useState([]);

  // Load the watchlist from local storage on mount
  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlistItems(storedWatchlist);
  }, []);

  // Handle watchlist changes (items added or removed)
  const handleWatchlistChange = (updatedWatchlist) => {
    setWatchlistItems(updatedWatchlist); // Update the watchlist state
  };

  return (
    <>
      <h2 className="text-white font-bold text-4xl text-center my-5">My Watch List</h2>
      <div className="text-black grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 max-w-[1200px] mx-auto">
        {watchlistItems.length > 0 ? (
          watchlistItems.map((item) => (
            <WatchListCard key={item.id} item={item} onWatchlistChange={handleWatchlistChange} />
          ))
        ) : (
          <p className="text-center text-gray-500">Your watchlist is empty.</p>
        )}
      </div>
    </>
  );
}
