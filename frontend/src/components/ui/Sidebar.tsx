import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Conversations from "./Conversations";
const Sidebar = () => {
  return (
    <div className="p-4">
      {/* search input  */}
      <div className="flex items-center justify-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="input rounded-full bg-base-content/5 border-none outline-none text-base-content placeholder-base-content/60 w-full focus:border-none focus:outline-none focus:ring-1 focus:ring-base-content/30 focus:border-base-content/20"
        />
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileTap={{
            scale: 0.9,
            transition: { duration: 0.2 },
          }}
          className="btn btn-circle btn-soft hover:btn-primary ml-2"
        >
          <Search size={20} />
        </motion.button>
      </div>
      {/* conversations  */}
      <Conversations />
    </div>
  );
};

export default Sidebar;
