import { motion } from "framer-motion";

const MessageHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-base-200/70 flex items-center backdrop-blur-md p-4 border-b border-base-content/50 rounded-t-lg"
    >
      <img
        src="https://avatar.iran.liara.run/public/boy?username=ali"
        alt="user image"
        className="size-10 rounded-full"
      />
      <span className="ml-3 font-bold">Ali</span>
    </motion.div>
  );
};

export default MessageHeader;