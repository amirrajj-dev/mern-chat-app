import { Route, Routes } from "react-router-dom";
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
import { Navigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";
const App = () => {
  const { initializeTheme } = useTheme();
  const { data: currentUser, isLoading } = useMeQuery();
  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);
  console.log(isLoading);
  if (isLoading) {
    return (
      <div className="flex h-screen chat-bg items-center justify-center flex-col gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Loader className="animate-spin size-12 text-primary" />
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

  return (
    <div className="transition-colors duration-200">
      <Routes>
        <Route
          path="/"
          element={currentUser ? <Home /> : <Navigate to="/auth/signin" />}
        ></Route>
        <Route
          path="/auth/signup"
          element={currentUser ? <Navigate to="/" /> : <SignUp />}
        ></Route>
        <Route
          path="/auth/signin"
          element={currentUser ? <Navigate to="/" /> : <SignIn />}
        ></Route>
        <Route
          path="/auth/verify-code"
          element={currentUser ? <Navigate to="/" /> : <VerifyCode />}
        ></Route>
        <Route
          path="/auth/forgot-password"
          element={currentUser ? <Navigate to="/" /> : <ForgotPassword />}
        ></Route>
        <Route
          path="/auth/reset-password/:token"
          element={currentUser ? <Navigate to="/" /> : <ResetPassword />}
        ></Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
