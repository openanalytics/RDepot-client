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

import { test, expect } from '@playwright/test'
import {
  DOWNLOAD_SUBMISSION_FILENAME_ID,
  DOWNLOAD_SUBMISSION_ID,
  SUBMISSIONS_SIDEBAR_ID
} from '@/__tests__/integration/helpers/elementsIds'
import { login } from '@/__tests__/end-to-end/helpers/login'
import { downloadFile } from '@/__tests__/end-to-end/helpers/download'

const TITLE = 'submissions downloading'
test.describe(TITLE, () => {
  test('download submission', async ({ page }) => {
    await login(page, 'einstein')
    await page.locator(`#${SUBMISSIONS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/submissions')
    await expect(page).toHaveTitle(/RDepot - submissions/)
    const submissionRowsSelector = page.locator('role=row')
    await expect(submissionRowsSelector).toHaveCount(21)

    await downloadFile(
      page,
      DOWNLOAD_SUBMISSION_ID,
      DOWNLOAD_SUBMISSION_FILENAME_ID
    )
  })
})
