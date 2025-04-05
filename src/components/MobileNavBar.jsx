import { Link, NavLink } from "react-router-dom";
import { GiFilmSpool } from "react-icons/gi";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import useSearch from "../Hooks/useSearch";
import { useAuth } from "../Context/AuthContext";
import { useEffect, useState } from "react";
import MenuToggle from "./ToggleMenu";
import SearchToggle from "./ToggleSearch";

export default function MobileNavBar({ isOpen, setIsOpen }) {
  const { query, handleSearchChange } = useSearch();
  const { user, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen, setIsSearchOpen]);

  return (
    <>
      <nav className="md:hidden w-full bg-gray-900 text-white p-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl">
          <GiFilmSpool size="30px" />
          <span>WatchIT</span>
        </Link>
        <SearchToggle isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} />
        <MenuToggle isOpen={isOpen} toggleMenu={toggleMenu} />
      </nav>

      {isSearchOpen && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full bg-gray-800 text-white p-4 mt-0"
        >
          <SearchBar query={query} handleSearchChange={handleSearchChange} />
        </motion.div>
      )}

      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: isOpen ? 0 : "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 w-full h-full bg-gray-800 text-white flex flex-col items-center pt-20 shadow-lg z-50 mobile-menu"
      >
        <button className="absolute top-6 right-6 hover:cursor-pointer" onClick={closeMenu}>
          ✕
        </button>
        <NavLink to="/" className="p-4" onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink to="/movies" className="p-4" onClick={closeMenu}>
          Movies
        </NavLink>
        <NavLink to="/series" className="p-4" onClick={closeMenu}>
          Series
        </NavLink>
        <NavLink to="/trending" className="p-4" onClick={closeMenu}>
          Trending
        </NavLink>
        <NavLink to="/watchlist" className="p-4" onClick={closeMenu}>
          Watchlist
        </NavLink>
        {user ? (
          <button onClick={logout} className="p-4 text-red-500">
            Logout
          </button>
        ) : (
          <>
            <NavLink to="/login" className="p-4" onClick={closeMenu}>
              Login
            </NavLink>
            <NavLink to="/register" className="p-4" onClick={closeMenu}>
              Register
            </NavLink>
          </>
        )}
      </motion.div>
    </>
  );
}
