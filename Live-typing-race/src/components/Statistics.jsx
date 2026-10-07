function Statistics({
  wpm,
  accuracy,
  correctCharacters,
  incorrectCharacters,
  totalCharacters,
  mistakes,
  elapsedTime,
  completionTime,
}) {
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
      label: "Correct",
      value: correctCharacters,
    },
    {
      label: "Incorrect",
      value: incorrectCharacters,
    },
    {
      label: "Characters",
      value: totalCharacters,
    },
    {
      label: "Mistakes",
      value: mistakes,
    },
    {
      label: "Elapsed Time",
      value: `${elapsedTime}s`,
    },
    {
      label: "Completion Time",
      value: completionTime
        ? new Date(completionTime).toLocaleTimeString()
        : "--",
    },
  ];

  return (
    <section>
  <div className="mb-4">
    <h2 className="text-lg font-semibold tracking-tight text-gray-950 dark:text-white">
      Statistics
    </h2>

    <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
      Your current race performance.
    </p>
  </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {statistics.map((stat) => (
         <div
           key={stat.label}
           className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/80 sm:p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-slate-500">
              {stat.label}
            </p>

            <p className="mt-2 text-xl font-bold tabular-nums tracking-tight text-gray-950 dark:text-white sm:text-2xl">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Statistics; 