// src/App.js
import React, { useState } from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import PandaPuzzle from "./components/PandaPuzzle";
import SkittlesSorting from "./components/SkittlesSorting";
import RomanticTrivia from "./components/RomanticTrivia";
import GrandReveal from "./components/GrandReveal";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  // Manage which stage of the adventure is shown:
  // "welcome" → "puzzle" → "sorting" → "trivia" → "final"
  const [stage, setStage] = useState("welcome");
  // Optionally track the total number of roses earned
  const [, setRoses] = useState(0);

  // Handler to move to the next stage
  const nextStage = () => {
    if (stage === "welcome") setStage("puzzle");
    else if (stage === "puzzle") setStage("sorting");
    else if (stage === "sorting") setStage("trivia");
    else if (stage === "trivia") setStage("final");
  };

  return (
    <div className='App'>
      <MusicPlayer />
      {stage === "welcome" && <Welcome onStart={nextStage} />}
      {stage === "puzzle" && <PandaPuzzle onComplete={nextStage} />}
      {stage === "sorting" && <SkittlesSorting onComplete={nextStage} />}
      {stage === "trivia" && (
        <RomanticTrivia onComplete={nextStage} setRoses={setRoses} />
      )}
      {stage === "final" && <GrandReveal />}
    </div>
  );
}

export default App;
