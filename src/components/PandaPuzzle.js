// src/components/PandaPuzzle.js
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/PandaPuzzle.css"; // Add a CSS file for styling
import pandaPic from "../assets/panda_puzzle.jpg";

// Utility function to shuffle the array
function shuffleArray(array) {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function PandaPuzzle({ onComplete }) {
  const rows = 3;
  const cols = 3;
  const totalPieces = rows * cols;
  const [pieces, setPieces] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isSolved, setIsSolved] = useState(false);

  // Initialize and shuffle the puzzle pieces on mount
  useEffect(() => {
    const initialPieces = Array.from({ length: totalPieces }, (_, i) => ({
      id: i, // Correct position index
      current: i,
    }));
    setPieces(shuffleArray(initialPieces));
  }, [totalPieces]);

  // Check if the puzzle is solved
  useEffect(() => {
    if (
      pieces.length === totalPieces &&
      pieces.every((piece, index) => piece.id === index)
    ) {
      setTimeout(() => {
        setIsSolved(true);
        setTimeout(onComplete, 2000); // Move to the next stage after 2 seconds
      }, 500);
    }
  }, [pieces, totalPieces, onComplete]);

  // Swap the clicked pieces
  const handlePieceClick = (index) => {
    if (selectedIndex === null) {
      setSelectedIndex(index);
    } else {
      const newPieces = [...pieces];
      [newPieces[selectedIndex], newPieces[index]] = [
        newPieces[index],
        newPieces[selectedIndex],
      ];
      setPieces(newPieces);
      setSelectedIndex(null);
    }
  };

  // Styles for the puzzle grid and pieces
  const puzzleStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, 100px)`,
    gridTemplateRows: `repeat(${rows}, 100px)`,
    gap: "5px",
    justifyContent: "center",
    margin: "20px auto",
  };

  const pieceStyle = {
    width: "100px",
    height: "100px",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out",
    backgroundImage: `url(${pandaPic})`, // Replace with your image URL
    backgroundSize: "300px 300px",
  };

  // Calculate the correct background position for each piece
  const getBackgroundPosition = (pieceId) => {
    const row = Math.floor(pieceId / cols);
    const col = pieceId % cols;
    return `-${col * 100}px -${row * 100}px`;
  };

  return (
    <div className='puzzle-container'>
      <h2>Panda Puzzle 🐼</h2>
      <p>Solve the puzzle to collect the Panda Plushie!</p>
      <p>
        Hint: Click on a puzzle piece to select it, then click on another piece
        to swap their positions. Keep swapping until the image is complete!
      </p>

      {isSolved ? (
        <AnimatePresence>
          <motion.div
            className='success-message'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            🎉 Puzzle Solved! You've collected the Panda Plushie! 🐼
          </motion.div>
        </AnimatePresence>
      ) : (
        <div style={puzzleStyle}>
          {pieces.map((piece, index) => (
            <motion.div
              key={index}
              style={{
                ...pieceStyle,
                backgroundPosition: getBackgroundPosition(piece.id),
                border:
                  selectedIndex === index ? "3px solid red" : "2px solid #ccc",
              }}
              onClick={() => handlePieceClick(index)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            ></motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PandaPuzzle;
