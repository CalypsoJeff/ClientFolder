import './App.css'
import { Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/userRoutes/UserRoutes";
import AdminRoutes from "./routes/adminRoutes/AdminRoutes";

function App() {

  return (
    <>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path='/admin/*' element={<AdminRoutes />} />
      </Routes>
    </>
  )
}

export default App
