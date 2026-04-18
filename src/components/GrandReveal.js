import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/RomanticTrivia.css";
import couplePic from "../assets/couple.jpg";

function GrandReveal({ onComplete, roses }) {
  const [showFinalQuestion, setShowFinalQuestion] = useState(false);
  const [yesClicked, setYesClicked] = useState(false);
  const [hide, setHide] = useState(false);
  const [noButtonSize, setNoButtonSize] = useState(1);
  const [daysLeft, setDaysLeft] = useState(2); // 2 days to go

  // Optional: Auto-countdown if you want real-time
  useEffect(() => {
    const birthday = new Date(); // Replace with actual birthday date
    birthday.setDate(birthday.getDate() + 2); // Example: 2 days from now
    // Or hardcode: const birthday = new Date("2026-04-20");
    
    const timer = setInterval(() => {
      const now = new Date();
      const diff = Math.ceil((birthday - now) / (1000 * 60 * 60 * 24));
      setDaysLeft(diff > 0 ? diff : 0);
    }, 86400000); // Update every day
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='grand-reveal'>
      {!showFinalQuestion ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h2>🎂 You have collected {roses} roses! 🎂</h2>
          <p>
            ⏳ <strong>{daysLeft} days to go</strong> until your birthday! ⏳
          </p>
          <p>
            You now have enough to reveal the <b>Grand Birthday Question!</b>
          </p>
          <button onClick={() => setShowFinalQuestion(true)}>Reveal It 🎁</button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {!hide && (
            <>
              <h2>🎈 The Grand Birthday Question 🎈</h2>
              <p>Will you let me make this your best birthday ever? 🎂❤️</p>

              <div className='options'>
                <button
                  className='yes-btn'
                  onClick={() => {
                    setYesClicked(true);
                    setHide(true);
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

          {yesClicked && (
            <motion.div
              className='final-message'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <h2>🎉 Yay! 🎉</h2>
             
              <p>
                <strong>🎂 2 DAYS TO GO UNTIL YOUR BIRTHDAY! 🎂</strong>
              </p>
              <p>
                I can't wait to celebrate YOU. Get ready for Mount Princeton Hot Springs,
                dinner with suits and Skims, and maybe some Bengali dessert after 😉 💖
              </p>
              <p>
                <em>P.S. Your real birthday surprise is even bigger than this game... 🎁</em>
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