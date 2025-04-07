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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPageCount((prev) => prev + 1);
    }, 1000 * 60 * 2);

    return () => clearInterval(interval);
  }, []);

  const { isLoading, data, error } = useQuery({
    queryKey: ["slidingPopularMovies", pageCount],
    queryFn: () => heroSlidingDeckMovies({ page: pageCount }),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 6,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["slidingPopularMovies", pageCount + 1],
      queryFn: () => heroSlidingDeckMovies({ page: pageCount + 1 }),
    });
  }, [pageCount, queryClient]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen backdrop-blur-md">
        <div className="dots-2"></div>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  const mobileSwiper = (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop={true}
      slidesPerView={1}
      spaceBetween={10}
    >
      {data.results
        .filter((movie) => movie.vote_average >= 6)
        .map((movie) => (
          <SwiperSlide key={movie.id} className=" flex justify-center items-center">
            <Link to={`/movie/${movie.id}`}>
              <div className="relative w-[600px] h-[800px] sm:w-[450px] sm:h-[600px] md:w-[550px] md:h-[700px] max-sm:mt-0  max-sm:h-full max-sm:w-full">
                <img
                  src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-lg shadow-lg object-cover w-full h-full max-sm:rounded-none z-1"
                />
                <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 rounded-md py-5 px-10  max-sm:px-5 max-sm-py-2">
                  <h2 className="text-lg font-bold max-sm:text-sm">
                    {movie.title} ({getYear(movie.release_date)})
                  </h2>
                  <p className="max-sm:text-sm">⭐ {movie.vote_average.toFixed(1)}</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
    </Swiper>
  );

  const desktopSwiper = (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop={true}
      effect="coverflow"
      centeredSlides={true}
      slidesPerView={2}
      spaceBetween={20}
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
        .filter((movie) => movie.vote_average >= 6)
        .map((movie) => (
          <SwiperSlide key={movie.id} className="flex justify-center items-center z-1">
            <Link to={`/movie/${movie.id}`}>
              <div className="relative w-[600px] h-[800px] sm:w-[450px] sm:h-[600px] md:w-[550px] md:h-[700px]">
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
  );

  return (
    <div className="hero-slider flex justify-center items-center bg-black mt-10 max-sm:mt-0 max-sm:mb-0">
      {isMobile ? mobileSwiper : desktopSwiper}
    </div>
  );
}
