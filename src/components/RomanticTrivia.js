import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/RomanticTrivia.css"; // Import styles
import GrandReveal from "./GrandReveal";

function RomanticTrivia({ onComplete, setRoses }) {
  const questions = [
    {
      question: "When is our anniversary?",
      options: ["April 15", "May 10", "June 21"],
      answer: "May 10",
    },
    {
      question: "Where was our first date?",
      options: ["Sushi Row", "Everest Nepal", "Pho N Thai"],
      answer: "Sushi Row",
    },
    {
      question:
        "Do you know we would have a baby by now if we had fun on the first day?",
      options: ["Yes", "No", "I can't believe it's been 9 months"],
      answer: ["Yes", "I can't believe it's been 9 months"],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [roseCount, setRoseCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showDrumRoll, setShowDrumRoll] = useState(false);

  const currentQuestion = questions[currentIndex] || null;

  useEffect(() => {
    if (currentIndex === questions.length) {
      // Show drum roll before final reveal
      setShowDrumRoll(true);
      setTimeout(() => {
        setShowDrumRoll(false);
        setShowFinalMessage(true);
      }, 3000);
    }
    // eslint-disable-next-line
  }, [currentIndex]);

  const handleSubmit = () => {
    if (selectedOption === "") {
      setFeedback("Please select an option.");
      return;
    }

    if (Array.isArray(currentQuestion.answer)) {
      if (currentQuestion.answer.includes(selectedOption)) {
        setFeedback("Correct! You've earned a rose. 🌹");
        setRoseCount((prev) => prev + 1);
        setRoses((prev) => prev + 1);
      } else {
        setFeedback("That's not quite right.");
      }
    } else if (selectedOption === currentQuestion.answer) {
      setFeedback("Correct! You've earned a rose. 🌹");
      setRoseCount((prev) => prev + 1);
      setRoses((prev) => prev + 1);
    } else {
      setFeedback("That's not quite right.");
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption("");
        setFeedback("");
      } else {
        setCurrentIndex(questions.length); // Move to the next phase (drum roll)
      }
    }, 1500);
  };

  return (
    <div className='romantic-trivia'>
      {!showFinalMessage ? (
        <AnimatePresence mode='wait'>
          {showDrumRoll ? (
            <motion.div
              key='drum-roll'
              className='drum-roll'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
            >
              🥁 Drum Roll... 🥁
            </motion.div>
          ) : currentQuestion ? ( // ✅ Safe check before rendering
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Romantic Trivia 🌹</h2>
              <p>Answer the questions to earn roses!</p>

              <h3>{currentQuestion.question}</h3>

              <div className='options'>
                {currentQuestion.options.map((option, idx) => (
                  <motion.div key={idx} whileHover={{ scale: 1.1 }}>
                    <label>
                      <input
                        type='radio'
                        name='trivia'
                        value={option}
                        checked={selectedOption === option}
                        onChange={() => setSelectedOption(option)}
                      />
                      {option}
                    </label>
                  </motion.div>
                ))}
              </div>

              <button className='submit-btn' onClick={handleSubmit}>
                Submit Answer
              </button>

              <div className='feedback'>{feedback}</div>
              <div className='rose-count'>🌹 Roses collected: {roseCount}</div>
            </motion.div>
          ) : null}{" "}
          {/* ✅ Avoid rendering if `currentQuestion` is undefined */}
        </AnimatePresence>
      ) : (
        <GrandReveal onComplete={onComplete} roses={roseCount} />
      )}
    </div>
  );
}

export default RomanticTrivia;
