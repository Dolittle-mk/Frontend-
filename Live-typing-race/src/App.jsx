import { useRef, useState } from "react";

//Components
import Header from "./components/Header";
import RaceSettings from "./components/RaceSettings";
import TypingArea from "./components/TypingArea";
import RaceProgress from "./components/RaceProgress";
import PerformanceChart from "./components/PerformanceChart";
import Statistics from "./components/Statistics";
import RaceControls from "./components/RaceControls";
import ClearHistory from "./components/ClearHistory";
import RaceResults from "./components/RaceResults";
import RaceHistory from "./components/RaceHistory";

//Customs Hooks
import useTypingRace from "./hooks/useTypingRace";
import useGhostRace from "./hooks/useGhostRace";

import { calculateTypingStats } from "./utils/typingStats";
import { getRandomPassage } from "./utils/passageUtils";
import {getSettings,saveSettings,} from "./utils/storage";



function App() {
  const savedSettings = getSettings();

  const [difficulty, setDifficulty] = useState(
    savedSettings.difficulty
  );

  const [duration, setDuration] = useState(
    savedSettings.duration
  );

  const [historyVersion, setHistoryVersion] = useState(0);

  const historyRef = useRef(null);
  

  const [passage, setPassage] = useState(() =>
    getRandomPassage(savedSettings.difficulty)
  );

   function handleRaceFinished() {
    setHistoryVersion((previous) => previous + 1);
  }

const {
  inputRef,
  typedText,
  isRacing,
  isFinished,
  timeLeft,
  elapsedTime,
  completionTime,
  wpm,
  accuracy,
  correctCharacters,
  incorrectCharacters,
  totalCharacters,
  mistakes,
  performanceHistory,
  previousBestWPM,
  startRace,
  resetRace,
  handleTyping,
} = useTypingRace(
  passage,
  duration,
  difficulty,
  handleRaceFinished
);

const statistics = calculateTypingStats(
  typedText,
  passage.text,
  elapsedTime
);



  const {
    ghost,
    ghostProgress,
    ghostWpm,
  } = useGhostRace(
    difficulty,
    duration,
    elapsedTime,
    historyVersion
  );

  const userProgress = 
      passage.text.length > 0
      ? Math.min(
          (typedText.length /
            passage.text.length) *
            100,
          100
        )
      : 0;

  function handleDifficultyChange( newDifficulty ) {
    if (isRacing) {
      return;
    }

    setDifficulty(newDifficulty);

    saveSettings({
      difficulty: newDifficulty,
      duration,
    });

    const newPassage = getRandomPassage(
      newDifficulty,
      passage?.id
    );

    setPassage(newPassage);

    resetRace();
  }

  function handleDurationChange(newDuration) {
    if (isRacing) {
      return;
    }

    setDuration(newDuration);

    saveSettings({
      difficulty,
      duration: newDuration,
    });
  }

  function handleStart() {
    startRace();
  }

  function handleReset() {
    const newPassage = getRandomPassage(
      difficulty,
      passage?.id
    );

    setPassage(newPassage);

    resetRace();
  }

  function handleChangeDifficulty() {
  resetRace();
}

  function handleHistoryCleared() {
    setHistoryVersion(
      (previous) => previous + 1
    );
  }

  function handleViewHistory() {
  resetRace();

  setTimeout(() => {
    historyRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);
}


  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <Header
        historyVersion={historyVersion}
      />

      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="space-y-5 sm:space-y-6">
          
        <RaceSettings
          difficulty={difficulty}
          duration={duration}
          isRacing={isRacing}
          onDifficultyChange={ handleDifficultyChange }
          onDurationChange={ handleDurationChange }
        />

         {/* 2. Time Remaining */}
        <div className="flex justify-center">
        <div className="w-full max-w-xs rounded-2xl border border-gray-200 bg-white px-6 py-5 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-500">
          Time Remaining
        </p>

        <p
          className={`mt-1 text-4xl font-bold tabular-nums tracking-tight ${
            timeLeft <= 10 && isRacing
              ? "text-red-600 dark:text-red-400"
              : "text-gray-950 dark:text-white"
          }`}
          aria-live="polite"
        >
          {timeLeft}s
        </p>
      </div>
    </div>

  <TypingArea
  passage={passage}
  typedText={typedText}
  isRacing={isRacing}
  isFinished={isFinished}
  inputRef={inputRef}
  onTyping={handleTyping}
/>

<RaceProgress
  userProgress={userProgress}
  userWpm={statistics.wpm}
  ghostProgress={ghostProgress}
  ghostWpm={ghostWpm}
  hasGhost={Boolean(ghost)}
/>

<PerformanceChart
  userPerformance={performanceHistory}
  ghostPerformance={ghost?.performance || []}
/>

<Statistics
  wpm={statistics.wpm}
  accuracy={statistics.accuracy}
  correctCharacters={statistics.correctCharacters}
  incorrectCharacters={statistics.incorrectCharacters}
  totalCharacters={statistics.totalCharacters}
  mistakes={statistics.mistakes}
  elapsedTime={elapsedTime}
  completionTime={completionTime}
/>

<div ref={historyRef}>
  <RaceHistory historyVersion={historyVersion} />
</div>

<div className="flex justify-center pb-4">
 <RaceControls
  isRacing={isRacing}
  isFinished={isFinished}
  onStart={handleStart}
  onReset={handleReset}
/>
</div>

        <div className="flex justify-center pb-6">
          <ClearHistory
            onHistoryCleared={
              handleHistoryCleared
            }
          />
        </div>

 {isFinished && (
  <RaceResults
  wpm={statistics.wpm}
  accuracy={statistics.accuracy}
  mistakes={statistics.mistakes}
  totalCharacters={statistics.totalCharacters}
  duration={duration}
  difficulty={difficulty}
  previousBestWPM={previousBestWPM}
  ghostWpm={ghostWpm}
  onRaceAgain={handleStart}
  onChangeDifficulty={handleChangeDifficulty}
  onViewHistory={handleViewHistory}
/>
)}
</div>
      </main>
    </div>
  );
}

export default App;