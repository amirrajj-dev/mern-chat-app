import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { axiosInstance } from "../../../../configs/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useConversationStore } from "../../../../store/useConveration";
import { useSocketContext } from "../../../../contexts/SocketContext";

const LogOutBtn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {disconnectSocket} = useSocketContext()
  const {setSelectedUser} = useConversationStore()
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      await axiosInstance.get("/api/auth/signout");
    },
    onSuccess: () => {
      disconnectSocket();
      toast.success("Logged out successfully");
      queryClient.removeQueries({ queryKey: ["me"] });
      setSelectedUser(null)
      navigate("/");
      
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });

  return (
    <div className="tooltip" data-tip="Log Out">
      <motion.button
        onClick={() => {
          const isSure = confirm("Are you sure you want to log out?");
          if (isSure) logout();
        }}
        className="btn btn-circle"
        whileTap={{ scale: 0.9 }}
      >
        <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
      </motion.button>
    </div>
  );
};

export default LogOutBtn;