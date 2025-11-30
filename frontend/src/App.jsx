import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";

import HomePage from "./pages/HomePage";
import CreateRecipePage from "./pages/CreateRecipePage";
import SavedRecipesPage from "./pages/SavedRecipesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-700">
        Loading RecipeHub...
      </div>
    );

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

const AppContent = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <div className="min-h-screen flex flex-col text-gray-800">

        {/* NAVBAR */}
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
          <Link to="/" className="text-2xl font-bold text-orange-500">
            RecipeHub
          </Link>

          <div className="flex gap-6 text-lg">
            {user && (
              <>
                <Link to="/" className="hover:text-orange-500 transition">Home</Link>
                <Link to="/create" className="hover:text-orange-500 transition">Create</Link>
                <Link to="/saved" className="hover:text-orange-500 transition">Saved</Link>
              </>
            )}

            {!user && (
              <>
                <Link to="/login" className="hover:text-orange-500 transition">Login</Link>
                <Link to="/register" className="hover:text-orange-500 transition">Register</Link>
              </>
            )}
          </div>
        </nav>

        {/* MAIN */}
        <div className="flex-1 p-6 max-w-6xl mx-auto w-full">
          <Routes>

            {/* PUBLIC ROUTES */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* PROTECTED ROUTES */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreateRecipePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/saved"
              element={
                <ProtectedRoute>
                  <SavedRecipesPage />
                </ProtectedRoute>
              }
            />

          </Routes>
        </div>

        {/* FOOTER */}
        <footer className="bg-gray-100 text-center py-4 text-sm text-gray-500 mt-10">
          RecipeHub © {new Date().getFullYear()} • Built with ❤️ using MERN + Firebase
        </footer>
      </div>
    </Router>
  );
};

export default AppContent;
