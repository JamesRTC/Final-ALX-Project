import { motion } from "framer-motion";
import { HiOutlineMenu, HiX } from "react-icons/hi";

export default function MenuToggle({ isOpen, toggleMenu }) {
  return (
    <motion.button className="p-2" onClick={toggleMenu} whileTap={{ scale: 0.9 }}>
      {isOpen ? <HiX size={30} /> : <HiOutlineMenu size={30} />}
    </motion.button>
  );
}
