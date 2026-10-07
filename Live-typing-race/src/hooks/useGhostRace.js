import { useEffect, useState } from "react";

import { getBestRace } from "../utils/storage";

function useGhostRace(
  difficulty,
  duration,
  elapsedTime,
  historyVersion
) {
  const [ghost, setGhost] = useState(null);

  useEffect(() => {
    const bestRace = getBestRace(
      difficulty,
      duration
    );

    setGhost(bestRace);
  }, [
    difficulty,
    duration,
    historyVersion,
  ]);

  if (!ghost) {
    return {
      ghost: null,
      ghostProgress: 0,
      ghostCharacters: 0,
      ghostWpm: 0,
    };
  }

  const performance = Array.isArray(
    ghost.performance
  )
    ? ghost.performance
    : [];

  let currentPoint = {
    time: 0,
    characters: 0,
  };

  for (const point of performance) {
    if (point.time <= elapsedTime) {
      currentPoint = point;
    } else {
      break;
    }
  }

  const ghostCharacters =
    currentPoint.characters || 0;

  const totalGhostCharacters =
    ghost.totalCharacters || 0;

  const ghostProgress =
    totalGhostCharacters > 0
      ? Math.min(
          (ghostCharacters /
            totalGhostCharacters) *
            100,
          100
        )
      : 0;

  return {
    ghost,
    ghostProgress,
    ghostCharacters,
    ghostWpm: ghost.wpm || 0,
  };
}

export default useGhostRace;