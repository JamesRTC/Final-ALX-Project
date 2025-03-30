import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { heroSlidingDeckMovies } from "../API/api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import { getYear } from "../Utils/getMovieYear";
import { Link } from "react-router-dom";

export default function HeroSlidingDeck() {
  const queryClient = useQueryClient();
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPageCount((prev) => prev + 1);
    }, 1000 * 60 * 5);

    return () => clearInterval(interval);
  }, []);

  const { isLoading, data, error } = useQuery({
    queryKey: ["slidingPopularMovies", pageCount],
    queryFn: () => heroSlidingDeckMovies(pageCount),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 6,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["slidingPopularMovies", pageCount + 1],
      queryFn: () => heroSlidingDeckMovies(pageCount + 1),
    });
  }, [pageCount, queryClient]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen backdrop-blur-md">
        <div className="dots-2"></div>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="hero-slider flex justify-center items-center bg-black mt-10">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        effect="coverflow"
        centeredSlides={true}
        slidesPerView={2}
        coverflowEffect={{
          rotate: 10,
          stretch: 0,
          depth: 200,
          modifier: 3,
          slideShadows: false,
        }}
        grabCursor={true}
      >
        {data.results
          .filter((movie) => movie.vote_average >= 7)
          .map((movie) => (
            <SwiperSlide key={movie.id} className="flex justify-center items-center">
              <Link to={`/movie/${movie.id}`}>
                <div className="relative w-[600px] h-[800px]">
                  <img
                    src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-lg shadow-lg object-cover w-full h-full"
                  />
                  <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 rounded-md py-5 px-10">
                    <h2 className="text-lg font-bold">
                      {movie.title} ({getYear(movie.release_date)})
                    </h2>
                    <p>⭐ {movie.vote_average.toFixed(1)}</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
