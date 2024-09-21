import path from "node:path";
import type { MonocartReporterOptions } from "monocart-reporter";

type ShardedTestRunTime = {
  start: Date;
  end: Date;
};

function calculateTestRunDuration(shardedTestRunTimes: ShardedTestRunTime[]): number {
  if (shardedTestRunTimes.length === 0) {
    return 0;
  }

  // Step 1: Sort the test runs by start date
  shardedTestRunTimes.sort((a, b) => a.start.getTime() - b.start.getTime());

  // Step 2: Merge overlapping intervals
  const mergedDurations: ShardedTestRunTime[] = [];
  let current = shardedTestRunTimes[0];

  for (let i = 1; i < shardedTestRunTimes.length; i++) {
    if (current.end >= shardedTestRunTimes[i].start) {
      // Overlapping intervals, merge them
      current.end = new Date(Math.max(current.end.getTime(), shardedTestRunTimes[i].end.getTime()));
    } else {
      // No overlap, push the current interval and move to the next
      mergedDurations.push(current);
      current = shardedTestRunTimes[i];
    }
  }
  // Push the last interval
  mergedDurations.push(current);

  // Step 3: Calculate the total duration
  let totalDurationInMilliseconds = 0;
  for (const duration of mergedDurations) {
    totalDurationInMilliseconds += duration.end.getTime() - duration.start.getTime();
  }

  return totalDurationInMilliseconds;
}

function formatDuration(milliseconds: number): string {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  seconds %= 60;
  minutes %= 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  return `${minutes}m ${seconds}s`;
}

export function getMonocartReporterOptions(reportersOutputDir: string): MonocartReporterOptions {
  const monocartReporterOutputDir = path.resolve(reportersOutputDir, "monocart-reporter");
  const monocartOptions: MonocartReporterOptions = {
    name: "Demo - use TS for merge CLI config files",
    outputFile: path.resolve(monocartReporterOutputDir, "monocart-report.html"),
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    onData: async (reportData: any, dataList: any) => {
      if (dataList.length === undefined || dataList.length <= 1) {
        return;
      }

      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const shardedTestRunTimes = dataList.map((x: any) => {
        return {
          start: new Date(x.system.timestampStart),
          end: new Date(x.system.timestampEnd),
        };
      });

      const totalDurationInMilliseconds = calculateTestRunDuration(shardedTestRunTimes);
      reportData.durationH = formatDuration(totalDurationInMilliseconds);
      reportData.duration = totalDurationInMilliseconds;
    },
  };

  return monocartOptions;
}
