import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center py-4 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center px-4">
        <p className="text-lg md:mr-4">WatchIT &copy; 2025</p>

        {/* Navigation Links with Separators */}
        <div className="flex flex-wrap items-center gap-4 mt-2 md:mt-0">
          <Link to="/movies" className="hover:underline">
            Browse Movies
          </Link>
          <span>|</span>
          <Link to="/series" className="hover:underline">
            Browse Series
          </Link>
          <span>|</span>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
