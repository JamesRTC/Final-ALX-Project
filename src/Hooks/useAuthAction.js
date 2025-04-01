import { useAuth } from "../Context/AuthContext"; // Assuming you have an AuthContext
import { useNavigate } from "react-router-dom";

export function useAuthAction() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Handle action before login
  const handleActionBeforeLogin = (action, currentPath) => {
    if (!user) {
      // Store the action and the current page in localStorage
      localStorage.setItem("postLoginAction", JSON.stringify(action));
      localStorage.setItem("redirectPath", currentPath); // Store the current page path
      navigate("/login"); // Redirect to login page
    } else {
      action(); // Perform the action if user is already logged in
    }
  };

  // Handle the stored action after login
  const handlePostLoginAction = () => {
    const storedAction = localStorage.getItem("postLoginAction");
    const redirectPath = localStorage.getItem("redirectPath");

    if (storedAction) {
      const action = JSON.parse(storedAction);
      action(); // Execute the stored action
      localStorage.removeItem("postLoginAction"); // Clear action after performing
    }

    if (redirectPath) {
      navigate(redirectPath); // Navigate back to the original page
      localStorage.removeItem("redirectPath"); // Clear the stored path after redirect
    }
  };

  return { user, handleActionBeforeLogin, handlePostLoginAction };
}
