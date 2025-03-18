import { Route, Routes } from "react-router-dom";
import Home from "../../pages/user/Home";
import Login from "../../pages/user/Login";
import Profile from "../../pages/user/Profile";
import UserPrivateRoutes from "./UserPrivateRoutes";
import Register from "../../pages/user/Register";
import AboutPage from "../../pages/user/AboutUs";
import Otp from "../../pages/user/Otp";
import Fitness from "../../pages/user/Fitness";
import LandingPage from "../../pages/user/LandingPage";
import Products from "../../pages/user/Products";
import Competitions from "../../pages/user/Competitions";
import ProductDetails from "../../pages/user/ProductDetails";
import CartPage from "../../pages/user/Cart";
import Trekkings from "../../pages/user/Trekkings";
import Carts from "../../pages/user/Carts";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/fitness" element={<Fitness />} />

      {/* Private Routes */}
      <Route element={<UserPrivateRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Landing" element={<LandingPage />} />
        <Route path="/fitness" element={<Fitness />} />
        <Route path="/shop" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/competitions" element={<Competitions />} />
        <Route path="/trekking" element={<Trekkings />} />
        <Route path="/cart" element={<Carts />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
