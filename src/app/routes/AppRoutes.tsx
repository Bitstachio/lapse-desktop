import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.tsx";
import SessionPage from "../../pages/Session/SessionPage.tsx";
import LoginPage from "../../pages/Login/LoginPage.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <SessionPage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRoutes;
