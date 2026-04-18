// src/components/SkittlesSorting.js
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/SkittlesSorting.css"; // Add styles for animations

function SkittlesSorting({ onComplete }) {
  const colors = ["red", "green", "blue", "yellow", "orange", "purple"];

  // Shuffle function to randomize skittles
  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const [skittles, setSkittles] = useState(
    shuffleArray(colors).map((color, index) => ({
      id: index,
      color: color,
      sorted: false,
    }))
  );

  const [selectedSkittle, setSelectedSkittle] = useState(null);
  const [message, setMessage] = useState("");

  // Check if all skittles are sorted
  useEffect(() => {
    if (skittles.every((s) => s.sorted)) {
      setTimeout(() => {
        setMessage(
          "🎉 All Skittles Sorted! You've collected the sweet moments!"
        );
        setTimeout(() => {
          onComplete();
        }, 1500);
      }, 1000);
    }
  }, [skittles, onComplete]);

  // Select a Skittle
  const handleSkittleClick = (skittle) => {
    if (skittle.sorted) return;
    setSelectedSkittle(skittle);
    setMessage(
      `🎯 Selected a ${skittle.color} skittle. Now place it in the matching bin.`
    );
  };

  // Sort Skittles into the correct bin
  const handleBinClick = (binColor) => {
    if (!selectedSkittle) {
      setMessage("🚨 Please select a skittle first.");
      return;
    }
    if (selectedSkittle.color === binColor) {
      setMessage("✅ Correct! Skittle sorted.");
      setSkittles((prev) =>
        prev.map((s) =>
          s.id === selectedSkittle.id ? { ...s, sorted: true } : s
        )
      );
    } else {
      setMessage("❌ Oops, wrong bin! Try again.");
    }
    setSelectedSkittle(null);
  };

  return (
    <div className='skittles-sorting'>
      <h2>Skittles Sorting Game 🌈</h2>
      <p>
        Sort the skittles into their correct bins by clicking on them first,
        then choosing a bin!
      </p>

      <div className='message-box'>{message}</div>

      <div className='skittles'>
        <AnimatePresence>
          {skittles
            .filter((s) => !s.sorted)
            .map((s) => (
              <motion.button
                key={s.id}
                onClick={() => handleSkittleClick(s)}
                style={{
                  backgroundColor: s.color,
                }}
                className={`skittle-button ${
                  selectedSkittle?.id === s.id ? "selected" : ""
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.4 }}
              >
                {s.color}
              </motion.button>
            ))}
        </AnimatePresence>
      </div>

      <div className='bins'>
        {colors.map((color, idx) => (
          <motion.div
            key={idx}
            onClick={() => handleBinClick(color)}
            className='bin'
            style={{ backgroundColor: color }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            {color}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default SkittlesSorting;
