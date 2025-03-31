const BASE_URL = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export async function heroSlidingDeckMovies({ page = 1, genre, year, rating, sortBy }) {
  const url = new URL(`${BASE_URL}/discover/movie`);
  url.searchParams.append("api_key", apiKey);
  url.searchParams.append("language", "en-US");
  url.searchParams.append("page", page);

  if (genre) url.searchParams.append("with_genres", genre);
  if (rating) url.searchParams.append("vote_average.gte", rating);
  if (sortBy) url.searchParams.append("sort_by", sortBy);

  // Handle grouped year ranges
  if (year) {
    if (year === "2020-now") {
      url.searchParams.append("primary_release_date.gte", "2020-01-01");
    } else if (year === "2010-now") {
      url.searchParams.append("primary_release_date.gte", "2010-01-01");
    } else if (year.includes("-")) {
      const [start, end] = year.split("-");
      url.searchParams.append("primary_release_date.gte", `${start}-01-01`);
      url.searchParams.append("primary_release_date.lte", `${end}-12-31`);
    } else {
      url.searchParams.append("primary_release_year", year);
    }
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch data");
  return await res.json();
}

export async function heroTVShows({ page = 1, genre, year, rating, sortBy }) {
  const url = new URL(`${BASE_URL}/discover/tv`);
  url.searchParams.append("api_key", apiKey);
  url.searchParams.append("language", "en-US");
  url.searchParams.append("page", page);

  if (genre) url.searchParams.append("with_genres", genre);
  if (rating) url.searchParams.append("vote_average.gte", rating);
  if (sortBy) url.searchParams.append("sort_by", sortBy);

  // Handle grouped year ranges
  if (year) {
    if (year === "2020-now") {
      url.searchParams.append("first_air_date.gte", "2020-01-01");
    } else if (year === "2010-now") {
      url.searchParams.append("first_air_date.gte", "2010-01-01");
    } else if (year.includes("-")) {
      const [start, end] = year.split("-");
      url.searchParams.append("first_air_date.gte", `${start}-01-01`);
      url.searchParams.append("first_air_date.lte", `${end}-12-31`);
    } else {
      url.searchParams.append("first_air_date_year", year);
    }
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch data");
  return await res.json();
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

export async function heroTopRatedTVShows(page = 1) {
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

export async function searchMovieDetails(movieID) {
  const res = await fetch(`${BASE_URL}/movie/${movieID}?api_key=${apiKey}&language=en-US`);
  if (!res.ok) throw Error("Failed to fetch data");
  const data = await res.json();
  return data;
}
export async function searchSeriesDetails(seriesID) {
  const res = await fetch(`${BASE_URL}/tv/${seriesID}?api_key=${apiKey}&language=en-US`);
  if (!res.ok) throw Error("Failed to fetch data");
  const data = await res.json();
  return data;
}

export async function fetchGenres() {
  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${apiKey}&language=en-US`);
  if (!res.ok) throw new Error("Failed to fetch genres");
  return await res.json();
}
