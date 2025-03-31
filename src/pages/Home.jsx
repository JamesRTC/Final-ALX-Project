import HeroSlidingDeck from "../components/HeroSlidingDeck";
import HeroTopRatedMovies from "../components/HeroTopRatedMovies";
import HeroTrendingList from "../components/HeroTrendingList";
import HeroUpcomingMovies from "../components/HeroUpcomingMovies";
import HeroTopRatedTVShows from "../components/HeroTopRatedTVShows";
export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto">
      <HeroSlidingDeck />
      <HeroTrendingList />
      <HeroUpcomingMovies />
      <HeroTopRatedMovies />
      <HeroTopRatedTVShows />
    </div>
  );
}
