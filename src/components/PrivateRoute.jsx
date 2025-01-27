import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Loader from "./Loader";

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
