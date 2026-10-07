function TypingArea({
  passage,
  typedText,
  isRacing,
  isFinished,
  inputRef,
  onTyping,
}) {
 function getCharacterClass(index) {
  if (index >= typedText.length) {
    return "text-gray-400 dark:text-slate-600";
  }

  if (typedText[index] === passage.text[index]) {
    return "rounded bg-green-100 font-medium text-green-700 underline decoration-green-500 decoration-2 underline-offset-2 dark:bg-green-950/60 dark:text-green-300";
  }

  return "rounded bg-red-100 font-medium text-red-700 underline decoration-red-500 decoration-2 underline-offset-2 dark:bg-red-950/60 dark:text-red-300";
}

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white-900">
            Typing Area
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {isFinished
              ? "Race completed!"
              : isRacing
                ? "Type the passage as accurately as possible."
                : "Press Start Race to begin."}
          </p>
        </div>

        <span
          className={`hidden rounded-full px-3 py-1 text-xs font-medium capitalize sm:block ${
            isFinished
              ? "bg-green-100 text-green-700"
              : isRacing
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600"
          }`}
        >
          {isFinished ? "Completed" : isRacing ? "Racing" : "Ready"}
        </span>
      </div>

      <div className="min-w-0 w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-inner dark:border-slate-800 dark:bg-slate-950 sm:p-6">
      
       <p className="min-w-0 max-w-full wrap-break-word whitespace-normal text-base leading-8 sm:text-lg"
       aria-label="Typing passage"
        >
    {passage.text.split("").map((character, index) => (
     <span
      key={`${passage.id}-${index}`}
      className={getCharacterClass(index)}
  >
    {character === " " ? "\u00A0" : character}
  </span>
))}
  </p>

</div>

      <div className="mt-5">
        <label
          htmlFor="typing-input"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Your typing
        </label>

        <textarea
          ref={inputRef}
          id="typing-input"
          value={typedText}
          onChange={(event) => onTyping(event.target.value)}
          disabled={!isRacing || isFinished}
          rows="5"
          placeholder={
            isRacing
              ? "Start typing here..."
              : "Press Start Race to begin..."
          }
          className="min-h-32 w-full resize-none rounded-xl border border-gray-300 bg-white p-4 text-base leading-7 text-gray-900 shadow-sm transition placeholder:text-gray-400 hover:border-gray-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-600 dark:hover:border-slate-600 dark:focus:border-slate-500 dark:focus:ring-slate-800 dark:disabled:bg-slate-800 dark:disabled:text-slate-500"
          aria-label="Typing input"
          aria-disabled={!isRacing || isFinished}
        />
      </div>
    </section>
  );
}

export default TypingArea;