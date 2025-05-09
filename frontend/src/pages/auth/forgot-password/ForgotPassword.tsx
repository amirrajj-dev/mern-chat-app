import { motion } from "framer-motion";
import AuthLayout from "../../../layouts/AuthLAyout";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <AuthLayout 
      title="Reset Your Password" 
      subtitle="Enter your email to receive a reset link"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center lg:hidden mb-6"
      >
        <img 
          src="/logo.png" 
          alt="Chat App Logo" 
          className="size-20 mb-4"
        />
      </motion.div>
      
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="backdrop-blur-sm bg-white/5 p-8 rounded-2xl shadow-lg space-y-6 border border-white/10"
      >
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <input 
            type="email" 
            placeholder="Your registered email" 
            className="input bg-base-content/5 border-none outline-none text-base-content placeholder-base-content/60 w-full focus:border-none focus:outline-none focus:ring-1 focus:ring-base-content/30 focus:border-base-content/20" 
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="pt-2"
        >
          <motion.button
            whileHover={{ 
              scale: 1.02,
              backgroundColor: "rgba(99, 102, 241, 0.9)"
            }}
            whileTap={{ scale: 0.98 }}
            className="btn bg-indigo-600 hover:bg-indigo-700 border-none text-white w-full mt-2"
            type="submit"
          >
            Send Reset Link
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="divider text-white/50 before:bg-white/10 after:bg-white/10 text-sm"
        >
          Remember your password?
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link to="/auth/signin" className="btn btn-outline border-white/20 hover:bg-white/5 hover:border-white/30 text-white w-full">
            Sign In Instead
          </Link>
        </motion.div>
      </motion.form>
    </AuthLayout>
  );
};

export default ForgotPassword;