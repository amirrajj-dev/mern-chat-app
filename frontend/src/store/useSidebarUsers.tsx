// store/useSidebarUsers.ts
import { create } from 'zustand';
import { UserI } from '../interfaces/interfaces';

interface SidebarState {
  allUsers: UserI[];
  query: string;
  setQuery: (q: string) => void;
  setAllUsers: (users: UserI[]) => void;
  filteredUsers: () => UserI[];
}

export const useSidebarUsers = create<SidebarState>((set, get) => ({
  allUsers: [],
  query: '',
  setQuery: (q) => set({ query: q }),
  setAllUsers: (users) => set({ allUsers: users }),
  filteredUsers: () => {
    const { query, allUsers } = get();
    return query
      ? allUsers.filter((user) =>
          user.username.toLowerCase().includes(query.toLowerCase())
        )
      : allUsers;
  },
}));