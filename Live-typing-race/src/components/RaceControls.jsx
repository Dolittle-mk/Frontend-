function RaceControls({
  onStart,
  onReset,
  isRacing,
  isFinished,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={onStart}
        disabled={isRacing}
        aria-label={
          isFinished
            ? "Start another typing race"
            : "Start typing race"
        }
        className="min-h-11 flex-1 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-400 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-950 sm:flex-none"
      >
        {isFinished
          ? "Start Again"
          : isRacing
            ? "Race Running..."
            : "Start Race"}
      </button>

      <button
        type="button"
        onClick={onReset}
        aria-label="Reset current race"
        className="min-h-11 flex-1 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:ring-slate-500 dark:focus:ring-offset-slate-950 sm:flex-none"
      >
        Reset
      </button>
    </div>
  );
}

export default RaceControls;