import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import FamPage from "./pages/FamPage";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Redirect to login if not authenticated
  // Redirect to login if not authenticated
  useEffect(() => {
    if (
      !authUser &&
      !isCheckingAuth &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup" &&
      location.pathname !== "/settings"
    ) {
      window.location.href = "/login";
    }
  }, [authUser, isCheckingAuth, location.pathname]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Homepage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/settings"
          element={<SettingsPage />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/contact"
          element={authUser ? <Contact /> : <Navigate to="/login" />}
        />
        <Route
          path="/fam"
          element={authUser ? <FamPage/> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
      <Footer />
    </div>
  );
};

export default App;
