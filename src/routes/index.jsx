import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoutes";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<LoginPage />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
