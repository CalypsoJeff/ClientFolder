import { Route, Routes } from "react-router-dom";
import Home from "../../pages/user/Home";
import Profile from "../../pages/user/Profile";
import AdminLogin from "../../pages/admin/Login";
import AdminRegister from "../../pages/admin/Register";
import VerifyOtpPage from "../../pages/admin/Otp-Verify";
import Dashboard from "../../pages/admin/Dashboard";
import Competitions from "../../pages/admin/Competitions";
import Fitness from "../../pages/admin/Fitness";
import Trekking from "../../pages/admin/Trekking";
import Category from "../../pages/admin/Category";
import Product from "../../pages/admin/Product";
import UserList from "../../pages/admin/UserList";

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
      <Route path="/fitness" element={<Fitness />} />
      <Route path="/trekking" element={<Trekking />} />
      <Route path="/category" element={<Category />} />
      <Route path="/products" element={<Product />} />
      <Route path="/userlist" element={<UserList />} />
      {/* </Route> */}
    </Routes>
  );
};

export default UserRoutes;
