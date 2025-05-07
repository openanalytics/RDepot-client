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

import { expect, test } from '@playwright/test'
import {
  BINARY_SUBMISSION_CHECKBOX,
  DROP_ZONE_CLASS,
  SUBMISSIONS_FILTRATION_SEARCH_FIELD_ID,
  SUBMISSIONS_LIST_NOTES_ARROW_TESTREPO3_ID,
  SUBMISSIONS_LIST_NOTES_MARKDOWN,
  SUBMISSIONS_SIDEBAR_ID,
  UPLOAD_PACKAGES_SIDEBAR_ID,
  UPLOAD_SUBMISSION_ARCHITECTURE,
  UPLOAD_SUBMISSION_CONTINUE_BUTTON_ID,
  UPLOAD_SUBMISSION_DISTRIBUTION,
  UPLOAD_SUBMISSION_GENERATE_MANUAL_CHECKBOX,
  UPLOAD_SUBMISSION_NOTES_CHECKBOX,
  UPLOAD_SUBMISSION_NOTES_INPUT,
  UPLOAD_SUBMISSION_REPOSITORY_FIELD_ID,
  UPLOAD_SUBMISSION_REPOSITORY_TESTREPO3_ID,
  UPLOAD_SUBMISSION_REPOSITORY_TESTREPO9_ID,
  UPLOAD_SUBMISSION_RVERSION,
  UPLOAD_SUBMISSION_RVERSION_MESSAGES_ID,
  UPLOAD_SUBMISSION_SUCCESS_ICON
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '@/__tests__/end-to-end/helpers/login'
import { i18n } from '@/plugins/i18n'
import { restoreData } from '@/__tests__/end-to-end/helpers/restoreData'

const TITLE = 'packages upload'
test.describe(TITLE, { tag: '@serial' }, () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeAll(async ({}, testInfo) => {
    await restoreData(testInfo.project.name)
  })

  test('upload binary R package', async ({ page }) => {
    await login(page, 'einstein')
    await page
      .locator(`#${UPLOAD_PACKAGES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/upload-packages')
    await expect(page).toHaveTitle(
      /RDepot - upload packages/
    )
    await page
      .locator(`#${UPLOAD_SUBMISSION_REPOSITORY_FIELD_ID}`)
      .click({ force: true })
    await page
      .locator(
        `#${UPLOAD_SUBMISSION_REPOSITORY_TESTREPO3_ID}`
      )
      .click()
    await page
      .locator(`#${UPLOAD_SUBMISSION_CONTINUE_BUTTON_ID}`)
      .click()

    const fileChooserPromise =
      page.waitForEvent('filechooser')
    await page.locator(`.${DROP_ZONE_CLASS}`).click()
    const fileChooser = await fileChooserPromise
    await fileChooser.setFiles(
      './src/__tests__/end-to-end/testData/arrow_8.0.0.tar.gz'
    )
    const generateManual = page.locator(
      `#${UPLOAD_SUBMISSION_GENERATE_MANUAL_CHECKBOX}`
    )
    await expect(generateManual).not.toBeDisabled()

    await page
      .locator(`#${BINARY_SUBMISSION_CHECKBOX}`)
      .click()
    await page
      .locator(`#${UPLOAD_SUBMISSION_RVERSION}`)
      .click({ force: true })
    await page
      .locator(`#${UPLOAD_SUBMISSION_ARCHITECTURE}`)
      .click({ force: true })
    await page
      .locator(`#${UPLOAD_SUBMISSION_RVERSION_MESSAGES_ID}`)
      .waitFor()
    expect(
      await page
        .locator(
          `#${UPLOAD_SUBMISSION_RVERSION_MESSAGES_ID}`
        )
        .innerHTML()
    ).toContain(i18n.t('messages.errors.required'))
    await page
      .locator(`#${UPLOAD_SUBMISSION_RVERSION}`)
      .click({ force: true })
    await page.getByText('4.2').click()
    await page
      .locator(`#${UPLOAD_SUBMISSION_RVERSION_MESSAGES_ID}`)
      .waitFor()
    await page
      .locator(`#${UPLOAD_SUBMISSION_ARCHITECTURE}`)
      .click({ force: true })
    await page.getByText('x86_64').click()
    expect(
      await page
        .locator(
          `#${UPLOAD_SUBMISSION_RVERSION_MESSAGES_ID}`
        )
        .textContent()
    ).not.toContain(i18n.t('messages.errors.required'))
    await page
      .locator(`#${UPLOAD_SUBMISSION_DISTRIBUTION}`)
      .click({ force: true })
    await page.getByText('centos7').click()
    await expect(generateManual).toBeDisabled()

    await page
      .locator(`#${UPLOAD_SUBMISSION_NOTES_CHECKBOX}`)
      .click()

    await page
      .locator(`#${UPLOAD_SUBMISSION_NOTES_INPUT}`)
      .fill('Test notes for upload')

    await page
      .locator(`#${UPLOAD_SUBMISSION_CONTINUE_BUTTON_ID}`)
      .click()
    await expect(
      page.locator(`#${UPLOAD_SUBMISSION_SUCCESS_ICON}`)
    ).toBeVisible()

    await page.locator(`#${SUBMISSIONS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/submissions')
    await expect(page).toHaveTitle(/RDepot - submissions/)

    await page
      .locator(`#${SUBMISSIONS_FILTRATION_SEARCH_FIELD_ID}`)
      .fill('arrow')

    const submissionRowsSelector = page.locator('role=row')
    await expect(submissionRowsSelector).toHaveCount(3)
    const submissionListNotesLocator = page.locator(
      `#${SUBMISSIONS_LIST_NOTES_ARROW_TESTREPO3_ID}`
    )
    await submissionListNotesLocator.waitFor()
    await submissionListNotesLocator.click()

    const notesMarkdown = page.locator(
      `#${SUBMISSIONS_LIST_NOTES_MARKDOWN}`
    )
    await expect(notesMarkdown).toHaveText(
      'Test notes for upload'
    )
  })

  test('upload binary Python package', async ({ page }) => {
    await login(page, 'einstein')
    await page
      .locator(`#${UPLOAD_PACKAGES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/upload-packages')
    await expect(page).toHaveTitle(
      /RDepot - upload packages/
    )
    await page
      .locator(`#${UPLOAD_SUBMISSION_REPOSITORY_FIELD_ID}`)
      .click({ force: true })
    await page
      .locator(
        `#${UPLOAD_SUBMISSION_REPOSITORY_TESTREPO9_ID}`
      )
      .click()
    await page
      .locator(`#${UPLOAD_SUBMISSION_CONTINUE_BUTTON_ID}`)
      .click()

    const fileChooserPromise =
      page.waitForEvent('filechooser')
    await page.locator(`.${DROP_ZONE_CLASS}`).click()
    const fileChooser = await fileChooserPromise
    await fileChooser.setFiles(
      './src/__tests__/end-to-end/testData/tetrapolyscope-0.0.4-cp311-cp311-manylinux_2_17_i686.manylinux2014_i686.whl'
    )
    const generateManual = page.locator(
      `#${UPLOAD_SUBMISSION_GENERATE_MANUAL_CHECKBOX}`
    )
    await expect(generateManual).not.toBeDisabled()

    await page
      .locator(`#${BINARY_SUBMISSION_CHECKBOX}`)
      .click()

    await expect(generateManual).toBeDisabled()

    await page
      .locator(`#${UPLOAD_SUBMISSION_CONTINUE_BUTTON_ID}`)
      .click()
    await expect(
      page.locator(`#${UPLOAD_SUBMISSION_SUCCESS_ICON}`)
    ).toBeVisible()

    await page.locator(`#${SUBMISSIONS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/submissions')
    await expect(page).toHaveTitle(/RDepot - submissions/)

    await page
      .locator(`#${SUBMISSIONS_FILTRATION_SEARCH_FIELD_ID}`)
      .fill('tetrapolyscope')

    const submissionRowsSelector = page.locator('role=row')
    await expect(submissionRowsSelector).toHaveCount(3)
  })
})
