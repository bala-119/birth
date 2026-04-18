// src/components/Welcome.js
import React from "react";
import { motion } from "framer-motion";
import "../styles/Welcome.css"; // Import the styles

function Welcome({ onStart }) {
  return (
    <motion.div
      className='welcome-container'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Hi Pookie Bear! 🐼
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Let's go on a spontaneous fun trip. 💖
      </motion.p>

      <motion.button
        className='start-button'
        onClick={onStart}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        Start the Adventure 🚀
      </motion.button>
    </motion.div>
  );
}

export default Welcome;
