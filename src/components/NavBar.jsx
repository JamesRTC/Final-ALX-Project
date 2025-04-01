import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { GiFilmSpool } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";
import { useAuth } from "../context/AuthContext"; // Import auth context

export default function NavBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth(); // Get user and logout function

  console.log("AuthContext values:", { user, logout });

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
    <nav className="w-full max-w-[1440px] mx-auto h-[50px] text-white bg-gray-900 text-[24px] flex items-center justify-between py-5 border-b-gray-800 border-b-1 px-5 rounded-lg">
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
        <li className="hover:text-blue-500 delay-150">
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
        <li className="hover:text-blue-500 delay-150">
          <NavLink className={navLinkClasses} to="/watchlist">
            Watchlist
          </NavLink>
        </li>

        <div className="flex gap-1">
          {user ? (
            <>
              <li className="text-blue-400">Hi, {user.displayName || "User"}</li>
              <span>|</span>
              <li
                className="hover:text-red-500 cursor-pointer"
                onClick={async () => {
                  await logout();
                }}
              >
                Logout
              </li>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </ul>
    </nav>
  );
}
