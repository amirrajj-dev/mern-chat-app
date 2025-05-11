import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { useMeQuery } from "../hooks/useMeQuery";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[];
  disconnectSocket: () => void; // add this
}

export const SocketContext = createContext<SocketContextType | null>(null);

interface Props {
  children: ReactNode;
}

const SocketContextProvider: React.FC<Props> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { data: currentUser } = useMeQuery();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      setOnlineUsers([]);
    }
  };

  useEffect(() => {
    if (currentUser) {
      const newSocket = io("http://localhost:5000", {
        query: { userId: currentUser._id },
      });
      setSocket(newSocket);

      const handleOnlineUsers = (users: string[]) => {
        setOnlineUsers(users);
      };

      newSocket.on("onlineUsers", handleOnlineUsers);

      return () => {
        newSocket.off("onlineUsers", handleOnlineUsers);
        newSocket.close();
        setSocket(null);
        setOnlineUsers([]);
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
        setOnlineUsers([]);
      }
    }
  }, [currentUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, disconnectSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};

export default SocketContextProvider;
