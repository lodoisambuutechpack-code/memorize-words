"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

// Custom Toast Component
export function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ type: "spring", stiffness: 500, damping: 25 }}
      style={{
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        background: "linear-gradient(90deg, #56ab2f, #a8e063)", // ✅ Ногоон градиент
        color: "#fff",
        padding: "12px 24px",
        borderRadius: 24,
        fontWeight: "bold",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        zIndex: 9999,
      }}
    >
      {message}
    </motion.div>
  );
}
