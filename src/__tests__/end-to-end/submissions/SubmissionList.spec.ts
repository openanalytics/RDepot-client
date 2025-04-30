/*
 * R Depot
 *
 * Copyright (C) 2012-2025 Open Analytics NV
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
  COMMENT_SUBMISSION_ID,
  SUBMISSIONS_SIDEBAR_ID,
  SUBMISSIONS_LIST_NOT_ACCEPTED_GOTO_ID,
  SUBMISSIONS_LIST_ACCEPTED_PACKAGE_GOTO_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'

const TITLE = 'submissions multi actions'
test.describe(TITLE, () => {
  test('select and unselect', async ({ page }) => {
    await login(page, 'einstein')
    await page.locator(`#${SUBMISSIONS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/submissions')
    await expect(page).toHaveTitle(/RDepot - submissions/)
    const sortByStateIcon = await page.locator(
      'tr > th:nth-child(8) > div > i'
    )
    await sortByStateIcon.click()
    await sortByStateIcon.click()
    await page.locator(`#${COMMENT_SUBMISSION_ID}`).click()

    const submissionsNotesSelector = page.getByText(
      'There are no notes listed for this submission'
    )
    await expect(submissionsNotesSelector).toHaveCount(1)
  })

  test('do nothing for unaccepted submission', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page.locator(`#${SUBMISSIONS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/submissions')
    await expect(page).toHaveTitle(/RDepot - submissions/)

    const goToSubmissionButton = page.locator(
      `#${SUBMISSIONS_LIST_NOT_ACCEPTED_GOTO_ID}`
    )
    await goToSubmissionButton.waitFor()
    await goToSubmissionButton.click()

    await expect(page).not.toHaveTitle(
      /RDepot - package details/
    )
  })

  test('go to package details for accepted', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page.locator(`#${SUBMISSIONS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/submissions')
    await expect(page).toHaveTitle(/RDepot - submissions/)
    const sortByStateIcon = await page.locator(
      'tr > th:nth-child(8) > div > i'
    )
    await sortByStateIcon.click()
    await sortByStateIcon.click()
    const goToSubmissionButton = page.locator(
      `#${SUBMISSIONS_LIST_ACCEPTED_PACKAGE_GOTO_ID}`
    )
    await goToSubmissionButton.waitFor()
    await goToSubmissionButton.click()

    await expect(page).toHaveTitle(
      /RDepot - package details/
    )
  })
})
