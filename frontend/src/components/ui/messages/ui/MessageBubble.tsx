import { FC } from "react";
import { motion } from "framer-motion";

interface MessageBubbleProps {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
}

const MessageBubble: FC<MessageBubbleProps> = ({ sender, text, timestamp }) => {
  const isCurrentUser = sender === "currentUser";

  return (
    <motion.div
      initial={{ opacity: 0, x: isCurrentUser ? -30 : 30, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="px-2 sm:px-4"
    >
      <div className={`chat ${isCurrentUser ? "chat-start" : "chat-end"}`}>
        <div className="chat-image avatar">
          <div className="w-8 sm:w-10 rounded-full">
            <img
              alt="User avatar"
              src="https://avatar.iran.liara.run/public/boy?username=ali"
              className="object-cover"
            />
          </div>
        </div>

        <div
          className={`chat-bubble max-w-[85%] sm:max-w-md text-sm sm:text-base p-3 sm:p-4 rounded-lg ${
            isCurrentUser
              ? "bg-base-300 text-base-content"
              : "bg-primary text-primary-content"
          }`}
        >
          <p className="break-words leading-snug">{text}</p>
          <span className="text-xs text-base-content/60 mt-1 block text-left">
            {timestamp} pm
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;