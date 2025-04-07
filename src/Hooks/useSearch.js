import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function useSearch() {
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(window.innerWidth <= 1250);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

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

  useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth <= 1250);
      if (window.innerWidth > 1250) setIsSearchOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    query,
    handleSearchChange,
    toggleSearch,
    isSearchOpen,
    setIsSearchOpen,
    isCompact,
    setIsCompact,
  };
}
