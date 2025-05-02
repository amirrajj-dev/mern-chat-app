import { motion, AnimatePresence } from 'framer-motion';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Send, Smile } from 'lucide-react';
type EmojiObject = {
  native: string;
};
const MessageInput = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);

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
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const handleEmojiSelect = (emoji: EmojiObject) => {
    setMessage((prev) => prev + emoji.native);
    inputRef.current?.focus();
  };

  return (
    <div className="mt-auto p-4 flex items-center gap-2 w-full relative">
      <input
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="Send a message"
        className="w-full p-4 pr-16 rounded-md bg-base-200/70 backdrop-blur-md focus:outline-none focus:border-b focus:border-base-content/20"
      />

      {/* Emoji Picker Toggle Button */}
      <button
        ref={emojiButtonRef}
        onClick={() => setShowEmojiPicker((prev) => !prev)}
        aria-label="Toggle emoji picker"
        className="absolute right-20 bottom-6 btn btn-circle bg-base-content/5 text-base-content/70 hover:bg-base-content/10 border-none"
      >
        <Smile className="w-6 h-6" />
      </button>

      {/* Send Button */}
      <button
        aria-label="Send message"
        className="absolute right-6 bottom-6 btn btn-circle bg-base-content/5 text-base-content/70 hover:bg-base-content/10 border-none"
      >
        <Send className="w-6 h-6" />
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
              theme="auto"
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