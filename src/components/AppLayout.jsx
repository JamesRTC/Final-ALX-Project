import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import NavBar from "./NavBar";

export default function AppLayout() {
  return (
    <div className="bg-black flex flex-col min-h-screen">
      <NavBar />

      {/* Ensures content area fills available space */}
      <section className="flex-1">
        <Outlet />
      </section>

      {/* Footer sticks to the bottom */}
      <Footer className="mt-auto" />
    </div>
  );
}
