import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import ProtectedRoutes from "./ProtectedRoutes";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MenuPage from "./pages/MenuPage";
import RecipePage from "./pages/RecipePage";
import AddRecipePage from "./pages/AddRecipePage";
import PorfilePage from "./pages/PorfilePage";
import UpdateRecipePage from "./pages/UpdateRecipePage";

export default function Router() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/add-recipe" element={<AddRecipePage />} />
            <Route path="/update-recipe/:id" element={<UpdateRecipePage />} />
            <Route path="/porfile" element={<PorfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
