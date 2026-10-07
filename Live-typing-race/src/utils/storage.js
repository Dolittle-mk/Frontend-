const STORAGE_KEY = "liveTypingRaceData";

const DEFAULT_DATA = {
  results: [],
  settings: {
    difficulty: "medium",
    duration: 60,
  },
};

function getStorageData() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      return DEFAULT_DATA;
    }

    const parsedData = JSON.parse(savedData);

    if (!parsedData || typeof parsedData !== "object") {
      return DEFAULT_DATA;
    }

    return {
      results: Array.isArray(parsedData.results)
        ? parsedData.results
        : [],

      settings:
        parsedData.settings &&
        typeof parsedData.settings === "object"
          ? {
              difficulty:
                parsedData.settings.difficulty || "medium",

              duration:
                Number(parsedData.settings.duration) || 60,
            }
          : DEFAULT_DATA.settings,
    };
  } catch {
    return DEFAULT_DATA;
  }
}

function saveStorageData(data) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );
  } catch {
    // Ignore LocalStorage errors safely.
  }
}

export function saveRaceResult(result) {
  const data = getStorageData();

  const updatedResults = [
    ...data.results,
    result,
  ];

  saveStorageData({
    ...data,
    results: updatedResults,
  });
}

export function getRaceResults() {
  const data = getStorageData();

  return data.results;
}

export function getBestRace(
  difficulty = null,
  duration = null
) {
  const results = getRaceResults();

  let matchingResults = results;

  if (difficulty) {
    matchingResults = matchingResults.filter(
      (result) => result.difficulty === difficulty
    );
  }

  if (duration) {
    matchingResults = matchingResults.filter(
      (result) => result.duration === duration
    );
  }

  if (matchingResults.length === 0) {
    return null;
  }

  return matchingResults.reduce((best, current) => {
    if (!best) {
      return current;
    }

    if (current.wpm > best.wpm) {
      return current;
    }

    if (
      current.wpm === best.wpm &&
      current.accuracy > best.accuracy
    ) {
      return current;
    }

    return best;
  }, null);
}

export function getBestWPM() {
  const results = getRaceResults();

  if (results.length === 0) {
    return 0;
  }

  return Math.max(
    ...results.map((result) => result.wpm || 0)
  );
}

export function getBestAccuracy() {
  const results = getRaceResults();

  if (results.length === 0) {
    return 0;
  }

  return Math.max(
    ...results.map(
      (result) => result.accuracy || 0
    )
  );
}

export function clearRaceHistory() {
  const data = getStorageData();

  saveStorageData({
    ...data,
    results: [],
  });
}

export function saveSettings(settings) {
  const data = getStorageData();

  saveStorageData({
    ...data,
    settings: {
      difficulty: settings.difficulty,
      duration: settings.duration,
    },
  });
}

export function getSettings() {
  const data = getStorageData();

  return data.settings;
}