/*
 * R Depot
 *
 * Copyright (C) 2012-2026 Open Analytics NV
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
  UPLOAD_PACKAGES_SIDEBAR_ID,
  UPLOAD_SUBMISSION_APPROVAL_ALERT_ID,
  UPLOAD_SUBMISSION_REPOSITORY_FIELD_ID,
  UPLOAD_SUBMISSION_REPOSITORY_TESTREPO1_ID,
  UPLOAD_SUBMISSION_REPOSITORY_TESTREPO3_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '@/__tests__/end-to-end/helpers/login'
import { restoreData } from '@/__tests__/end-to-end/helpers/restoreData'

const TITLE = 'upload submission approval alert'
const AUTO_APPROVED_ALERT_CLASS = /text-success/
const NEEDS_APPROVAL_ALERT_CLASS = /text-info/
test.describe(TITLE, { tag: '@serial' }, () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeAll(async ({}, testInfo) => {
    await restoreData(testInfo.project.name)
  })

  test('alert is not visible when no repository is selected', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page
      .locator(`#${UPLOAD_PACKAGES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/upload-packages')
    await expect(
      page.locator(
        `#${UPLOAD_SUBMISSION_APPROVAL_ALERT_ID}`
      )
    ).not.toBeVisible()
  })

  test('admin sees auto-approved alert for any repository', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page
      .locator(`#${UPLOAD_PACKAGES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/upload-packages')
    await page
      .locator(`#${UPLOAD_SUBMISSION_REPOSITORY_FIELD_ID}`)
      .click({ force: true })
    await page
      .locator(
        `#${UPLOAD_SUBMISSION_REPOSITORY_TESTREPO3_ID}`
      )
      .click()
    const alert = page.locator(
      `#${UPLOAD_SUBMISSION_APPROVAL_ALERT_ID}`
    )
    await expect(alert).toBeVisible()
    await expect(alert).toHaveClass(
      AUTO_APPROVED_ALERT_CLASS
    )
  })

  test('repository maintainer sees auto-approved alert for maintained repository', async ({
    page
  }) => {
    await login(page, 'tesla')
    await page
      .locator(`#${UPLOAD_PACKAGES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/upload-packages')
    await page
      .locator(`#${UPLOAD_SUBMISSION_REPOSITORY_FIELD_ID}`)
      .click({ force: true })
    await page
      .locator(
        `#${UPLOAD_SUBMISSION_REPOSITORY_TESTREPO1_ID}`
      )
      .click()
    const alert = page.locator(
      `#${UPLOAD_SUBMISSION_APPROVAL_ALERT_ID}`
    )
    await expect(alert).toBeVisible()
    await expect(alert).toHaveClass(
      AUTO_APPROVED_ALERT_CLASS
    )
  })

  test('repository maintainer sees needs-approval alert for non-maintained repository', async ({
    page
  }) => {
    await login(page, 'tesla')
    await page
      .locator(`#${UPLOAD_PACKAGES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/upload-packages')
    await page
      .locator(`#${UPLOAD_SUBMISSION_REPOSITORY_FIELD_ID}`)
      .click({ force: true })
    await page
      .locator(
        `#${UPLOAD_SUBMISSION_REPOSITORY_TESTREPO3_ID}`
      )
      .click()
    const alert = page.locator(
      `#${UPLOAD_SUBMISSION_APPROVAL_ALERT_ID}`
    )
    await expect(alert).toBeVisible()
    await expect(alert).toHaveClass(
      NEEDS_APPROVAL_ALERT_CLASS
    )
  })

  test('regular user sees needs-approval alert', async ({
    page
  }) => {
    await login(page, 'galieleo')
    await page
      .locator(`#${UPLOAD_PACKAGES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/upload-packages')
    await page
      .locator(`#${UPLOAD_SUBMISSION_REPOSITORY_FIELD_ID}`)
      .click({ force: true })
    await page
      .locator(
        `#${UPLOAD_SUBMISSION_REPOSITORY_TESTREPO3_ID}`
      )
      .click()
    const alert = page.locator(
      `#${UPLOAD_SUBMISSION_APPROVAL_ALERT_ID}`
    )
    await expect(alert).toBeVisible()
    await expect(alert).toHaveClass(
      NEEDS_APPROVAL_ALERT_CLASS
    )
  })
})
