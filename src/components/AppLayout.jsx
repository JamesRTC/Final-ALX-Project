import { Outlet } from "react-router-dom";
import { useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import MobileNavBar from "./MobileNavBar";

export default function AppLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-black flex flex-col min-h-screen">
      <NavBar />
      <MobileNavBar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />

      {!isMobileMenuOpen && (
        <>
          <section className="flex-1">
            <Outlet />
          </section>
          <Footer className="mt-auto" />
        </>
      )}
    </div>
  );
}
