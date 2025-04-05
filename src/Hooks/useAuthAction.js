import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export function useAuthAction() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleActionBeforeLogin = (action, currentPath) => {
    if (!user) {
      localStorage.setItem("postLoginAction", JSON.stringify(action));
      localStorage.setItem("redirectPath", currentPath);
      navigate("/login");
    } else {
      action();
    }
  };

  const handlePostLoginAction = () => {
    const storedAction = localStorage.getItem("postLoginAction");
    const redirectPath = localStorage.getItem("redirectPath");

    if (storedAction) {
      const action = JSON.parse(storedAction);
      action();
      localStorage.removeItem("postLoginAction");
    }

    if (redirectPath) {
      navigate(redirectPath);
      localStorage.removeItem("redirectPath");
    }
  };

  return { user, handleActionBeforeLogin, handlePostLoginAction };
}
