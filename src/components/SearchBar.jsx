import React from "react";
import { IoIosSearch } from "react-icons/io";

export default function SearchBar({ query, handleSearchChange }) {
  return (
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
  );
}
