function RaceSettings({
  difficulty,
  duration,
  isRacing,
  onDifficultyChange,
  onDurationChange,
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <h2 className="text-base font-semibold tracking-tight text-gray-950 dark:text-white">Race Settings</h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
         Choose your difficulty and race duration.
     </p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="difficulty"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Difficulty
          </label>

          <select
            id="difficulty"
            value={difficulty}
            onChange={(event) => onDifficultyChange(event.target.value)}
            disabled={isRacing}
            className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-3 text-sm font-medium text-gray-900 shadow-sm transition hover:border-gray-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:border-slate-600 dark:focus:border-slate-500 dark:focus:ring-slate-800 dark:disabled:bg-slate-800 dark:disabled:text-slate-500"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="duration"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Race Duration
          </label>

          <select
            id="duration"
            value={duration}
            onChange={(event) => onDurationChange(Number(event.target.value))}
            disabled={isRacing}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
          >
            <option value="30">30 seconds</option>
            <option value="60">60 seconds</option>
            <option value="120">120 seconds</option>
          </select>
        </div>
      </div>
    </section>
  );
}

export default RaceSettings;