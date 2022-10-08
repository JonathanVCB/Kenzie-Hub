import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";

const MainRoutes = ({ user, setUser }) => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage setUser={setUser} />} />
      <Route path="/login" element={<LoginPage setUser={setUser} />} />
      <Route path="/home" element={<HomePage user={user} />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default MainRoutes;
