import { useEffect, useState } from "react";
import { getRaceResults } from "../utils/storage";

function RaceHistory({ historyVersion = 0 }) {
  const [races, setRaces] = useState([]);
  const [sortBy, setSortBy] = useState("recent");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  useEffect(() => {
    setRaces(getRaceResults());
  }, [historyVersion]);

  const filteredRaces = races.filter((race) => {
    if (difficultyFilter === "all") {
      return true;
    }

    return race.difficulty === difficultyFilter;
  });

  const sortedRaces = [...filteredRaces].sort((a, b) => {
    if (sortBy === "wpm") {
      return (b.wpm || 0) - (a.wpm || 0);
    }

    return (
      new Date(b.completionTime) -
      new Date(a.completionTime)
    );
  });

  function formatDate(date) {
    if (!date) {
      return "--";
    }

    return new Date(date).toLocaleString();
  }

  if (races.length === 0) {
    return (
      <section className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Race History
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Complete a race to see your results here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Race History
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Review your previous typing races.
          </p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label
              htmlFor="history-sort"
              className="mb-1 block text-xs font-medium text-gray-500"
            >
              Sort by
            </label>

            <select
              id="history-sort"
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value)
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
            >
              <option value="recent">
                Most Recent
              </option>

              <option value="wpm">
                Best WPM
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="history-difficulty"
              className="mb-1 block text-xs font-medium text-gray-500"
            >
              Difficulty
            </label>

            <select
              id="history-difficulty"
              value={difficultyFilter}
              onChange={(event) =>
                setDifficultyFilter(event.target.value)
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
      </div>

      {/* Desktop table */}
      <div className="mt-6 hidden overflow-x-auto md:block">
        <table className="w-full min-w-700px border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-left dark:border-slate-800">
              <th className="px-4 py-4 text-sm text-gray-600 dark:text-slate-300">
                Date
              </th>

              <th className="px-4 py-4 text-sm text-gray-600 dark:text-slate-300">
                WPM
              </th>

              <th className="px-4 py-4 text-sm text-gray-600 dark:text-slate-300">
                Accuracy
              </th>

              <th className="px-4 py-4 text-sm text-gray-600 dark:text-slate-300">
                Mistakes
              </th>

              <th className="px-4 py-4 text-sm text-gray-600 dark:text-slate-300">
                Duration
              </th>

              <th className="px-4 py-4 text-sm text-gray-600 dark:text-slate-300">
                Difficulty
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedRaces.map((race, index) => (
              <tr
                key={`${race.completionTime}-${index}`}
                className="border-b border-gray-200 text-left dark:border-slate-800"
              >
                <td className="px-4 py-4 text-sm text-gray-600 dark:text-slate-300">
                  {formatDate(race.completionTime)}
                </td>

                <td className="px-4 py-4 text-sm text-gray-600 dark:text-slate-300">
                  {(race.wpm || 0).toFixed(1)}
                </td>

                <td className="px-4 py-4 text-sm text-gray-600 dark:text-slate-300">
                  {(race.accuracy || 0).toFixed(1)}%
                </td>

                <td className="px-4 py-4 text-sm text-gray-600 dark:text-slate-300">
                  {race.mistakes || 0}
                </td>

                <td className="px-4 py-4 text-sm text-gray-600 dark:text-slate-300">
                  {race.duration || 0}s
                </td>

                <td className="px-4 py-4 text-sm text-gray-600 dark:text-slate-300">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700">
                    {race.difficulty || "--"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="mt-6 space-y-3 md:hidden">
        {sortedRaces.map((race, index) => (
          <div
            key={`${race.completionTime}-${index}`}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-gray-500">
                  Date
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {formatDate(race.completionTime)}
                </p>
              </div>

              <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold capitalize text-gray-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {race.difficulty || "--"}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <p className="px-4 py-4 text-sm font-bold tabular-nums text-gray-950 dark:text-white">
                  WPM
                </p>

                <p className="mt-1 text-lg font-bold text-gray-900">
                  {(race.wpm || 0).toFixed(1)}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Accuracy
                </p>

                <p className="mt-1 text-lg font-bold text-gray-900">
                  {(race.accuracy || 0).toFixed(1)}%
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Mistakes
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {race.mistakes || 0}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Duration
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {race.duration || 0}s
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No results after filtering */}
      {sortedRaces.length === 0 && (
        <div className="mt-6 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
          <p className="text-sm text-gray-600">
            No races match the selected difficulty.
          </p>
        </div>
      )}
    </section>
  );
}

export default RaceHistory;

