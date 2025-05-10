import MessageBubble from "./MessageBubble";
import MessageBubbleSkeleton from "../../skeletons/MessageBubbleSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useConversationStore } from "../../../../store/useConveration";
import { axiosInstance } from "../../../../configs/axios";
import { MessageI } from "../../../../interfaces/interfaces";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const Messages = () => {
  const { selectedUser } = useConversationStore();
  const bottomRef = useRef<HTMLDivElement>(null);
  const {
    data: messages,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["messages", selectedUser?._id],
    enabled: !!selectedUser,
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/messages/${selectedUser?._id}`);
      return res.data.data as MessageI[];
    },
  });

  const handleStartConversationClick = () => {
    const inputElement = document.getElementById(
      "messageInput"
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
    }
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!selectedUser) return null;

  if (isLoading) {
    return (
      <div className="p-6 flex flex-col gap-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        {[...Array(5)].map((_, i) => (
          <MessageBubbleSkeleton key={i} isCurrentUser={i % 2 === 0} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500 text-sm">Failed to load messages.</div>
    );
  }

  return (
    <div className="p-6 flex flex-col max-h-[calc(100vh-200px)] gap-4">
      {messages?.length ? (
        <>
          {messages.map(({ _id, senderId, receiverId, message, createdAt }) => (
            <MessageBubble
              key={_id}
              sender={
                senderId._id === selectedUser._id ? "chat" : "currentUser"
              }
              text={message}
              avatar={
                selectedUser._id === receiverId._id
                  ? senderId.avatar
                  : senderId.avatar
              }
              timestamp={new Date(createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            />
          ))}
          <div ref={bottomRef} />
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "anticipate" }}
          className="flex flex-col items-center justify-center mt-32 gap-6 text-center text-base-content/60"
        >
          <motion.img
            src="/logo.png"
            alt="App logo"
            className="size-28 opacity-90 drop-shadow-2xl"
            initial={{ scale: 0.9, rotate: -8 }}
            animate={{
              scale: [0.9, 1.05, 1],
              rotate: [0, 3, 0],
              y: [0, -10, 0],
              transition: {
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              },
            }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-2 max-w-sm"
          >
            <p className="text-lg sm:text-xl font-sans text-base-content/80">
              This space is waiting for a story...
            </p>
            <p className="text-sm sm:text-base font-light font-mono text-base-content/60">
              Say hello, send a thought, or drop a meme — it all starts with one
              message 💬
            </p>
          </motion.div>

          <motion.button
            onClick={handleStartConversationClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary btn-sm sm:btn-md rounded-full shadow-md mt-2"
          >
            Start the Conversation
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default Messages;
