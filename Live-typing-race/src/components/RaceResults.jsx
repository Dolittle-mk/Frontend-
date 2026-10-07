function RaceResults({
  wpm,
  accuracy,
  mistakes,
  totalCharacters,
  duration,
  difficulty,
  previousBestWPM,
  ghostWpm,
  onRaceAgain,
  onChangeDifficulty,
  onViewHistory,
}) {
  const isNewPersonalBest = wpm > previousBestWPM;

  const hasPreviousBest = previousBestWPM > 0;
  const hasGhost = ghostWpm > 0;

  let ghostComparison = "No ghost comparison available.";

  if (hasGhost) {
    const difference = wpm - ghostWpm;

    if (difference > 0) {
      ghostComparison = `You were ${difference.toFixed(
        1
      )} WPM faster than your ghost.`;
    } else if (difference < 0) {
      ghostComparison = `You were ${Math.abs(
        difference
      ).toFixed(1)} WPM behind your ghost.`;
    } else {
      ghostComparison = "You matched your ghost performance.";
    }
  }

  const statistics = [
    {
      label: "WPM",
      value: wpm.toFixed(1),
    },
    {
      label: "Accuracy",
      value: `${accuracy.toFixed(1)}%`,
    },
    {
      label: "Mistakes",
      value: mistakes,
    },
    {
      label: "Characters",
      value: totalCharacters,
    },
    {
      label: "Duration",
      value: `${duration}s`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm">
      <div 
           className="my-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:p-7"
           role="dialog"
           aria-modal="true"
           aria-labelledby="race-results-title"
        >
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
            Race Complete
          </p>

          <h2
            id="race-results-title"
            className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl"
          >
            Race Results
          </h2>

          {isNewPersonalBest && (
            <div className="mt-4 inline-flex rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-bold text-green-700 dark:border-green-900 dark:bg-green-950/50 dark:text-green-300" role="status">
              New Personal Best!
            </div>
          )}
        </div>

        {/* Main WPM */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center dark:border-slate-800 dark:bg-slate-950">
          <p className="text-sm font-medium text-gray-500">
            Your WPM
          </p>

          <p className="mt-1 text-5xl font-bold text-gray-900">
            {wpm.toFixed(1)}
          </p>

          <p className="mt-2 text-sm text-gray-500 capitalize">
            {difficulty} difficulty
          </p>
        </div>

        {/* Statistics */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {statistics.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-200 bg-white p-4 text-center"
            >
              <p className="text-xs font-medium text-gray-500">
                {stat.label}
              </p>

              <p className="mt-1 text-lg font-bold text-gray-900">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Performance comparison */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-200 p-5">
            <p className="text-sm font-medium text-gray-500">
              Previous Best WPM
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              {hasPreviousBest
                ? previousBestWPM.toFixed(1)
                : "--"}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {hasPreviousBest
                ? isNewPersonalBest
                  ? `Improved by ${(
                      wpm - previousBestWPM
                    ).toFixed(1)} WPM`
                  : `${(
                      previousBestWPM - wpm
                    ).toFixed(1)} WPM below your best`
                : "Your first completed race"}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 p-5">
            <p className="text-sm font-medium text-gray-500">
              Ghost Performance
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              {hasGhost
                ? `${ghostWpm.toFixed(1)} WPM`
                : "--"}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {ghostComparison}
            </p>
          </div>
        </div>

        {/* Race information */}
        <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium text-gray-500">
              Difficulty
            </span>

            <span className="text-sm font-semibold capitalize text-gray-900">
              {difficulty}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between gap-4">
            <span className="text-sm font-medium text-gray-500">
              Race Duration
            </span>

            <span className="text-sm font-semibold text-gray-900">
              {duration} seconds
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <button
            type="button"
            onClick={onRaceAgain}
            className="min-h-11 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
          >
            Race Again
          </button>

          <button
            type="button"
            onClick={onChangeDifficulty}
            className="min-h-11 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:ring-slate-500 dark:focus:ring-offset-slate-900"
          >
            Change Difficulty
          </button>

          <button
            type="button"
            onClick={onViewHistory}
            className="min-h-11 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:ring-slate-500 dark:focus:ring-offset-slate-900"
          >
            View History
          </button>
        </div>
      </div>
    </div>
  );
}

export default RaceResults;