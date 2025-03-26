import { NavLink, Outlet } from "react-router-dom";
import { GiFilmSpool } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";

import Footer from "./Footer";

export default function AppLayout() {
  return (
    <div className="bg-black">
      <div className="">
        <nav className="max-w-[1440px] mx-auto h-[50px] text-white bg-black text-[24px] flex items-center justify-between py-5">
          <div className="flex items-center justify-center gap-1 text-[24px]">
            <GiFilmSpool size="40px" />
            <p>Just Watch</p>
          </div>

          <div className="flex items-center bg-white rounded-[6px] px-2 h-8">
            <IoIosSearch color="black" size="16px" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-white flex-1 h-full px-2 text-black text-sm placeholder:text-sm focus:outline-none leading-[1]  "
            />
          </div>

          <ul className="flex items-center gap-[50px] justify-center">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/movies">Movies</NavLink>
            </li>
            <li>
              <NavLink to="/series">Series</NavLink>
            </li>
            <li>
              <NavLink to="/trending">Trending</NavLink>
            </li>
            <div className="flex gap-1">
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <span>|</span>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </div>
          </ul>
        </nav>
      </div>

      <Outlet />

      <Footer />
    </div>
  );
}
