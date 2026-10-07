import { calculateWPM } from "../utils/typingStats";


import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function PerformanceChart({
  userPerformance,
  ghostPerformance,
}) {
  const hasUserData = userPerformance.length > 0;
  const hasGhostData = ghostPerformance.length > 0;

  if (!hasUserData && !hasGhostData) {
    return null;
  }

  const chartData = [];

  const userMap = new Map(
    userPerformance.map((point) => [
      point.time,
      point.wpm,
    ])
  );

const ghostMap = new Map(
  ghostPerformance.map((point) => [
    point.time,
    calculateWPM(
      point.characters,
      point.time
    ),
  ])
);

  const allTimes = new Set([
    ...userPerformance.map(
      (point) => point.time
    ),
    ...ghostPerformance.map(
      (point) => point.time
    ),
  ]);

  [...allTimes]
    .sort((a, b) => a - b)
    .forEach((time) => {
      chartData.push({
        time,
        userWpm: userMap.get(time) ?? null,
        ghostWpm: ghostMap.get(time) ?? null,
      });
    });

  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="mb-5">
          <h2 className="text-lg font-semibold tracking-tight text-gray-950 dark:text-white">
           WPM Performance
          </h2>

          <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-slate-400">
            Your typing speed over time
           {hasGhostData
      ? " compared with your previous best."
      : "."}
  </p>
</div>

      <div className="h-64 min-w-0 w-full sm:h-72">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 10,
              left: -10,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

           <XAxis
             dataKey="time"
             tick={{ fontSize: 12 }}
             tickFormatter={(value) => `${value}s`}
             minTickGap={20}
            />

           <YAxis
           tick={{ fontSize: 12 }}
           width={40}
           allowDecimals={false}
            />

            <Tooltip
              formatter={(value, name) => {
                if (name === "userWpm") {
                  return [
                    `${Number(value).toFixed(1)} WPM`,
                    "YOU",
                  ];
                }

                return [
                  `${Number(value).toFixed(1)} WPM`,
                  "GHOST",
                ];
              }}
              labelFormatter={(value) =>
                `Time: ${value}s`
              }
            />

            <Line
              type="monotone"
              dataKey="userWpm"
              name="YOU"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />

            {hasGhostData && (
              <Line
                type="monotone"
                dataKey="ghostWpm"
                name="GHOST"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                activeDot={{ r: 4 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-gray-900" />
          <span>YOU</span>
        </div>

        {hasGhostData && (
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-gray-500" />
            <span>GHOST</span>
          </div>
        )}
      </div>
    </section>
  );
}

export default PerformanceChart;