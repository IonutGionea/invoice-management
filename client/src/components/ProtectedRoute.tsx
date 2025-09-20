import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../utils";

function ProtectedRoute() {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />; // renders nested route (dashboard, etc.)
}

export default ProtectedRoute;