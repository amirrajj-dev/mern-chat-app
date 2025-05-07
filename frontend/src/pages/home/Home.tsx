import { motion } from "framer-motion";
import { useState } from "react";
import MessageContainer from "../../components/ui/messages/MessageContainer";
import Sidebar from "../../components/ui/sidebar/Sidebar";
import { Menu } from "lucide-react";
import Prefrences from "../../components/ui/prefrences/Prefrences";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen chat-bg p-2 sm:p-4 flex flex-col gap-1 items-center justify-center">
      <Prefrences/>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="flex flex-col md:flex-row w-full max-w-6xl h-[90vh] max-h-[90vh] rounded-xl overflow-hidden shadow-2xl bg-base-100/10 backdrop-blur-md relative"
      >
        {/* Mobile Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute top-4 right-4 z-50 md:hidden btn btn-circle bg-base-300/40 border-none text-base-content"
        >
          <Menu />
        </button>

        {/* Sidebar */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{
            x: sidebarOpen || window.innerWidth >= 768 ? 0 : -200,
            opacity: sidebarOpen || window.innerWidth >= 768 ? 1 : 0,
          }}
          transition={{ delay : .011 , duration: 0.4}}
          className={`fixed md:static top-0 left-0 h-full w-64 bg-base-200/80 backdrop-blur-md z-40 shadow-xl transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } md:flex`}
        >
          <Sidebar />
        </motion.div>

        {/* Chat Area */}
        <motion.div
          layout
          className="flex-1 flex flex-col bg-base-100/50 backdrop-blur-sm overflow-hidden"
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