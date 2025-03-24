const BASE_URL = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export async function heroSlidingDeckMovies(page) {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`);
  if (!res.ok) throw Error("Failed to fetch data");
  const data = await res.json();
  return data.results.filter((movie) => movie.vote_average >= 7);
}
