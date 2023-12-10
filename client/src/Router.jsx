import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { RecipeProvider } from "./context/RecipeContext";
import ProtectedRoutes from "./ProtectedRoutes";

// pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MenuPage from "./pages/MenuPage";
import RecipePage from "./pages/RecipePage";
import FormRecipePage from "./pages/FormRecipePage";
import PorfilePage from "./pages/PorfilePage";
import ErrorPage from "./pages/ErrorPage";

// components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Router() {
  return (
    <AuthProvider>
      <RecipeProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search/:search" element={<HomePage />} />
            <Route path="/recipe/:id" element={<RecipePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/searcher/:searcher" element={<MenuPage />} />
              <Route path="/add-recipe" element={<FormRecipePage />} />
              <Route path="/update-recipe/:id" element={<FormRecipePage />} />
              <Route path="/porfile" element={<PorfilePage />} />
            </Route>

            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </RecipeProvider>
    </AuthProvider>
  );
}
