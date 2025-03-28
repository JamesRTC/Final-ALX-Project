import HeroSlidingDeck from "../components/HeroSlidingDeck";
import HeroTopRatedMovies from "../components/HeroTopRatedMovies";
import HeroTrendingList from "../components/HeroTrendingList";
import HeroTVShows from "../components/HeroTVShows";
import HeroUpcomingMovies from "../components/HeroUpcomingMovies";
export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto">
      <HeroSlidingDeck />
      <HeroTrendingList />
      <HeroUpcomingMovies />
      <HeroTopRatedMovies />
      <HeroTVShows />
    </div>
  );
}
