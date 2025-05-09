import { motion } from "framer-motion";
import { useConversationStore } from "../../../../store/useConveration";

const MessageHeader = () => {
  const {selectedUser} = useConversationStore()
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-base-200/70 flex items-center backdrop-blur-md p-4 border-b border-base-content/50 rounded-t-lg"
    >
      <img
        src={selectedUser?.avatar}
        alt="user image"
        className="size-10 rounded-full"
      />
      <span className="ml-3 font-bold">{selectedUser?.name}</span>
    </motion.div>
  );
};

export default MessageHeader;