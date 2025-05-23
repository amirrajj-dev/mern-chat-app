import { motion } from "framer-motion";
import Conversation from "./Conversation";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../configs/axios";
import { UserI } from "../../../../interfaces/interfaces";
import ConversationSkeleton from "../../skeletons/ConversationSkeleton";
import { useSidebarUsers } from "../../../../store/useSidebarUsers";
import { useConversationStore } from "../../../../store/useConveration";
import { useSidebar } from "../../../../store/useSidebar";
const Conversations = () => {
  const { filteredUsers, setAllUsers, query } = useSidebarUsers();
  const { setSelectedUser } = useConversationStore();
  const filtered = filteredUsers();
  const isSeachActive = filtered.length > 0 && query.length > 0;
  const { setIsSidebarOpen } = useSidebar();
  const { data: conversations, isPending } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/users");
      setAllUsers(response.data.users);
      return response.data.users as UserI[];
    },
    staleTime: 1000 * 60 * 10,
  });
  const conversationsToShow = isSeachActive ? filtered : conversations;

  const handleSelectUser = (user: UserI) => {
    setSelectedUser(user);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col gap-1">
      {!isPending
        ? conversationsToShow?.map((conversation) => (
            <Conversation
              key={conversation._id}
              user={conversation}
              handleSelectUser={handleSelectUser}
            />
          ))
        : Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <ConversationSkeleton key={index + 1} />
            </motion.div>
          ))}
    </div>
  );
};

export default Conversations;
