import { motion } from "framer-motion";
import { useConversationStore } from "../../../../store/useConveration";
import { useSocketContext } from "../../../../contexts/SocketContext";

const MessageHeader = () => {
  const {selectedUser} = useConversationStore()
  const {onlineUsers} = useSocketContext()
  console.log(onlineUsers);
  const isOnline = onlineUsers.includes(selectedUser?._id as string)
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
      <div className="flex flex-col ml-3">
      <span className="font-bold">{selectedUser?.name}</span>
      <span className="font-extralight font-mono text-sm text-primary">
        {isOnline ? 'online' : 'last seen recently'}
      </span>
      </div>
    </motion.div>
  );
};

export default MessageHeader;