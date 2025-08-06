import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.tsx";
import DashboardPage from "../pages/Session/SessionPage.tsx";
import LoginPage from "../pages/Login/LoginPage.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRoutes;
