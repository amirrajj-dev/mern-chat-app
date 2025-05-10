import { motion } from "framer-motion";
import MessageContainer from "../../components/ui/messages/MessageContainer";
import Sidebar from "../../components/ui/sidebar/Sidebar";
import { Menu } from "lucide-react";
import Prefrences from "../../components/ui/prefrences/Prefrences";
import { useSidebar } from "../../store/useSidebar";
import AnimatedBackground from "../../components/ui/background/AnimateBackground";
import {useEffect} from 'react'

const Home = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  useEffect(()=>{
    document.title = 'Mern Chat Application ⚡'
  } , [])
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary to-accent p-2 sm:p-4 flex flex-col gap-1 items-center justify-center overflow-hidden">
      <AnimatedBackground />

      {/* Preferences */}
      <Prefrences />

      {/* Chat Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative z-20 flex flex-col md:flex-row w-full max-w-6xl h-[90vh] max-h-[90vh] rounded-xl overflow-hidden shadow-2xl bg-base-100/10 backdrop-blur-lg border border-white/10"
      >
        {/* Mobile Toggle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-4 right-4 z-50 md:hidden btn btn-circle bg-base-300/40 border-none text-base-content"
        >
          <Menu />
        </button>

        {/* Sidebar */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{
            x: isSidebarOpen || window.innerWidth >= 768 ? 0 : -200,
            opacity: isSidebarOpen || window.innerWidth >= 768 ? 1 : 0,
          }}
          transition={{ delay: 0.011, duration: 0.4 }}
          className={`fixed md:static top-0 left-0 h-full w-64 bg-base-200/70 backdrop-blur-md z-40 shadow-xl transition-transform duration-300 ease-in-out ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
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
