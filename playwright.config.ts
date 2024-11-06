/*
 * R Depot
 *
 * Copyright (C) 2012-2024 Open Analytics NV
 *
 * ===========================================================================
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License as published by
 * The Apache Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Apache License for more details.
 *
 * You should have received a copy of the Apache License
 * along with this program. If not, see <http://www.apache.org/licenses/>
 *
 */
/* eslint-disable indent */

import { defineConfig, devices } from '@playwright/test'
import path from 'path'

const resultsDir = path.resolve('./', 'reports')

export default defineConfig({
  testDir: './src/__tests__/end-to-end',
  /* Run tests in files in parallel */
  fullyParallel: true,
  // Limit the number of workers on CI, use default locally
  workers: process.env.CI ? 2 : undefined,
  // Concise 'dot' for CI, default 'list' when running locally
  reporter: process.env.CI
    ? [
        [
          'junit',
          {
            outputFile: `${resultsDir}/test-report-e2e.xml`
          }
        ]
      ]
    : 'list',
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://192.168.49.20',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    viewport: { width: 1920, height: 1053 },
    colorScheme: 'dark'
  },
  expect: {
    timeout: 10 * 1000
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: 'http://192.168.51.20'
      },
      retries: 1
    },
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        baseURL: 'http://192.168.53.20'
      },
      retries: 1
    }
  ]
})
