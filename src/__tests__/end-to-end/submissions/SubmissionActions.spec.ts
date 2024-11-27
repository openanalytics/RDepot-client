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
  SUBMISSIONS_FILTRATION_SEARCH_FIELD_ID,
  SUBMISSIONS_SIDEBAR_ID,
  WAITING_FOR_APPROVE_SUBMISSION_ID,
  WAITING_FOR_CANCEL_SUBMISSION_ID,
  WAITING_FOR_REJECT_SUBMISSION_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'
import { restoreData } from '@/__tests__/end-to-end/helpers/restoreData'
import { downloadFile } from '../helpers/download'

const TITLE = 'submissions actions'
test.describe(TITLE, { tag: '@serial' }, () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeAll(async ({}, testInfo) => {
    await restoreData(testInfo.project.name)
  })
  test('accept', async ({ page }) => {
    await login(page, 'einstein')
    await page.locator(`#${SUBMISSIONS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/submissions')

    const acceptSubmissionButton = page.locator(
      `#${WAITING_FOR_APPROVE_SUBMISSION_ID}`
    )
    await acceptSubmissionButton.waitFor()
    await acceptSubmissionButton.click()

    const searchFieldLocator = page.locator(
      `#${SUBMISSIONS_FILTRATION_SEARCH_FIELD_ID}`
    )
    await searchFieldLocator.waitFor()
    await searchFieldLocator.fill('visdat')

    await expect(acceptSubmissionButton).toHaveCount(0)

    const downloadSubmissionButton = page.locator(
      `#${DOWNLOAD_SUBMISSION_ID}`
    )
    await downloadSubmissionButton.waitFor()
    await expect(downloadSubmissionButton).toHaveCount(1)
  })

  test('download accepted submission', async ({ page }) => {
    await login(page, 'einstein')
    await page.locator(`#${SUBMISSIONS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/submissions')

    const searchFieldLocator = page.locator(
      `#${SUBMISSIONS_FILTRATION_SEARCH_FIELD_ID}`
    )
    await searchFieldLocator.waitFor()
    await searchFieldLocator.fill('visdat')

    const downloadSubmissionButton = page.locator(
      `#${DOWNLOAD_SUBMISSION_ID}`
    )
    await downloadSubmissionButton.waitFor()
    await downloadFile(
      page,
      DOWNLOAD_SUBMISSION_ID,
      DOWNLOAD_SUBMISSION_FILENAME_ID
    )
  })
  test('reject', async ({ page }) => {
    await login(page, 'einstein')
    await page.locator(`#${SUBMISSIONS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/submissions')

    const rejectSubmissionButton = page.locator(
      `#${WAITING_FOR_REJECT_SUBMISSION_ID}`
    )
    await rejectSubmissionButton.waitFor()
    await rejectSubmissionButton.click()

    const searchFieldLocator = page.locator(
      `#${SUBMISSIONS_FILTRATION_SEARCH_FIELD_ID}`
    )
    await searchFieldLocator.waitFor()
    await searchFieldLocator.fill('requests')

    await expect(rejectSubmissionButton).toHaveCount(0)
  })

  test('cancel', async ({ page }) => {
    await login(page, 'newton')
    await page.locator(`#${SUBMISSIONS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/submissions')

    const cancelSubmissionButton = page.locator(
      `#${WAITING_FOR_CANCEL_SUBMISSION_ID}`
    )
    await cancelSubmissionButton.waitFor()
    await cancelSubmissionButton.click()

    const searchFieldLocator = page.locator(
      `#${SUBMISSIONS_FILTRATION_SEARCH_FIELD_ID}`
    )
    await searchFieldLocator.waitFor()
    await searchFieldLocator.fill('requests')

    await expect(cancelSubmissionButton).toHaveCount(0)
  })
})
