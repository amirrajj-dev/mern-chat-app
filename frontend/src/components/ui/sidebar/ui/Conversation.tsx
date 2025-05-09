import { motion } from "framer-motion";
import React, { useState } from 'react';
import { UserI } from "../../../../interfaces/interfaces";
import { useConversationStore } from "../../../../store/useConveration";

interface ConversationProps {
  user : UserI;
  handleSelectUser : (user : UserI) => void;
}

const Conversation : React.FC<ConversationProps> = ({user , handleSelectUser}) => {
  const [isOnline, setIsOnline] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const {selectedUser} = useConversationStore()
  const isSelected = user._id === selectedUser?._id;
  return (
    <motion.div 
      onClick={() => handleSelectUser(user)}
      className={`p-3 transition-all cursor-pointer border-b border-base-content/10 ${isHovered ? 'bg-base-content/5' : 'hover:bg-base-content/5'} ${isSelected ? 'bg-base-content/10' : ''}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='relative'>
            <motion.div 
              className="size-10 rounded-full bg-gradient-to-br from-primary to-secondary"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src={user.avatar} 
                className='size-full rounded-full object-cover' 
                alt="avatar" 
              />
            </motion.div>
            {isOnline && (
              <motion.span 
                className='size-2.5 rounded-full absolute bottom-0 right-0 bg-emerald-500 ring-1 ring-white'
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </div>
          <div>
            <p className="font-medium">{user.username}</p>
            <p className="text-xs text-base-content/60">Last message...</p>
          </div>
        </div>
        <motion.div 
          className="text-xs text-base-content/40"
          animate={{ scale: isHovered ? 1.2 : 1 }}
        >
          {isHovered ? '💬' : '12m'}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Conversation;