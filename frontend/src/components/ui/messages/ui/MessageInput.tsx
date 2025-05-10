import { motion, AnimatePresence } from "framer-motion";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useEffect, useRef, useState, useCallback } from "react";
import { Loader2, Send, Smile } from "lucide-react";
import { useTheme } from "../../../../store/useTheme";
import { useSoundStore } from "../../../../store/useSound";
import useSound from "use-sound";
import { useConversationStore } from "../../../../store/useConveration";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../../configs/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
type EmojiObject = {
  native: string;
};

const MessageInput = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  const { theme } = useTheme();
  const {soundEnabled} = useSoundStore()
  const [keyStroke1Sound] = useSound('/sounds/keystroke1.mp3');
  const [keyStroke2Sound] = useSound('/sounds/keystroke2.mp3');
  const [keyStroke3Sound] = useSound('/sounds/keystroke3.mp3');
  const [keyStroke4Sound] = useSound('/sounds/keystroke4.mp3');
  const [mouseSoundClick] = useSound('/sounds/mouse-click.mp3')
  const {selectedUser} = useConversationStore()
  const queryClient = useQueryClient()
  const {mutate : sendMessage , isPending} = useMutation({
    mutationFn: async (message: string) =>{
      const {data} = await axiosInstance.post(`/api/messages/send/${selectedUser?._id}` , {message})
      console.log(data);
      return data.data
    },
    onSuccess: () => {
      setMessage("");
      inputRef.current?.focus();
      queryClient.invalidateQueries({queryKey : ["messages", selectedUser?._id]});
    },
    onError : (err : AxiosError<{message : string}>)=>{
      console.log(err);
      toast.error(err.response?.data.message || 'Failed to send message')
    }
  })

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target as Node) &&
      emojiButtonRef.current &&
      !emojiButtonRef.current.contains(event.target as Node)
    ) {
      setShowEmojiPicker(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const handleEmojiSelect = (emoji: EmojiObject) => {
    setMessage((prev) => prev + emoji.native);
    inputRef.current?.focus();
  };

  const handleSendMessage = () => {
    if (soundEnabled){
      mouseSoundClick()
    }
    if (message.trim().length > 0) {
      sendMessage(message);
    }
  }

  return (
    <div className="mt-auto p-4 flex items-center gap-2 w-full relative">
      <input
        ref={inputRef}
        id="messageInput"
        value={message}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}        
        onChange={(e) =>{setMessage(e.target.value); if (soundEnabled) {keyStroke1Sound(); keyStroke2Sound(); keyStroke3Sound(); keyStroke4Sound();}} }
        type="text"
        placeholder="Send a message"
        className="w-full p-4 pr-16 rounded-md bg-base-200/70 backdrop-blur-md focus:outline-none focus:border-b focus:border-base-content/20"
      />

      {/* Emoji Picker Toggle Button */}
      <button
        ref={emojiButtonRef}
        onClick={() =>{setShowEmojiPicker((prev) => !prev); if (soundEnabled) {mouseSoundClick()}} }
        aria-label="Toggle emoji picker"
        className="absolute right-20 bottom-6 btn btn-circle bg-base-content/5 text-base-content/70 hover:bg-base-content/10 border-none"
      >
        <Smile className="w-6 h-6" />
      </button>

      {/* Send Button */}
      <button
      onClick={handleSendMessage}
        aria-label="Send message"
        disabled={isPending}
        className="absolute right-6 bottom-6 btn btn-circle bg-base-content/5 text-base-content/70 hover:bg-base-content/10 border-none"
      >
        {isPending ? (
          <span className="loading loading-spinner loading-md">
            <Loader2/>
          </span>
        ) : (
          <Send className="w-6 h-6" />
        )}
      </button>

      {/* Emoji Picker */}
      <AnimatePresence>
        {showEmojiPicker && (
          <motion.div
            key="emoji-picker"
            ref={emojiPickerRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-4 z-50"
          >
            <Picker
              data={data}
              onEmojiSelect={handleEmojiSelect}
              theme={
                theme === "light"
                  ? "light"
                  : theme === "emerald"
                  ? "light"
                  : theme === "retro"
                  ? "light"
                  : "dark"
              }
              emojiSize={20}
              previewPosition="none"
              skinTonePosition="none"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MessageInput;
