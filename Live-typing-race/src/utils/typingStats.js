export function calculateCorrectCharacters(typedText, passageText) {
  let correctCharacters = 0;

  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === passageText[i]) {
      correctCharacters++;
    }
  }

  return correctCharacters;
}

export function calculateIncorrectCharacters(
  typedText,
  passageText
) {
  return typedText.length - calculateCorrectCharacters(
    typedText,
    passageText
  );
}

export function calculateAccuracy(
  correctCharacters,
  totalCharacters
) {
  if (totalCharacters === 0) {
    return 0;
  }

  return (correctCharacters / totalCharacters) * 100;
}

export function calculateWPM(
  correctCharacters,
  elapsedSeconds
) {
  if (correctCharacters === 0 || elapsedSeconds <= 0) {
    return 0;
  }

  const elapsedMinutes = elapsedSeconds / 60;

  return correctCharacters / 5 / elapsedMinutes;
}

export function calculateTypingStats(
  typedText,
  passageText,
  elapsedSeconds
) {
  const totalCharacters = typedText.length;

  const correctCharacters = calculateCorrectCharacters(
    typedText,
    passageText
  );

  const incorrectCharacters = totalCharacters - correctCharacters;

  const accuracy = calculateAccuracy(
    correctCharacters,
    totalCharacters
  );

  const wpm = calculateWPM(
    correctCharacters,
    elapsedSeconds
  );

  return {
    wpm,
    accuracy,
    correctCharacters,
    incorrectCharacters,
    totalCharacters,
    mistakes: incorrectCharacters,
    elapsedTime: elapsedSeconds,
  };
}