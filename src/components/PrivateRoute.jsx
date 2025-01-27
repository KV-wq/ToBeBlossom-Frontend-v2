import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Loader from "./Loader";

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) {
    return <Loader />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
