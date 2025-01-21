import { Route, Routes } from "react-router-dom";
import Home from "../../pages/user/Home";
import Login from "../../pages/user/Login";
import Profile from "../../pages/user/Profile";
// import UserPrivateRoutes from "./UserPrivateRoutes";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* Private Routes */}
      {/* <Route element={<UserPrivateRoutes />}> */}
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      {/* </Route> */}
    </Routes>
  );
};

export default UserRoutes;
