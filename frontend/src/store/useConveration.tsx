import { create } from "zustand";
import { UserI } from "../interfaces/interfaces";

interface ConverasationStore {
    selectedUser : UserI | null;
    setSelectedUser : (user: UserI | null) =>void;
}

export const useConversationStore = create<ConverasationStore>((set) => ({
    selectedUser : null,
    setSelectedUser : (user) => set({selectedUser : user})
}));