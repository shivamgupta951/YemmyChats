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
import AboutPage from "./pages/AboutPage";
import StoreRoomPage from "./pages/StoreRoomPage";
import TodoList from "./pages/TodoList";
import ChatSection from "./pages/ChatSection";
import CommunitySection from "./pages/CommunitySection";
import BlogSection from "./pages/BlogSection";
import PostSection from "./pages/PostSection";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (
      !authUser &&
      !isCheckingAuth &&
      !["/login", "/signup", "/settings", "/about"].includes(location.pathname)
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
          path="/chat"
          element={authUser ? <ChatSection/> : <Navigate to="/login" />}
        />
        <Route
          path="/post"
          element={authUser ? <PostSection/> : <Navigate to="/login" />}
        />
        <Route
          path="/blog"
          element={authUser ? <BlogSection/> : <Navigate to="/login" />}
        />
        <Route
          path="/community"
          element={authUser ? <CommunitySection/> : <Navigate to="/login" />}
        />
        <Route
          path="/storeroom/:userId"
          element={authUser ? <StoreRoomPage/> : <Navigate to="/login" />}
        />
        <Route
          path="/todolist/:userId"
          element={authUser ? <TodoList/> : <Navigate to="/login" />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/about" element={<AboutPage />} />
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
          element={authUser ? <FamPage /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />

      {location.pathname !== "/chat"  && <Footer />}
    </div>
  );
};

export default App;
