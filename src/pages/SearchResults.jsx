import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TrendingMediaCard from "../components/TrendingMediaCard";

const BASE_URL = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

async function searchMovies(query, page = 1, signal) {
  const res = await fetch(
    `${BASE_URL}/search/multi?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=${page}`,
    { signal }
  );
  if (!res.ok) throw new Error("Failed to fetch results");
  return res.json();
}

export default function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;

    const debounceTimeout = setTimeout(() => {
      searchMovies(query, 1, signal)
        .then((data) => {
          setResults(data.results || []);
          setNextPage(data.page + 1);
          setTotalPages(data.total_pages);
        })
        .catch((error) => {
          if (error.name !== "AbortError") {
            console.error("Error fetching search results:", error);
          }
        })
        .finally(() => setLoading(false));
    }, 500);

    return () => {
      clearTimeout(debounceTimeout);
      controller.abort();
    };
  }, [query]);

  const loadMoreResults = async () => {
    if (nextPage > totalPages || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const data = await searchMovies(query, nextPage);
      setResults((prevResults) => [...prevResults, ...data.results]);
      setNextPage(data.page + 1);
    } catch (error) {
      console.error("Error fetching more results:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="dots-2"></div>
      </div>
    );

  return (
    <div className="max-w-[1200px] mx-auto mt-5 max-sm:mx-5">
      <h2 className="text-white text-2xl mb-4">Search Results for "{query}"</h2>

      {results.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {results.map((item) => (
              <TrendingMediaCard key={item.id} item={item} />
            ))}
          </div>

          {nextPage <= totalPages &&
            (isLoadingMore ? (
              <div className="flex justify-center my-4">
                <div className="dots-2"></div>
              </div>
            ) : (
              <button
                onClick={loadMoreResults}
                className="mt-5 bg-blue-500 text-white px-4 py-2 rounded-md block mx-auto"
                disabled={isLoadingMore}
              >
                Load More
              </button>
            ))}
        </>
      ) : (
        !loading && <p className="text-white">No results found.</p>
      )}
    </div>
  );
}
