import { useEffect, useState } from "react";
import { heroTrendingList } from "../API/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import TrendingMediaCard from "../components/TrendingMediaCard";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import { auth } from "../Firebase/firebaseConfig";

export default function Trending() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [isWatchlistEmpty, setIsWatchlistEmpty] = useState(true);

  useEffect(() => {
    if (!searchParams.has("page")) {
      setSearchParams({ page: "1" }, { replace: true });
    }
  }, []);

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["heroTrendingList", page + 1],
      queryFn: () => heroTrendingList(page + 1),
    });
  }, [page, queryClient]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["heroTrendingList", page],
    queryFn: () => heroTrendingList(page),
    keepPreviousData: true,
  });

  const checkWatchlistEmpty = () => {
    const user = auth.currentUser;
    if (!user) return true;

    const storedWatchlists = JSON.parse(localStorage.getItem("watchlist")) || {};
    const userWatchlist = storedWatchlists[user.uid] || [];

    return userWatchlist.length === 0;
  };

  useEffect(() => {
    setIsWatchlistEmpty(checkWatchlistEmpty());
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="dots-2"></div>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="max-w-[1200px] mx-auto">
      <h2 className="text-white font-bold text-4xl text-center mt-5">Trending</h2>
      {data?.total_pages ? <Pagination totalPages={data.total_pages} /> : null}
      <div className="text-black grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {data.results.map((item) => (
          <TrendingMediaCard
            key={item.id}
            item={item}
            isWatchlistEmpty={isWatchlistEmpty}
            setIsWatchlistEmpty={setIsWatchlistEmpty}
          />
        ))}
      </div>
      {data?.total_pages ? <Pagination totalPages={data.total_pages} /> : null}
    </section>
  );
}
