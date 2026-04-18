import React, { useEffect, useRef } from "react";
import audio from "../assets/tangerine.mp3";

function MusicPlayer() {
  const audioRef = useRef(null);

  useEffect(() => {
    const playMusic = () => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .catch((error) => console.log("Autoplay blocked:", error));
      }
      // Remove event listener after the first interaction
      window.removeEventListener("click", playMusic);
    };

    // Attach event listener for first user interaction
    window.addEventListener("click", playMusic);

    return () => window.removeEventListener("click", playMusic);
  }, []);

  return (
    <div>
      <audio ref={audioRef} id='bg-music' loop>
        <source src={audio} type='audio/mpeg' />
      </audio>
    </div>
  );
}

export default MusicPlayer;
