import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { GiFilmSpool } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";
import { useEffect, useState } from "react";

import Footer from "./Footer";

export default function AppLayout() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (newQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(newQuery)}`);
    }
  };

  useEffect(() => {
    if (!location.pathname.startsWith("/search")) {
      setQuery("");
    }
  }, [location.pathname]);

  const navLinkClasses = ({ isActive }) =>
    `relative hover:text-blue-500 delay-150 ${
      isActive ? "text-blue-500 font-bold" : "before:content-[attr(data-text)] before:invisible before:font-bold"
    }`;

  return (
    <div className="bg-black">
      <nav className="max-w-[1440px] mx-auto h-[50px] text-white bg-black text-[24px] flex items-center justify-between py-5">
        <Link to="/" className="flex items-center justify-center gap-1 text-[24px]">
          <GiFilmSpool size="40px" />
          <p>WatchIT</p>
        </Link>

        <div className="flex items-center bg-white rounded-[6px] px-2 h-8">
          <IoIosSearch color="black" size="16px" />
          <input
            type="text"
            placeholder="e.g. The last of us"
            aria-label="Search movies and series"
            className="bg-white flex-1 h-full px-2 text-black text-sm placeholder:text-sm focus:outline-none leading-[1]"
            value={query}
            onChange={handleSearchChange}
          />
        </div>

        <ul className="flex items-center gap-[50px] justify-center text-xl">
          <li className="hover:text-blue-500 delay-150 hover:text-bold">
            <NavLink className={navLinkClasses} to="/">
              Home
            </NavLink>
          </li>
          <li className="hover:text-blue-500 delay-150">
            <NavLink className={navLinkClasses} to="/movies">
              Movies
            </NavLink>
          </li>
          <li className="hover:text-blue-500 delay-150">
            <NavLink className={navLinkClasses} to="/series">
              Series
            </NavLink>
          </li>
          <li className="hover:text-blue-500 delay-150">
            <NavLink className={navLinkClasses} to="/trending">
              Trending
            </NavLink>
          </li>
          <div className="flex gap-1">
            <li className="hover:text-blue-500 delay-150">
              <NavLink className={navLinkClasses} to="/login">
                Login
              </NavLink>
            </li>
            <span>|</span>
            <li className="hover:text-blue-500 delay-150">
              <NavLink className={navLinkClasses} to="/register">
                Register
              </NavLink>
            </li>
          </div>
        </ul>
      </nav>

      <Outlet />
      <Footer />
    </div>
  );
}
