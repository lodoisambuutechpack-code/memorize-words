import { motion } from "framer-motion";

const GradientHeart = () => (
  <motion.div
    className="relative flex items-center justify-center"
    style={{ width: 40, height: 40 }}
  >
    {/* Outer glowing ring */}
    <motion.div
      className="absolute rounded-full"
      style={{
        width: 30,
        height: 30,
        background:
          "conic-gradient(from 0deg, #ff3366, #ff6699, #ff3366, #ff6699)",
        filter: "blur(6px)",
        opacity: 0.7,
      }}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
    />

    {/* Pulsating outline */}
    <motion.div
      className="absolute rounded-full border-2 border-pink-400"
      style={{ width: 20, height: 20 }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Main gradient heart */}
    <motion.div
      style={{
        fontSize: 10,
        position: "relative",
        background:
          "linear-gradient(135deg, #ff4b6e, #ff1e56, #ff6f91, #ff4b6e)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        filter: "drop-shadow(0 0 6px rgba(255,80,120,0.7))",
      }}
      animate={{
        scale: [1, 1.25, 1],
        rotate: [0, -5, 5, 0],
      }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      ❤️
    </motion.div>
  </motion.div>
);

export default GradientHeart;
