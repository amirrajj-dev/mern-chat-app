import { create } from "zustand";
import { MessageI, UserI } from "../interfaces/interfaces";

interface ConverasationStore {
    selectedUser : UserI | null;
    messages : MessageI[];
    setMessages : (message : MessageI)=>void 
    setSelectedUser : (user: UserI | null) =>void;
    addMessage : (message: MessageI) => void
}

export const useConversationStore = create<ConverasationStore>((set) => ({
    selectedUser : null,
    messages : [],
    setSelectedUser : (user) => set({selectedUser : user}),
    addMessage(message) {
        
    },
    setMessages(message) {
        
    },
}));