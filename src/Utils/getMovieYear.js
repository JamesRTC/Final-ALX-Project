export function getYear(releaseDate) {
  return releaseDate.split("-")[0];
}

export function getYearTrending(item) {
  if (item.media_type === "movie") return item.release_date.split("-")[0];
  if (item.media_type === "tv") return item.first_air_date.split("-")[0];
}
