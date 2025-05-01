import { motion } from "framer-motion";
import MessageContainer from "../../components/ui/MessageContainer";
import Sidebar from "../../components/ui/Sidebar";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-300 to-indigo-950 p-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="flex w-full max-w-6xl h-[90vh] max-h-[800px] rounded-xl overflow-hidden shadow-2xl"
      >
        {/* Sidebar */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="hidden md:flex w-72 border-r border-base-content/10 bg-base-200/70 backdrop-blur-md"
        >
          <Sidebar />
        </motion.div>

        {/* Chat Area */}
        <motion.div
          layout
          className="flex-1 flex flex-col bg-base-100/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex-1 overflow-hidden"
          >
            <MessageContainer />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;