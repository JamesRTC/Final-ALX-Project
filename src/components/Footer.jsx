import { Link, useNavigate } from "react-router-dom";
import { getCurrentYear } from "../Utils/getMovieYear";
import { auth } from "../Firebase/firebaseConfig";
import { signOut } from "firebase/auth";

export default function Footer() {
  const navigate = useNavigate();

  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <footer className="bg-gray-900 text-white text-center py-4 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center px-4">
        <p className="text-lg md:mr-4">WatchIT &copy; {getCurrentYear()}</p>

        <div className="flex flex-wrap items-center gap-4 mt-2 md:mt-0">
          <Link to="/movies" className="hover:underline">
            Browse Movies
          </Link>
          <span>|</span>
          <Link to="/series" className="hover:underline">
            Browse Series
          </Link>
          <span>|</span>

          {user ? (
            <button className=" text-blue-600 cursor-pointer hover:underline" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
