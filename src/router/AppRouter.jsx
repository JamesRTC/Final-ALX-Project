import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import Series from "../pages/Series";
import Trending from "../pages/Trending";
import UpcomingMovies from "../pages/UpcomingMovies";
import PopularSeries from "../pages/PopularSeries";
import TopRatedMovies from "../pages/TopRatedMovies";
import SearchResults from "../pages/SearchResults";
import MovieDetails from "../pages/MovieDetails";
import SeriesDetails from "../pages/SeriesDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import WatchList from "../pages/WatchList";
import NotFound from "../pages/NotFound";

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
          <Route path="movie/:id" element={<MovieDetails />} />
          <Route path="series/:id" element={<SeriesDetails />} />
          <Route path="/watchlist" element={<ProtectedRoute />}>
            <Route index element={<WatchList />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
