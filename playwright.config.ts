import { defineConfig, devices } from '@playwright/test';
import { reportersOutputDir, testsDir } from './playwright.shared-vars';
import { getMonocartReporterOptions } from './playwright.monocart-reporter-options';

export default defineConfig({
  testDir: testsDir,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    [
      "monocart-reporter",
      getMonocartReporterOptions(reportersOutputDir),
    ],
  ],
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
