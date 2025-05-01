import { motion } from "framer-motion";
import Conversations from "./Conversations";
import LogOutBtn from "./LogOutBtn";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-4 flex flex-col h-full"
    >
      {/* Search Input */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-4"
      >
        <SearchInput />
  
      </motion.div>

      {/* Conversations List */}
      <motion.div 
        className="flex-1 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Conversations />
      </motion.div>

      {/* Logout Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="pt-4 border-t border-base-content/10"
      >
        <LogOutBtn />
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;