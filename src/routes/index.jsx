import { Route, Routes } from "react-router-dom";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" />
      <Route path="login" />
      <Route path="register" />
    </Routes>
  );
};

export default MainRoutes;
