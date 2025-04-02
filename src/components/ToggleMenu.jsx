import { motion } from "framer-motion";
import { HiOutlineMenu, HiX } from "react-icons/hi";

export default function MenuToggle({ isOpen, toggleMenu }) {
  return (
    <motion.button className="p-2" onClick={toggleMenu} whileTap={{ scale: 0.9 }}>
      {isOpen ? <HiX size={28} /> : <HiOutlineMenu size={28} />}
    </motion.button>
  );
}

// SearchToggle.jsx - Handles search bar toggle and animation
import { IoIosSearch } from "react-icons/io";

export function SearchToggle({ isSearchOpen, toggleSearch }) {
  return (
    <button onClick={toggleSearch} className="relative p-2">
      <IoIosSearch size={24} />
    </button>
  );
}
