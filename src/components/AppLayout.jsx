import { NavLink, Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function AppLayout() {
  return (
    <>
      <nav>
        <ul>
          <li>LOGO</li>
          <li>
            <NavLink to="/movies">Movies</NavLink>
          </li>
          <li>
            <NavLink to="/series">Series</NavLink>
          </li>
          <li>
            <NavLink to="/popular">Popular</NavLink>
          </li>
          <div>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            |
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </div>
        </ul>
      </nav>

      <Outlet />

      <Footer />
    </>
  );
}
