import { useEffect, useRef, useState } from "react";

import { calculateTypingStats } from "../utils/typingStats";

import {getBestRace,saveRaceResult,} from "../utils/storage";

function useTypingRace( passage, duration, difficulty, onRaceFinished) {
  const emptyStats = {
    wpm: 0,
    accuracy: 0,
    correctCharacters: 0,
    incorrectCharacters: 0,
    totalCharacters: 0,
    mistakes: 0,
    elapsedTime: 0,


  };

  const [typedText, setTypedText] = useState("");
  const [isRacing, setIsRacing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [timeLeft, setTimeLeft] = useState(duration);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [completionTime, setCompletionTime] = useState(null);

  const [currentStats, setCurrentStats] = useState(emptyStats);

  const [performanceHistory, setPerformanceHistory] = useState([]);

  const [previousBestWPM, setPreviousBestWPM] = useState(0);

  const inputRef = useRef(null);
  const startTimeRef = useRef(null);

  const performanceRef = useRef([]);
  const typedTextRef = useRef("");

  // Focus textarea when race starts
  useEffect(() => {
    if (isRacing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isRacing]);

  // Reset timer when duration changes
  useEffect(() => {
    if (!isRacing) {
      setTimeLeft(duration);
    }
  }, [duration, isRacing]);

  // Race timer
  useEffect(() => {
    if (!isRacing) {
      return;
    }

    const timerId = setInterval(() => {
      const now = Date.now();

      const elapsedSeconds = Math.min(
        Math.floor(
          (now - startTimeRef.current) / 1000
        ),
        duration
      );

      const remainingSeconds = Math.max(
        duration - elapsedSeconds,
        0
      );

      setElapsedTime(elapsedSeconds);
      setTimeLeft(remainingSeconds);

      // Calculate current statistics
      const stats = calculateTypingStats(
        typedTextRef.current,
        passage.text,
        elapsedSeconds
      );

      setCurrentStats(stats);

      // Save performance point
      const performancePoint = {
        time: elapsedSeconds,
        characters: typedTextRef.current.length,
        wpm: stats.wpm,
      };

      performanceRef.current.push(
        performancePoint
      );

      setPerformanceHistory([
        ...performanceRef.current,
      ]);

      // Finish when time reaches zero
      if (remainingSeconds === 0) {
        finishRace(
          elapsedSeconds,
          typedTextRef.current
        );
      }
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [isRacing, duration, passage]);

  function startRace() {
    setTypedText("");
    setIsFinished(false);

    setElapsedTime(0);
    setTimeLeft(duration);
    setCompletionTime(null);

    // Reset statistics
    setCurrentStats({
      ...emptyStats,
    });

    setPreviousBestWPM(
      getBestRace(
        difficulty,
        duration
      )?.wpm || 0
    );

    setPerformanceHistory([]);

    performanceRef.current = [
      {
        time: 0,
        characters: 0,
        wpm: 0,
      },
    ];

    typedTextRef.current = "";

    startTimeRef.current = Date.now();

    setIsRacing(true);
  }

  function finishRace(
    finalElapsedTime,
    finalTypedText
  ) {
    const stats = calculateTypingStats(
      finalTypedText,
      passage.text,
      finalElapsedTime
    );

    const completedAt = new Date();

    // Make sure final statistics are stored
    setCurrentStats(stats);

    const finalPerformancePoint = {
      time: finalElapsedTime,
      characters: finalTypedText.length,
      wpm: stats.wpm,
    };

    performanceRef.current = [
      ...performanceRef.current.filter(
        (point) =>
          point.time !== finalElapsedTime
      ),
      finalPerformancePoint,
    ];

    setPerformanceHistory([
      ...performanceRef.current,
    ]);

    const previousBest = getBestRace(
      difficulty,
      duration
    );

    setPreviousBestWPM(
      previousBest?.wpm || 0
    );

    const result = {
      ...stats,
      duration,
      difficulty,
      completionTime:
        completedAt.toISOString(),
      performance:
        performanceRef.current,
    };

    saveRaceResult(result);

    if (onRaceFinished) {
      onRaceFinished();
    }

    setCompletionTime(
      completedAt.toISOString()
    );

    setElapsedTime(finalElapsedTime);

    setTimeLeft(
      Math.max(
        duration - finalElapsedTime,
        0
      )
    );

    setIsRacing(false);
    setIsFinished(true);
  }

  function resetRace() {
    setTypedText("");
    setIsFinished(false);
    setIsRacing(false);

    setCurrentStats({
      ...emptyStats,
    });

    setElapsedTime(0);
    setTimeLeft(duration);
    setCompletionTime(null);

    setPerformanceHistory([]);

    performanceRef.current = [];
    typedTextRef.current = "";

    startTimeRef.current = null;
  }

function handleTyping(value) {
  if (!isRacing || isFinished) {
    return;
  }
  

  if (value.length > passage.text.length) {
    return;
  }

  // Update React state
  setTypedText(value);

  // Update ref
  typedTextRef.current = value;

  // Calculate elapsed time
  const currentElapsedTime = Math.min(
    Math.floor(
      (Date.now() - startTimeRef.current) / 1000
    ),
    duration
  );

  // Calculate current statistics
  const stats = calculateTypingStats(
    value,
    passage.text,
    currentElapsedTime
  );

  // Update statistics
  setCurrentStats(stats);

  // Finish when passage is completely typed
  if (value.length === passage.text.length) {
    finishRace(
      currentElapsedTime,
      value
    );
  }
}

  return {
    inputRef,

    typedText,

    isRacing,
    isFinished,

    timeLeft,
    elapsedTime,
    completionTime,

    // Statistics
    wpm: currentStats.wpm,
    accuracy: currentStats.accuracy,
    correctCharacters:
      currentStats.correctCharacters,
    incorrectCharacters:
      currentStats.incorrectCharacters,
    totalCharacters:
      currentStats.totalCharacters,
    mistakes: currentStats.mistakes,

    performanceHistory,
    previousBestWPM,

    startRace,
    resetRace,
    handleTyping,
  };
}

export default useTypingRace;