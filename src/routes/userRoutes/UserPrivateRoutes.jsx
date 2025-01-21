import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
const UserPrivateRoutes = () => {
  // Access authentication state from Redux or Context
  // const isAuthenticated = useSelector((state) => state.auth.user !== null);

  // // If the user is not authenticated, redirect to the login page
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }

  // Otherwise, render the protected routes
  return <Outlet />;
};

export default UserPrivateRoutes;
