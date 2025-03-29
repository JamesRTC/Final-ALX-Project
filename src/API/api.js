const BASE_URL = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export async function heroSlidingDeckMovies(page = 1) {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`);
  if (!res.ok) throw Error("Failed to fetch data");
  const data = await res.json();
  return data;
}

export async function heroTrendingList(page = 1) {
  const res = await fetch(`${BASE_URL}/trending/all/day?language=en-US&api_key=${apiKey}&page=${page}`);
  if (!res.ok) throw Error("Failed to fetch data");
  const data = await res.json();
  return data;
}

export async function heroUpcomingMovies(page = 1) {
  const res = await fetch(`${BASE_URL}/movie/upcoming?api_key=${apiKey}&language=en-US&page=${page}`);
  if (!res.ok) throw Error("Failed to fetch data");
  const data = await res.json();
  return data;
}

export async function heroTopRatedMovies(page = 1) {
  const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${apiKey}&language=en-US&page=${page}`);
  if (!res.ok) throw Error("Failed to fetch data");
  const data = await res.json();
  return data;
}

export async function heroTVShows(page = 1) {
  const res = await fetch(`${BASE_URL}/tv/top_rated?api_key=${apiKey}&language=en-US&page=${page}`);
  if (!res.ok) throw Error("Failed to fetch data");
  const data = await res.json();
  return data;
}

export async function tvShows(page = 1) {
  const res = await fetch(`${BASE_URL}/tv/popular?api_key=${apiKey}&language=en-US&page=${page}`);
  if (!res.ok) throw Error("Failed to fetch data");
  const data = await res.json();
  return data;
}

export async function searchLimitedPages(query, maxPages = 3, startPage = 1) {
  let page = startPage;
  let totalPages = 1;
  let allResults = [];

  while (page <= totalPages && page < startPage + maxPages) {
    const res = await fetch(
      `${BASE_URL}/search/multi?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=${page}`
    );
    if (!res.ok) throw new Error("Failed to fetch results");

    const data = await res.json();
    allResults = [...allResults, ...data.results];
    totalPages = data.total_pages;

    if (page >= totalPages) break;
    page++;
  }

  return { results: allResults, nextPage: page <= totalPages ? page : null };
}
