import { IoIosSearch } from "react-icons/io";

export default function SearchToggle({ toggleSearch }) {
  return (
    <button onClick={toggleSearch} className="relative p-2">
      <IoIosSearch size={30} />
    </button>
  );
}
