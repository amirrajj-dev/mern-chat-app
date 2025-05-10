import { useState, useEffect } from "react";
import { useSocketContext } from "../../../../contexts/SocketContext";
import { useConversationStore } from "../../../../store/useConveration";
import { motion } from "framer-motion";

const MessageHeader = () => {
  const { selectedUser } = useConversationStore();
  const { socket, onlineUsers } = useSocketContext();
  const [typing, setTyping] = useState(false);
  const isOnline = onlineUsers.includes(selectedUser?._id as string);

  useEffect(() => {
    if (socket && selectedUser?._id) {
      const handleTyping = ({ userId }: { userId: string }) => {
        if (userId === selectedUser?._id) {
          setTyping(true);
          const typingTimeout = setTimeout(() => {
            setTyping(false);
          }, 3000);
          return () => {
            clearTimeout(typingTimeout);
          };
        }
      };

      socket.on("typing", handleTyping);

      return () => {
        socket.off("typing", handleTyping);
      };
    }
  }, [socket, selectedUser]);

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
          {typing ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Typing
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{
                  scale: [0.5, 1, 0.5],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  ease: "easeInOut",
                }}
              >
                .
              </motion.span>
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{
                  scale: [0.5, 1, 0.5],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  ease: "easeInOut",
                }}
              >
                .
              </motion.span>
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{
                  scale: [0.5, 1, 0.5],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1,
                  delay: 0.4,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  ease: "easeInOut",
                }}
              >
                .
              </motion.span>
            </motion.span>
          ) : isOnline ? (
            "online"
          ) : (
            "last seen recently"
          )}
        </span>
      </div>
    </motion.div>
  );
};

export default MessageHeader;