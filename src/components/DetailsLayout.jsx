import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
export default function DetailsLayout({ details }) {
  const navigate = useNavigate();
  return (
    <div className="text-white min-h-screen ">
      <div
        className="relative w-full h-[500px] bg-cover bg-top-[30px] max-sm:hidden"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${details.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-end p-6">
          <h1 className="text-4xl font-bold">{details.title || details.name}</h1>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="absolute flex p-6 items-center gap-2 font-bold hover:text-blue-500 delay-150 cursor-pointer"
        >
          <IoIosArrowRoundBack /> <span>back</span>
        </button>
      </div>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <button
            onClick={() => navigate(-1)}
            className=" sm:hidden flex items-center gap-2 font-bold hover:text-blue-500 delay-150 cursor-pointer"
          >
            <IoIosArrowRoundBack /> <span>back</span>
          </button>
          <img
            src={`https://image.tmdb.org/t/p/w342${details.poster_path}`}
            alt={details.title || details.name}
            className="w-[250px] rounded-lg shadow-lg max-sm:rounded-none max-sm:w-full"
          />
          <div className="flex-1 space-y-3">
            <p className="text-gray-300 italic">{details.tagline}</p>
            <p className="text-gray-400 leading-6">{details.overview}</p>
            <div className="space-y-2">
              <p>
                <span className="font-bold">Genres:</span> {details.genres.map((g) => g.name).join(", ")}
              </p>
              {details.release_date && (
                <p>
                  <span className="font-bold">Release Date:</span> {details.release_date}
                </p>
              )}
              {details.first_air_date && (
                <p>
                  <span className="font-bold">First Air Date:</span> {details.first_air_date}
                </p>
              )}
              {details.runtime && (
                <p>
                  <span className="font-bold">Runtime:</span> {details.runtime} min
                </p>
              )}
              <p>
                <span className="font-bold">Rating:</span> ⭐ {details.vote_average.toFixed(1)}
              </p>
              {details.number_of_seasons && (
                <p>
                  <span className="font-bold">Number of Seasons:</span> {details.number_of_seasons}
                </p>
              )}
              {details.networks && (
                <p>
                  <span className="font-bold">Networks:</span>{" "}
                  {details.networks.map((network) => network.name).join(", ")}
                </p>
              )}
              {details.status && (
                <p>
                  <span className="font-bold">Status:</span> {details.status}
                </p>
              )}
              <p>
                <span className="font-bold">Spoken Languages:</span>{" "}
                {details.spoken_languages.map((l) => l.english_name).join(", ")}
              </p>
              {details.production_countries.length !== 0 && (
                <p>
                  <span className="font-bold">Production Countries:</span>{" "}
                  {details.production_countries.map((c) => c.name).join(", ")}
                </p>
              )}
            </div>
            {details.imdb_id && (
              <a
                href={`https://www.imdb.com/title/${details.imdb_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-yellow-500 text-black px-4 py-2 rounded-md mt-3"
              >
                View on IMDB
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
