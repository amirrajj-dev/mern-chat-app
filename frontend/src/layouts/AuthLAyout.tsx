import { motion } from "framer-motion";
import { FC } from "react";

const AuthLayout : FC<{children: React.ReactNode, title?: string, subtitle?: string}> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen grid grid-cols-1 bg-gradient-to-br from-base-300 to-indigo-950 lg:grid-cols-2">
      {/* Left side - Form */}
      <div className="flex items-center justify-center p-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {children}
        </motion.div>
      </div>

      {/* Right side - Auth Background */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-base-300 to-indigo-950 p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <img 
            src="/logo.png" 
            alt="Chat App Logo" 
            className="w-32 h-32 mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold text-white mb-4">{title || "Welcome Back"}</h1>
          <p className="text-white/80 mb-6">
            {subtitle || "Join our community and start chatting with friends and colleagues in real-time."}
          </p>
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              transition: { 
                repeat: Infinity, 
                duration: 3,
                ease: "easeInOut" 
              }
            }}
          >
            <div className="text-5xl">👋</div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;