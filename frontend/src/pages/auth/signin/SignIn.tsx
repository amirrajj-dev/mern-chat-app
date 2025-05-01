import { motion } from "framer-motion";
import AuthLayout from "../../../layouts/AuthLAyout";
import { Link } from "react-router-dom";
import { useState } from "react";

const SignIn = () => {
  const [authMethod, setAuthMethod] = useState<"phone" | "email">("phone");

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to continue your conversations"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center lg:hidden mb-6"
      >
        <img 
          src="https://img.icons8.com/?size=512w&id=yg_1BRRCDTMO&format=png" 
          alt="Chat App Logo" 
          className="size-20 mb-4 drop-shadow-lg"
        />
      </motion.div>
      
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="backdrop-blur-md bg-white/5 p-8 rounded-2xl shadow-xl space-y-5 border border-white/10 hover:border-white/20 transition-all duration-300"
      >
        {/* Auth Method Toggle */}
        <motion.div className="flex rounded-full bg-base-300/20 p-1">
          <motion.button
            type="button"
            onClick={() => setAuthMethod("phone")}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 ${
              authMethod === "phone" 
                ? "bg-indigo-600 text-white shadow-md" 
                : "text-white/70 hover:text-white"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            Phone
          </motion.button>
          <motion.button
            type="button"
            onClick={() => setAuthMethod("email")}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 ${
              authMethod === "email" 
                ? "bg-indigo-600 text-white shadow-md" 
                : "text-white/70 hover:text-white"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            Email
          </motion.button>
        </motion.div>

        {/* Form Fields */}
        <motion.div layout className="space-y-4">
          {authMethod === "email" ? (
            <>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="input bg-white/5 border-white/10 text-white placeholder-white/50 w-full focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/30 transition-all" 
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="input bg-white/5 border-white/10 text-white placeholder-white/50 w-full focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/30 transition-all" 
                />
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <input 
                type="tel" 
                placeholder="Phone Number" 
                className="input bg-white/5 border-white/10 text-white placeholder-white/50 w-full focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/30 transition-all" 
              />
            </motion.div>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.div layout className="pt-1">
          <motion.button
            whileHover={{ 
              scale: 1.02,
              backgroundColor: "rgba(99, 102, 241, 0.9)",
              boxShadow: "0 4px 14px rgba(99, 102, 241, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            className="btn bg-indigo-600 hover:bg-indigo-700 border-none text-white w-full mt-2 shadow-md"
            type="submit"
          >
            {authMethod === "email" ? "Sign In" : "Send Verification Code"}
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="divider text-white/60 before:bg-white/10 after:bg-white/10 text-sm my-4"
        >
          Don't have an account?
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/auth/signup" className="btn btn-outline border-white/20 hover:bg-white/5 hover:border-white/30 text-white w-full">
            Create Account
          </Link>
        </motion.div>

        {authMethod === "email" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <Link 
              to="/auth/forgot-password" 
              className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Forgot password?
            </Link>
          </motion.div>
        )}
      </motion.form>
    </AuthLayout>
  );
};

export default SignIn;