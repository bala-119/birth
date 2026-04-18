import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/RomanticTrivia.css";
import couplePic from "../assets/couple.jpeg";

function GrandReveal({ onComplete, roses }) {
  const [showFinalQuestion, setShowFinalQuestion] = useState(false);
  const [yesClicked, setYesClicked] = useState(false);
  const [hide, setHide] = useState(false); // ✅ Controls hiding the question
  const [noButtonSize, setNoButtonSize] = useState(1);

  return (
    <div className='grand-reveal'>
      {!showFinalQuestion ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h2>🌹 You have collected {roses} roses! 🌹</h2>
          <p>
            You now have enough to reveal the <b>Grand Question!</b>
          </p>
          <button onClick={() => setShowFinalQuestion(true)}>Reveal It</button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {!hide && ( // ✅ Hide the question & buttons when "Yes" is clicked
            <>
              <h2>🥰 The Grand Question 🥰</h2>
              <p>Will you be my Valentine? ❤️</p>

              <div className='options'>
                <button
                  className='yes-btn'
                  onClick={() => {
                    setYesClicked(true);
                    setHide(true); // ✅ Hide everything once "Yes" is clicked
                  }}
                  disabled={yesClicked}
                >
                  Yes! 💕
                </button>

                {!yesClicked && (
                  <button
                    className='no-btn'
                    style={{ transform: `scale(${noButtonSize})` }}
                    onClick={() =>
                      setNoButtonSize((prev) => Math.max(prev - 0.2, 0))
                    }
                  >
                    No
                  </button>
                )}
              </div>
            </>
          )}

          {yesClicked && ( // ✅ Display the final message after clicking "Yes"
            <motion.div
              className='final-message'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <h2>🎉 Yay!</h2>
              <h3>Happy 9 Months Baby Bear 😘</h3>
              <p>
                I can't wait for Mount Princeton Hot Springs and dinner with
                suits and skims. Maybe you can unwrap some Bengali desert after
                😉 💖
              </p>
              <img
                src={couplePic}
                alt='Us'
                className='final-photo'
                width='300'
                height='400'
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default GrandReveal;
