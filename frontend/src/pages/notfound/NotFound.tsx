import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MoveLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full bg-base-content/10  backdrop-blur-md rounded-3xl border border-base-content/20 shadow-2xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <img
            src="/logo.png"
            alt="Chat App Logo"
            className="size-30 drop-shadow-lg"
          />
        </motion.div>

        <motion.h1
          animate={{ y: [0, -10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          }}
          className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4"
        >
          404
        </motion.h1>

        <h2 className="text-base-content text-2xl font-semibold mb-2">
          Page Not Found
        </h2>
        <p className="text-base-content/80 mb-6">
          The page you're looking for doesn’t exist or has been moved.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/"
            className="btn bg-gradient-to-r from-primary to-accent text-base-content gap-2 hover:gap-3 transition-all"
          >
            <MoveLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;