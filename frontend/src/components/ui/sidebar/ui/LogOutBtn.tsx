import { motion } from "framer-motion";
import { LogOut } from "lucide-react";

const LogOutBtn = () => {
  return (
    <div className="tooltip" data-tip="Log Out">
      <motion.button
        className="btn btn-circle btn-soft bg-base-content/5 border-none outline-none text-base-content focus:border-none focus:outline-none focus:ring-1 focus:ring-base-content/30 focus:border-base-content/20"
        whileTap={{ scale: 0.9 }}
      >
        <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
      </motion.button>
    </div>
  );
};

export default LogOutBtn;