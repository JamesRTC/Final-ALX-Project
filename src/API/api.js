const BASE_URL = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export async function heroSlidingDeckMovies(page = 1) {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`);
  if (!res.ok) throw Error("Failed to fetch data");
  const data = await res.json();
  return data.results;
}

export async function heroTrendingList(page = 1) {
  const res = await fetch(`${BASE_URL}/trending/all/day?language=en-US&api_key=${apiKey}&page=${page}`);
  if (!res.ok) throw Error("Failed to fetch data");
  const data = await res.json();
  return data.results;
}

export async function heroUpcomingMovies(page = 1) {
  const res = await fetch(`${BASE_URL}/movie/upcoming?api_key=${apiKey}&language=en-US&page=${page}`);
  if (!res.ok) throw Error("Failed to fetch data");
  const data = await res.json();
  return data.results;
}

export async function heroTopRatedMovies(page = 1) {
  const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${apiKey}&language=en-US&page=${page}`);
  if (!res.ok) throw Error("Failed to fetch data");
  const data = await res.json();
  return data.results;
}

export async function heroTVShows(page = 1) {
  const res = await fetch(`${BASE_URL}/tv/top_rated?api_key=${apiKey}&language=en-US&page=${page}`);
  if (!res.ok) throw Error("Failed to fetch data");
  const data = await res.json();
  return data.results;
}

export async function tvShows(page = 1) {
  const res = await fetch(`${BASE_URL}/tv/popular?api_key=${apiKey}&language=en-US&page=${page}`);
  if (!res.ok) throw Error("Failed to fetch data");
  const data = await res.json();
  return data.results;
}
