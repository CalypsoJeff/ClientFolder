import { Route, Routes } from "react-router-dom";
import Home from "../../pages/user/Home";
import Login from "../../pages/user/Login";
import Profile from "../../pages/user/Profile";
import UserPrivateRoutes from "./UserPrivateRoutes";
import Register from "../../pages/user/Register";
import AboutPage from "../../pages/user/AboutUs";
import Otp from "../../pages/user/Otp";
import Trial from "../../pages/user/Trial";
import Fitness from "../../pages/user/Fitness";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/trial" element={<Trial />} />
      <Route path="/fitness" element={<Fitness />} />
      
      {/* Private Routes */}
      <Route element={<UserPrivateRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
