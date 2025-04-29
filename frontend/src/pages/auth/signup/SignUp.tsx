import { motion } from "framer-motion";
import AuthLayout from "../../../layouts/AuthLAyout";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <AuthLayout 
      title="Create Your Account" 
      subtitle="Join us today - it takes less than a minute"
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
          className="size-20 mb-4"
        />
      </motion.div>
      
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="backdrop-blur-sm bg-white/5 p-8 rounded-2xl shadow-lg space-y-4 border border-white/10"
      >
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <input 
              type="text" 
              placeholder="Full Name" 
              className="input bg-base-content/5 border-none outline-none text-base-content placeholder-base-content/60 w-full focus:border-none focus:outline-none focus:ring-1 focus:ring-base-content/30 focus:border-base-content/20" 
            />
          </motion.div>
          <motion.div
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <input 
              type="text" 
              placeholder="Username" 
              className="input bg-base-content/5 border-none outline-none text-base-content placeholder-base-content/60 w-full focus:border-none focus:outline-none focus:ring-1 focus:ring-base-content/30 focus:border-base-content/20" 
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <input 
            type="email" 
            placeholder="Email" 
            className="input bg-base-content/5 border-none outline-none text-base-content placeholder-base-content/60 w-full focus:border-none focus:outline-none focus:ring-1 focus:ring-base-content/30 focus:border-base-content/20" 
          />
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <input 
            type="password" 
            placeholder="Password" 
            className="input bg-base-content/5 border-none outline-none text-base-content placeholder-base-content/60 w-full focus:border-none focus:outline-none focus:ring-1 focus:ring-base-content/30 focus:border-base-content/20" 
          />
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <input 
              type="tel" 
              placeholder="Phone" 
              className="input bg-base-content/5 border-none outline-none text-base-content placeholder-base-content/60 w-full focus:border-none focus:outline-none focus:ring-1 focus:ring-base-content/30 focus:border-base-content/20" 
            />
          </motion.div>
          <motion.div
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <select className="bg-base-content/5 select border-none outline-none focus:border-none focus:outline-none border-base-content/10 text-base-content placeholder-base-content/60 w-full focus:ring-1 focus:ring-base-content/30 focus:border-base-content/20">
              <option disabled selected className="bg-base-300/80 blur-lg text-base-content">Gender</option>
              <option className="bg-base-300/80 blur-lg text-base-content">Male</option>
              <option className="bg-base-300/80 blur-lg text-base-content">Female</option>
            </select>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
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
            Sign Up
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="divider text-white/50 before:bg-white/10 after:bg-white/10 text-sm"
        >
          Already have an account?
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <Link to="/auth/signin" className="btn btn-outline border-white/20 hover:bg-white/5 hover:border-white/30 text-white w-full">
            Login Instead
          </Link>
        </motion.div>
      </motion.form>
    </AuthLayout>
  );
};

export default SignUp;