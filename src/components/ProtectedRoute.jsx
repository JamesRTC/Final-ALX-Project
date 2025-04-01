import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/firebaseConfig";

export default function ProtectedRoute() {
  const [user] = useAuthState(auth);
  const location = useLocation();

  return user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}
