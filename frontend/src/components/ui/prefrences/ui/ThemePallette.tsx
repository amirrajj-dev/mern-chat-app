import { Palette } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../../../store/useTheme";
import {Check} from 'lucide-react'
import useSound from "use-sound";
import { useSoundStore } from "../../../../store/useSound";

const themes = [
  { theme: "light", bg: "bg-white", text: "text-base-300" },
  { theme: "dark", bg: "bg-neutral-950", text: "text-neutral-100" },
  { theme: "forest", bg: "bg-emerald-600", text: "text-emerald-content" },
  { theme: "halloween", bg: "bg-base-300", text: "text-amber-600" },
  { theme: "retro", bg: "bg-amber-300", text: "text-base-300" },
  { theme: "emerald", bg: "bg-yellow-100", text: "text-base-300" },
  { theme: "night", bg: "bg-indigo-950", text: "text-indigo-400" },
];

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 18,
      stiffness: 180,
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: { duration: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 10 },
  visible: { opacity: 1, x: 0 },
};

const ThemePallette = () => {
  const [showThemePallette, setShowThemePallette] = useState(false);
  const {setTheme , theme : currrentTheme} = useTheme()
  const [mouseClickSound] = useSound('/sounds/mouse-click.mp3')
  const {soundEnabled} = useSoundStore()
  const handleChangeTheme = (theme: string) => {
    setShowThemePallette(false);
    setTheme(theme);
    if (soundEnabled){
      mouseClickSound()
    }
  };

  return (
    <div className="relative z-50">
      <motion.button
        onClick={() => {setShowThemePallette((prev) => !prev);if(soundEnabled) mouseClickSound()}}
        initial={{opacity : 0 , x : -100}}
        animate={{opacity : 1 , x : 0}}
        transition={{duration : 0.3 , type : 'spring' , stiffness : 180 , damping : 18}}
        whileTap={{ scale: 0.95 }}
        className="btn btn-soft bg-base-300 border-none text-base-content focus:ring-1 focus:ring-base-content/30"
      >
        <Palette className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {showThemePallette && (
          <motion.div
            key="theme-palette"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-12 left-0 sm:left-auto right-auto sm:right-0 w-56 p-3 bg-base-200/80 backdrop-blur-sm rounded-xl shadow-lg flex flex-col gap-2"
          >
            {themes.map((theme) => (
              <motion.button
                key={theme.theme}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleChangeTheme(theme.theme)}
                className={`btn btn-sm justify-between btn-ghost rounded-md px-3 font-medium flex items-center capitalize transition-all ${theme.bg} ${theme.text}`}
              >
                {theme.theme}
                {currrentTheme ===  theme.theme && <Check className="w-4 h-4" />}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemePallette;
