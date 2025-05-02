import { Palette, Volume2, VolumeOff } from "lucide-react";
import { useSound } from "use-sound";
import ThemePallette from "./ui/ThemePallette";

const Prefrences = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <ThemePallette/>
      <button className="btn btn-soft bg-base-300 border-none outline-none text-base-content focus:border-none focus:outline-none focus:ring-1 focus:ring-base-content/30 focus:border-base-content/20">
      <Volume2/>
      </button>
    </div>
  );
};

export default Prefrences;
