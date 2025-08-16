import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AppContext";

const PrivateRoute = ({ element }) => {
  const { user } = useAuth(); // Get user from context
  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
