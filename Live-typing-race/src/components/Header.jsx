import { getBestWPM } from "../utils/storage";
import ThemeToggle from "./ThemeToggle";

function Header({ historyVersion }) {
  const bestWPM = getBestWPM();

  return (
    <header className="border-b border-gray-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold tracking-tight text-gray-950 sm:text-xl dark:text-white">
            Live Typing Race
          </h1>

          <p className="mt-1 max-w-md text-xs leading-5 text-gray-500 sm:text-sm dark:text-slate-400">
            Race against your previous best performance.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-500">
              Best WPM
            </p>

            <p className="text-lg font-bold tabular-nums text-gray-950 dark:text-white">
              {bestWPM.toFixed(1)}
            </p>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;