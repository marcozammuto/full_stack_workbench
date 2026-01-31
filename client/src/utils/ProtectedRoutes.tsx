import { Outlet, Navigate } from "react-router";
import { useUser } from "../context/UserContext";

const ProtectedRoutes = () => {
  const { user } = useUser();
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
