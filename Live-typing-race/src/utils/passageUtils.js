import typingPassages from "../data/typingPassages";

export function getPassagesByDifficulty(difficulty) {
  return typingPassages.filter(
    (passage) => passage.difficulty === difficulty
  );
}

export function getRandomPassage(difficulty, currentPassageId = null) {
  const passages = getPassagesByDifficulty(difficulty);

  if (passages.length === 0) {
    return null;
  }

  // If there is more than one passage, avoid selecting
  // the passage that is currently being displayed.
  const availablePassages =
    passages.length > 1
      ? passages.filter((passage) => passage.id !== currentPassageId)
      : passages;

  const randomIndex = Math.floor(Math.random() * availablePassages.length);

  return availablePassages[randomIndex];
}