import { useState, useEffect } from "react";
import { auth } from "../Firebase/firebaseConfig";
import WatchListCard from "../components/WatchListCard";

export default function WatchingList() {
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const storedWatchlists = JSON.parse(localStorage.getItem("watchlist")) || {};
      const userWatchlist = storedWatchlists[user.uid] || [];
      setWatchlistItems(userWatchlist);
    }
  }, [user]);

  const handleWatchlistChange = (updatedWatchlist) => {
    setWatchlistItems(updatedWatchlist);

    if (user) {
      const storedWatchlists = JSON.parse(localStorage.getItem("watchlist")) || {};
      storedWatchlists[user.uid] = updatedWatchlist;
      localStorage.setItem("watchlist", JSON.stringify(storedWatchlists));
    }
  };

  if (!user) {
    return <p className="text-center text-gray-500">Please log in to view your watchlist.</p>;
  }

  return (
    <>
      <h2 className="text-white font-bold text-4xl text-center my-5 max-sm:text-2xl">My Watch List</h2>

      {watchlistItems.length > 0 ? (
        <div className="text-black grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 max-w-[1200px] mx-auto">
          {watchlistItems.map((item) => (
            <WatchListCard key={item.id} item={item} onWatchlistChange={handleWatchlistChange} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-screen w-full px-4">
          <p className="text-center text-gray-500 text-lg mb-4">Your watchlist is empty.</p>
          <img src="/assets/sad4.png" alt="Sad Face" className="w-64 h-auto" />
        </div>
      )}
    </>
  );
}
