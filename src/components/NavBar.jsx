import { Link, NavLink } from "react-router-dom";
import { GiFilmSpool } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import SearchBar from "./SearchBar";
import useSearch from "../Hooks/useSearch";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function NavBar() {
  const { query, handleSearchChange } = useSearch();
  const { user, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(window.innerWidth <= 1250);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth <= 1250);
      if (window.innerWidth > 1250) setIsSearchOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const navLinkClasses = ({ isActive }) =>
    `relative hover:text-blue-500 delay-150 ${
      isActive ? "text-blue-500 font-bold" : "before:content-[attr(data-text)] before:invisible before:font-bold"
    }`;

  return (
    <nav className="max-md:hidden w-full mx-auto h-[50px] text-white bg-gray-900 text-[24px] flex items-center justify-between py-8 border-b-gray-800 px-10">
      <Link to="/" className="flex items-center justify-center gap-1 text-[24px]">
        <GiFilmSpool size="40px" />
        <p>WatchIT</p>
      </Link>

      {isCompact ? (
        <button onClick={toggleSearch} className="relative p-2">
          <IoIosSearch size={24} />
        </button>
      ) : (
        <SearchBar query={query} handleSearchChange={handleSearchChange} />
      )}

      {isSearchOpen && isCompact && (
        <motion.div
          initial={{ opacity: 0, y: "-50px" }}
          animate={{ opacity: 1, y: "0" }}
          exit={{ opacity: 0, y: "-50px" }}
          transition={{ duration: 0.3 }}
          className="absolute top-[60px] left-0 w-full bg-gray-800 p-4 rounded shadow-lg"
        >
          <SearchBar query={query} handleSearchChange={handleSearchChange} />
        </motion.div>
      )}

      <ul className="flex items-center gap-[50px] max-[950px]:gap-[25px] max-[950px]:text-[20px]  justify-center text-xl">
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

        <div className="relative">
          {user ? (
            <button onClick={toggleUserMenu} className="p-2 hover:cursor-pointer">
              <FaUserCircle size={30} />
            </button>
          ) : (
            <NavLink className={navLinkClasses} to="/login">
              Login
            </NavLink>
          )}

          {isUserMenuOpen && user && (
            <motion.div
              initial={{ opacity: 0, y: "-10px" }}
              animate={{ opacity: 1, y: "0" }}
              exit={{ opacity: 0, y: "-10px" }}
              transition={{ duration: 0.3 }}
              className="absolute left-1/2 transform -translate-x-1/2 bg-gray-800 p-4 rounded shadow-lg w-32 mt-2"
            >
              <ul>
                <li
                  className="hover:text-red-500 cursor-pointer text-center"
                  onClick={async () => {
                    await logout();
                    setIsUserMenuOpen(false);
                  }}
                >
                  Logout
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </ul>
    </nav>
  );
}
