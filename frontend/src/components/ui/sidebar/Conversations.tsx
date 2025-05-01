import { motion } from "framer-motion";
import Conversation from './Conversation';

const Conversations = () => {
  const conversations = Array(6).fill(null); // duumy for now for ui look test
  
  return (
    <div className="flex flex-col gap-1">
      {conversations.map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * index }}
        >
          <Conversation />
        </motion.div>
      ))}
    </div>
  )
}

export default Conversations;