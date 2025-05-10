import { motion } from "framer-motion";

const blobTransition = {
  repeat: Infinity,
  duration: 30,
  ease: "easeInOut",
};

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Primary Blob */}
      <motion.div
        animate={{
          x: [0, 200, 0],
          y: [0, -150, 0],
          rotate: [0, 30, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={blobTransition}
        className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-primary rounded-full mix-blend-overlay blur-3xl opacity-25"
      />

      {/* Accent Blob */}
      <motion.div
        animate={{
          x: [0, -150, 0],
          y: [0, 100, 0],
          rotate: [0, -20, 20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ ...blobTransition, duration: 25 }}
        className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-accent rounded-full mix-blend-overlay blur-3xl opacity-25"
      />

      {/* Secondary Blob */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, 150, 0],
          rotate: [0, 15, -15, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ ...blobTransition, duration: 28 }}
        className="absolute top-[30%] left-[45%] w-[500px] h-[500px] bg-secondary rounded-full mix-blend-overlay blur-2xl opacity-20"
      />

      {/* Light Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none z-10" />

      {/* Radial Glows */}
      <div className="absolute w-[700px] h-[700px] bg-white/10 rounded-full blur-[160px] top-[20%] left-[10%] opacity-10" />
      <div className="absolute w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] bottom-[10%] right-[5%] opacity-10" />
    </div>
  );
};

export default AnimatedBackground;