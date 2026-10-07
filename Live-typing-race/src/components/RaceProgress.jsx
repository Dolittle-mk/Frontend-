function RaceProgress({
  userProgress,
  userWpm,
  ghostProgress,
  ghostWpm,
  hasGhost,
}) {
  return (
  
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
     <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
       Race Progress
       </h2>

      <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
         Start a race to see your live performance.
       </p>

      {hasGhost ? (
        <div className="mt-5 space-y-5">
          {/* YOU */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold tracking-wide text-gray-950 dark:text-white">
                  YOU
                </p>

                <p className="text-xs text-gray-500 dark:text-slate-400">
                  {userWpm.toFixed(1)} WPM
                </p>
              </div>

              <span className="text-sm font-medium text-gray-700">
                {userProgress.toFixed(0)}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-slate-900 transition-[width] duration-300 dark:bg-slate-200"
                style={{
                  width: `${userProgress}%`,
                }}
              />
            </div>
          </div>

          {/* GHOST */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold tracking-wide text-gray-700 dark:text-slate-200">
                  GHOST
                </p>

                <p className="text-xs text-gray-500 dark:text-slate-400">
                  {ghostWpm.toFixed(1)} WPM
                </p>
              </div>

              <span className="text-sm font-medium text-gray-700">
                {ghostProgress.toFixed(0)}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-slate-500 transition-[width] duration-300 dark:bg-slate-400"
                style={{
                  width: `${ghostProgress}%`,
                }}
              />
            </div>
          </div>
        </div>
      ) : (
       <div className="mt-5 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center dark:border-slate-700 dark:bg-slate-950">
  <div
    className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-600 dark:bg-slate-800 dark:text-slate-300"
    aria-hidden="true"
  >
    —
  </div>
  <p className="mt-3 text-sm font-medium text-gray-700 dark:text-slate-200">
    No ghost available yet
  </p>
  <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-gray-500 dark:text-slate-400">
    Complete your first race to create your previous-best ghost.
  </p>
</div>
      )}
    </section>
  );
}

export default RaceProgress;