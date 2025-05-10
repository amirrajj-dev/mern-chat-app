import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import SignUp from "./pages/auth/signup/SignUp";
import SignIn from "./pages/auth/signin/SignIn";
import ForgotPassword from "./pages/auth/forgot-password/ForgotPassword";
import ResetPassword from "./pages/auth/reset-password/ResetPassword";
import Home from "./pages/home/Home";
import VerifyCode from "./pages/auth/verify-code/VerifyCode";
import { useTheme } from "./store/useTheme";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { useMeQuery } from "./hooks/useMeQuery";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";
import NotFound from "./pages/notfound/NotFound";

const App = () => {
  const { initializeTheme } = useTheme();
  const location = useLocation();
  const { data: currentUser, isLoading } = useMeQuery();

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-primary to-accent items-center justify-center flex-col gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Loader className="animate-spin size-14 text-primary" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-sm"
        >
          Loading your experience...
        </motion.p>
      </div>
    );
  }

  const isAuthenticated = !!currentUser;

  return (
    <div className="transition-colors duration-200">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Home />
            ) : (
              location.pathname !== "/auth/signin" && (
                <Navigate to="/auth/signin" replace />
              )
            )
          }
        />
        <Route
          path="/auth/signup"
          element={!isAuthenticated ? <SignUp /> : <Navigate to="/" replace />}
        />
        <Route
          path="/auth/signin"
          element={!isAuthenticated ? <SignIn /> : <Navigate to="/" replace />}
        />
        <Route
          path="/auth/verify-code"
          element={!isAuthenticated ? <VerifyCode /> : <Navigate to="/" replace />}
        />
        <Route
          path="/auth/forgot-password"
          element={!isAuthenticated ? <ForgotPassword /> : <Navigate to="/" replace />}
        />
        <Route
          path="/auth/reset-password/:token"
          element={!isAuthenticated ? <ResetPassword /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;