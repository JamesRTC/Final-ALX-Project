import HeroSlidingDeck from "../components/HeroSlidingDeck";
import HeroTrendingList from "../components/HeroTrendingList";
export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto">
      <HeroSlidingDeck />
      <HeroTrendingList />
    </div>
  );
}
