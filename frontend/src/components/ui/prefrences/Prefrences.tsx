import { Volume2, VolumeOff } from "lucide-react";
import { useSound } from "use-sound";
import ThemePallette from "./ui/ThemePallette";
import { useSoundStore } from "../../../store/useSound";
import { motion } from "framer-motion";

const Prefrences = () => {
  const { soundEnabled, setSoundEnabled } = useSoundStore();
  // const [mouseClickSound] = useSound('/sounds/mouse-click.mp3')
  const [soundOn] = useSound('/sounds/sound-on.mp3')
  const [soundOff] = useSound('/sounds/sound-off.mp3')
  return (
    <div className="flex items-center justify-center gap-2">
      <ThemePallette />
      <motion.button
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 180,
          damping: 18,
        }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-soft bg-base-300 border-none outline-none text-base-content focus:border-none focus:outline-none focus:ring-1 focus:ring-base-content/30 focus:border-base-content/20"
      >
        {soundEnabled ? (
          <Volume2 onClick={() =>{setSoundEnabled(false); soundOff()}} />
        ) : (
          <VolumeOff onClick={() =>{setSoundEnabled(true); soundOn()}} />
        )}
      </motion.button>
    </div>
  );
};

export default Prefrences;
