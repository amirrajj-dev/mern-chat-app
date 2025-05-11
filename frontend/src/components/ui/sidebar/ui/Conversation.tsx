import { motion } from "framer-motion";
import React, { useState } from 'react';
import { UserI } from "../../../../interfaces/interfaces";
import { useConversationStore } from "../../../../store/useConveration";
import { useSocketContext } from "../../../../contexts/SocketContext";

interface ConversationProps {
  user: UserI;
  handleSelectUser: (user: UserI) => void;
}

const Conversation: React.FC<ConversationProps> = ({ user, handleSelectUser }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { selectedUser } = useConversationStore();
  const isSelected = user._id === selectedUser?._id;

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <motion.div
      onClick={() => handleSelectUser(user)}
      className={`p-3 transition-all cursor-pointer border-b border-base-content/10 rounded-lg 
        ${isSelected ? 'bg-primary/10' : isHovered ? 'bg-base-content/5' : ''}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='relative'>
            <div className="size-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
              <img
                src={user.avatar}
                className='size-full object-cover'
                alt="avatar"
              />
            </div>
            {isOnline && (
              <motion.span
                className='size-2.5 rounded-full absolute bottom-0 right-0 bg-emerald-500 ring-2 ring-white'
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </div>
          <div>
            <p className="font-medium text-sm">{user.username}</p>
            <p className="text-xs text-base-content/50">
              {isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>

        <motion.div
          className="text-xs text-base-content/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          💬
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Conversation;