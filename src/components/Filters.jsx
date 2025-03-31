import { useState, useEffect } from "react";
import { fetchGenres } from "../API/api";

export default function Filters({ initialFilters, onSearch }) {
  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    fetchGenres().then((data) => setGenres(data.genres));
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleClearFilters = () => {
    setFilters({ genre: "", year: "", rating: "", sortBy: "popularity.desc" });
    onSearch({ genre: "", year: "", rating: "", sortBy: "popularity.desc" });
  };

  return (
    <div className="flex flex-wrap items-center justify-between bg-gray-700 p-6 rounded-lg shadow-md gap-4">
      <select
        name="genre"
        value={filters.genre}
        onChange={handleChange}
        className="p-2 border border-white rounded-md bg-gray-800 text-white focus:ring focus:ring-blue-500"
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      <select
        name="year"
        value={filters.year}
        onChange={handleChange}
        className="p-2 border border-white rounded-md bg-gray-800 text-white focus:ring focus:ring-blue-500"
      >
        <option value="">Any Year</option>
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2020-now">2020 - Now</option>
        <option value="2010-now">2010 - Now</option>
        <option value="2000-2009">2000 - 2009</option>
        <option value="1990-1999">1990 - 1999</option>
        <option value="1980-1989">1980 - 1989</option>
        <option value="1970-1979">1970 - 1979</option>
        <option value="1950-1966">1950 - 1966</option>
        <option value="1900-1949">1900 - 1949</option>
      </select>

      <select
        name="rating"
        value={filters.rating}
        onChange={handleChange}
        className="p-2 border border-white rounded-md bg-gray-800 text-white focus:ring focus:ring-blue-500"
      >
        <option value="">Any Rating</option>
        {[...Array(10)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}+
          </option>
        ))}
      </select>

      <select
        name="sortBy"
        value={filters.sortBy}
        onChange={handleChange}
        className="p-2 border border-white rounded-md bg-gray-800 text-white focus:ring focus:ring-blue-500"
      >
        <option value="popularity.desc">Most Popular</option>
        <option value="vote_average.desc">Highest Rated</option>
        <option value="release_date.desc">Newest First</option>
      </select>

      <button
        onClick={() => onSearch(filters)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition"
      >
        Search
      </button>

      <button
        onClick={handleClearFilters}
        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md shadow-md transition"
      >
        Clear Filters
      </button>
    </div>
  );
}
