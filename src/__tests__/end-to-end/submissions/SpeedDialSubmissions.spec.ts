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
  CANCEL_BUTTON_ID,
  DOWNLOAD_SUBMISSION_FILENAME_REQUESTS_ID,
  SUBMISSIONS_LIST_ACTIONS_A3_091_TESTREPO4_ID,
  SUBMISSIONS_LIST_ACTIONS_ABC_10_TESTREPO4_ID,
  SUBMISSIONS_LIST_ACTIONS_BENCHMARKING_010_TESTREPO4_ID,
  SUBMISSIONS_LIST_ACTIONS_REQUESTS_2191_TESTREPO8_ID,
  SUBMISSIONS_LIST_ACTIONS_REQUESTS_2281_TESTREPO8_ID,
  SUBMISSIONS_LIST_ACTIONS_USL_200_TESTREPO2_ID,
  SUBMISSIONS_LIST_ACTIONS_VISDAT_010_TESTREPO2_ID,
  SUBMISSIONS_LIST_ACTIONS_WHEEL_0380_TESTREPO10_ID,
  SUBMISSIONS_LIST_MODAL_ID,
  SUBMISSIONS_LIST_SELECT_ALL_ID,
  SUBMISSIONS_MULTI_ACCEPT_ID,
  SUBMISSIONS_MULTI_ACTIONS_ID,
  SUBMISSIONS_MULTI_CANCEL_ID,
  SUBMISSIONS_MULTI_DOWNLOAD_ID,
  SUBMISSIONS_MULTI_REJECT_ID,
  SUBMISSIONS_SIDEBAR_ID,
  SUBMIT_BUTTON_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'
import { restoreData } from '@/__tests__/end-to-end/helpers/restoreData'

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
    const submissionRowsSelector = page.locator('role=row')
    await expect(submissionRowsSelector).toHaveCount(21)

    await page
      .locator(`#${SUBMISSIONS_LIST_SELECT_ALL_ID}`)
      .click()

    await page
      .locator(`#${SUBMISSIONS_MULTI_ACTIONS_ID}`)
      .click()

    const multiAcceptSelector = page.locator(
      `#${SUBMISSIONS_MULTI_ACCEPT_ID}`
    )
    await multiAcceptSelector.waitFor()

    await page
      .locator(`#${SUBMISSIONS_MULTI_ACCEPT_ID}`)
      .click()

    const acceptSubmissionsModalSelector = page.locator(
      `#${SUBMISSIONS_LIST_MODAL_ID}`
    )
    await acceptSubmissionsModalSelector.waitFor()

    const submissionTitleSelector = page.locator(
      'css=.v-card .v-list-item-title'
    )
    await expect(submissionTitleSelector).toHaveCount(20)

    await page.locator(`#${CANCEL_BUTTON_ID}`).click()
    await page
      .locator(
        `#${SUBMISSIONS_LIST_ACTIONS_BENCHMARKING_010_TESTREPO4_ID}`
      )
      .click()

    await page
      .locator(`#${SUBMISSIONS_MULTI_ACTIONS_ID}`)
      .click()

    await multiAcceptSelector.waitFor()

    await page
      .locator(`#${SUBMISSIONS_MULTI_ACCEPT_ID}`)
      .click()

    await acceptSubmissionsModalSelector.waitFor()

    await expect(submissionTitleSelector).toHaveCount(19)
    await page.locator(`#${CANCEL_BUTTON_ID}`).click()
    await page
      .locator(`#${SUBMISSIONS_LIST_SELECT_ALL_ID}`)
      .click()

    await page
      .locator(`#${SUBMISSIONS_LIST_SELECT_ALL_ID}`)
      .click()
    await page.locator('css=.mdi-chevron-right').click()
    await expect(submissionRowsSelector).toHaveCount(21)
    await page.locator('css=.mdi-chevron-right').click()
    await expect(submissionRowsSelector).toHaveCount(3)
    await page
      .locator(`#${SUBMISSIONS_LIST_SELECT_ALL_ID}`)
      .click()
    await page
      .locator(`#${SUBMISSIONS_MULTI_ACTIONS_ID}`)
      .click()
    await multiAcceptSelector.waitFor()
    await page
      .locator(`#${SUBMISSIONS_MULTI_ACCEPT_ID}`)
      .click()
    await acceptSubmissionsModalSelector.waitFor()
    await expect(submissionTitleSelector).toHaveCount(2)
    await page.locator(`#${CANCEL_BUTTON_ID}`).click()
  })

  test('disable the speed dial options when no submission is chosen', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page.locator(`#${SUBMISSIONS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/submissions')
    await expect(page).toHaveTitle(/RDepot - submissions/)

    const submissionRowsSelector = page.locator('role=row')
    await expect(submissionRowsSelector).toHaveCount(21)

    const speedDialOptionSelector = page.locator(
      `#${SUBMISSIONS_MULTI_REJECT_ID}`
    )

    await page
      .locator(`#${SUBMISSIONS_MULTI_ACTIONS_ID}`)
      .click()
    await speedDialOptionSelector.waitFor()

    const acceptLocator = page.locator(
      `#${SUBMISSIONS_MULTI_ACCEPT_ID}`
    )
    const rejectLocator = page.locator(
      `#${SUBMISSIONS_MULTI_REJECT_ID}`
    )
    const cancelLocator = page.locator(
      `#${SUBMISSIONS_MULTI_CANCEL_ID}`
    )
    await expect(acceptLocator).toBeDisabled()
    await expect(rejectLocator).toBeDisabled()
    await expect(cancelLocator).toBeDisabled()
  })

  test('disable submit button when none submissions is available', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page.locator(`#${SUBMISSIONS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/submissions')
    await expect(page).toHaveTitle(/RDepot - submissions/)

    const submissionRowsSelector = page.locator('role=row')
    await expect(submissionRowsSelector).toHaveCount(21)

    const speedDialModalSelector = page.locator(
      `#${SUBMISSIONS_LIST_MODAL_ID}`
    )
    const speedDialOptionSelector = page.locator(
      `#${SUBMISSIONS_MULTI_ACCEPT_ID}`
    )

    await page
      .locator(
        `#${SUBMISSIONS_LIST_ACTIONS_WHEEL_0380_TESTREPO10_ID}`
      )
      .click()
    await page
      .locator(`#${SUBMISSIONS_MULTI_ACTIONS_ID}`)
      .click()

    await speedDialOptionSelector.waitFor()
    await page
      .locator(`#${SUBMISSIONS_MULTI_ACCEPT_ID}`)
      .click()

    await speedDialModalSelector.waitFor()

    const submitButtonLocator = page.locator(
      `#${SUBMIT_BUTTON_ID}`
    )
    await expect(submitButtonLocator).toHaveClass(
      /text-grey/
    )
  })

  test('download a few waiting submission', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page.locator(`#${SUBMISSIONS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/submissions')
    await expect(page).toHaveTitle(/RDepot - submissions/)
    const submissionRowsSelector = page.locator('role=row')
    await expect(submissionRowsSelector).toHaveCount(21)
    const sortByStateIcon = await page.locator(
      'tr > th:nth-child(8) > div > i'
    )
    await sortByStateIcon.click()
    await sortByStateIcon.click()
    await page
      .locator(
        `#${SUBMISSIONS_LIST_ACTIONS_BENCHMARKING_010_TESTREPO4_ID}`
      )
      .click()
    await page
      .locator(
        `#${SUBMISSIONS_LIST_ACTIONS_REQUESTS_2191_TESTREPO8_ID}`
      )
      .click()
    await page
      .locator(
        `#${SUBMISSIONS_LIST_ACTIONS_USL_200_TESTREPO2_ID}`
      )
      .click()
    await page
      .locator(`#${SUBMISSIONS_MULTI_ACTIONS_ID}`)
      .click()
    const multiDownloadButtonSelector = page.locator(
      `#${SUBMISSIONS_MULTI_DOWNLOAD_ID}`
    )
    await multiDownloadButtonSelector.waitFor()
    await multiDownloadButtonSelector.click()

    const downloadSubmissionsModal = page.locator(
      `#${SUBMISSIONS_LIST_MODAL_ID}`
    )
    await downloadSubmissionsModal.waitFor()

    const submissionsToDownloadLocator = page.locator(
      `#${SUBMISSIONS_LIST_MODAL_ID} .v-list-item-title`
    )

    await expect(submissionsToDownloadLocator).toHaveCount(
      3
    )
    await page.locator(`#${SUBMIT_BUTTON_ID}`).click()
    await expect(submissionsToDownloadLocator).toHaveCount(
      0
    )
    const downloadLinkLocator = page.locator(
      `xpath=//a[@download="${DOWNLOAD_SUBMISSION_FILENAME_REQUESTS_ID}"]`
    )
    await expect(downloadLinkLocator).toHaveCount(1)
  })
})

const TITLE_SERIAL = 'submissions multi actions serial'
test.describe(TITLE_SERIAL, { tag: '@serial' }, () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeAll(async ({}, testInfo) => {
    await restoreData(testInfo.project.name)
  })

  test('reject a few submissions using speed dial', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page.locator(`#${SUBMISSIONS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/submissions')
    await expect(page).toHaveTitle(/RDepot - submissions/)

    const submissionRowsSelector = page.locator('role=row')
    await expect(submissionRowsSelector).toHaveCount(21)

    const speedDialModalSelector = page.locator(
      `#${SUBMISSIONS_LIST_MODAL_ID}`
    )
    const speedDialOptionSelector = page.locator(
      `#${SUBMISSIONS_MULTI_REJECT_ID}`
    )
    const sortByStateIcon = await page.locator(
      'tr > th:nth-child(8) > div > i'
    )
    await sortByStateIcon.click()
    await sortByStateIcon.click()
    await page
      .locator(
        `#${SUBMISSIONS_LIST_ACTIONS_VISDAT_010_TESTREPO2_ID}`
      )
      .click()
    await page
      .locator(
        `#${SUBMISSIONS_LIST_ACTIONS_REQUESTS_2191_TESTREPO8_ID}`
      )
      .click()

    await page
      .locator(`#${SUBMISSIONS_MULTI_ACTIONS_ID}`)
      .click()

    await speedDialOptionSelector.waitFor()
    await page
      .locator(`#${SUBMISSIONS_MULTI_REJECT_ID}`)
      .click()

    await speedDialModalSelector.waitFor()
    await page.locator(`#${SUBMIT_BUTTON_ID}`).click()
  })

  test('cancel a few submissions using speed dial', async ({
    page
  }) => {
    await login(page, 'galieleo')
    await page.locator(`#${SUBMISSIONS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/submissions')
    await expect(page).toHaveTitle(/RDepot - submissions/)

    const submissionRowsSelector = page.locator('role=row')
    await expect(submissionRowsSelector).toHaveCount(11)

    const speedDialModalSelector = page.locator(
      `#${SUBMISSIONS_LIST_MODAL_ID}`
    )
    const speedDialOptionSelector = page.locator(
      `#${SUBMISSIONS_MULTI_CANCEL_ID}`
    )
    const sortByStateIcon = await page.locator(
      'tr > th:nth-child(8) > div > i'
    )
    await sortByStateIcon.click()
    await sortByStateIcon.click()
    await page
      .locator(
        `#${SUBMISSIONS_LIST_ACTIONS_A3_091_TESTREPO4_ID}`
      )
      .click()
    await page
      .locator(
        `#${SUBMISSIONS_LIST_ACTIONS_ABC_10_TESTREPO4_ID}`
      )
      .click()
    await page
      .locator(`#${SUBMISSIONS_MULTI_ACTIONS_ID}`)
      .click()

    await speedDialOptionSelector.waitFor()
    await page
      .locator(`#${SUBMISSIONS_MULTI_CANCEL_ID}`)
      .click()

    await speedDialModalSelector.waitFor()
    await page.locator(`#${SUBMIT_BUTTON_ID}`).click()
  })

  test('accept a few submissions using speed dial', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page.locator(`#${SUBMISSIONS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/submissions')
    await expect(page).toHaveTitle(/RDepot - submissions/)

    const submissionRowsSelector = page.locator('role=row')
    await expect(submissionRowsSelector).toHaveCount(21)

    const speedDialModalSelector = page.locator(
      `#${SUBMISSIONS_LIST_MODAL_ID}`
    )
    const speedDialOptionSelector = page.locator(
      `#${SUBMISSIONS_MULTI_ACCEPT_ID}`
    )
    const sortByStateIcon = await page.locator(
      'tr > th:nth-child(8) > div > i'
    )
    await sortByStateIcon.click()
    await sortByStateIcon.click()
    await page
      .locator(
        `#${SUBMISSIONS_LIST_ACTIONS_REQUESTS_2281_TESTREPO8_ID}`
      )
      .click()
    await page
      .locator(
        `#${SUBMISSIONS_LIST_ACTIONS_BENCHMARKING_010_TESTREPO4_ID}`
      )
      .click()
    await page
      .locator(`#${SUBMISSIONS_MULTI_ACTIONS_ID}`)
      .click()

    await speedDialOptionSelector.waitFor()
    await page
      .locator(`#${SUBMISSIONS_MULTI_ACCEPT_ID}`)
      .click()

    await speedDialModalSelector.waitFor()
    await page.locator(`#${SUBMIT_BUTTON_ID}`).click()
  })
})
