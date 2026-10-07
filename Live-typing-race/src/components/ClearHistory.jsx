import { useState } from "react";

import { clearRaceHistory } from "../utils/storage";

function ClearHistory({ onHistoryCleared }) {
  const [showConfirmation, setShowConfirmation] =
    useState(false);

  function handleClear() {
    clearRaceHistory();

    setShowConfirmation(false);

    onHistoryCleared();
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {!showConfirmation ? (
        <button
          type="button"
          onClick={() =>
            setShowConfirmation(true)
          }
          className="w-full max-w-md rounded-xl border border-red-200 bg-red-50 p-4 text-center dark:border-red-900 dark:bg-red-950/30" role="alertdialog" aria-label="Confirm clearing race history"
        >
          Clear History
        </button>
      ) : (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center">
          <p className="text-sm font-medium text-red-800">
            Are you sure you want to clear all race
            history?
          </p>

          <div className="mt-3 flex justify-center gap-2">
            <button
              type="button"
              onClick={handleClear}
              className="min-h-11 rounded-xl border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 shadow-sm transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 dark:border-red-900 dark:bg-slate-900 dark:text-red-400 dark:hover:bg-red-950/40 dark:focus:ring-red-800 dark:focus:ring-offset-slate-950"
            >
              Yes, Clear
            </button>

            <button
              type="button"
              onClick={() =>
                setShowConfirmation(false)
              }
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClearHistory;