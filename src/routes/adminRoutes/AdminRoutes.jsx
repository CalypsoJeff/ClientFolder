import { Route, Routes } from "react-router-dom";
import Home from "../../pages/user/Home";
import Profile from "../../pages/user/Profile";
import AdminLogin from "../../pages/admin/Login";
import AdminRegister from "../../pages/admin/Register";
import VerifyOtpPage from "../../pages/admin/Otp-Verify";
import Dashboard from "../../pages/admin/Dashboard";
import Competitions from "../../pages/admin/Competitions";

// import UserPrivateRoutes from "./UserPrivateRoutes";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/register" element={<AdminRegister />} />
      <Route path="/otp" element={<VerifyOtpPage />} />

      {/* Private Routes */}
      {/* <Route element={<UserPrivateRoutes />}> */}
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/competitions" element={<Competitions />} />

      {/* </Route> */}
    </Routes>
  );
};

export default UserRoutes;
