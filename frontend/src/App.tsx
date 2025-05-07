import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/auth/signup/SignUp";
import SignIn from "./pages/auth/signin/SignIn";
import ForgotPassword from "./pages/auth/forgot-password/ForgotPassword";
import ResetPassword from "./pages/auth/reset-password/ResetPassword";
import Home from "./pages/home/Home";
import VerifyCode from "./pages/auth/verify-code/VerifyCode";
import { useTheme } from "./store/useTheme";
import { useEffect } from "react";
import {Toaster} from 'sonner'

const App = () => {
  const { initializeTheme } = useTheme();
  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);
  return (

      <div className="transition-colors duration-200">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/auth/signup" element={<SignUp />}></Route>
          <Route path="/auth/signin" element={<SignIn />}></Route>
          <Route path="/auth/verify-code" element={<VerifyCode />}></Route>
          <Route
            path="/auth/forgot-password"
            element={<ForgotPassword />}
          ></Route>
          <Route
            path="/auth/reset-password/:token"
            element={<ResetPassword />}
          ></Route>
        </Routes>
        <Toaster/>
      </div>
  );
};

export default App;
