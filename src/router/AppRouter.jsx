import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Home from "../Pages/Home";
import Movies from "../Pages/Movies";
import Series from "../Pages/Series";
import Trending from "../pages/Trending";
import UpcomingMovies from "../pages/UpcomingMovies";
import PopularSeries from "../pages/PopularSeries";
import TopRatedMovies from "../pages/TopRatedMovies";
import SearchResults from "../pages/SearchResults";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="upcoming-movies" element={<UpcomingMovies />} />
          <Route path="top-rated-movies" element={<TopRatedMovies />} />
          <Route path="series" element={<Series />} />
          <Route path="popular-series" element={<PopularSeries />} />
          <Route path="trending" element={<Trending />} />
          <Route path="search" element={<SearchResults />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
