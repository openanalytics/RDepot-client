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

import { test, expect } from '@playwright/test'
import {
  SUBMISSIONS_SIDEBAR_ID,
  REPOSITORIES_SIDEBAR_ID,
  UPLOAD_PACKAGE_BUTTON_ID,
  UPLOAD_PACKAGE_REPOSITORY_TESTREPO2_ICON_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'

const TITLE = 'upload package button'
test.describe(TITLE, () => {
  test('should be visible on packages page', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page.waitForURL('**/packages')

    const uploadButton = page.locator(
      `#${UPLOAD_PACKAGE_BUTTON_ID}`
    )
    await expect(uploadButton).toBeVisible()
    await expect(uploadButton).toBeEnabled()
  })

  test('should be visible on submissions page', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page.locator(`#${SUBMISSIONS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/submissions')
    await expect(page).toHaveTitle(/RDepot - submissions/)

    const uploadButton = page.locator(
      `#${UPLOAD_PACKAGE_BUTTON_ID}`
    )
    await expect(uploadButton).toBeVisible()
    await expect(uploadButton).toBeEnabled()
  })

  test('should navigate to upload packages from packages page', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page.waitForURL('**/packages')

    await page
      .locator(`#${UPLOAD_PACKAGE_BUTTON_ID}`)
      .click()
    await page.waitForURL('**/upload-packages')
    await expect(page).toHaveTitle(
      /RDepot - upload packages/
    )
  })

  test('should navigate to upload packages from submissions page', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page.locator(`#${SUBMISSIONS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/submissions')

    await page
      .locator(`#${UPLOAD_PACKAGE_BUTTON_ID}`)
      .click()
    await page.waitForURL('**/upload-packages')
    await expect(page).toHaveTitle(
      /RDepot - upload packages/
    )
  })

  test('should navigate to upload packages from repository action with preselected repository', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')
    await expect(page).toHaveTitle(/RDepot - repositories/)

    await page
      .locator(
        `#${UPLOAD_PACKAGE_REPOSITORY_TESTREPO2_ICON_ID}`
      )
      .click()
    await page.waitForURL('**/upload-packages')
    await expect(page).toHaveTitle(
      /RDepot - upload packages/
    )

    const repositoryName = page.locator('#repository-name')
    await expect(repositoryName).toHaveText('testrepo2')

    const stepTitle = page.locator('.text-h5')
    await expect(stepTitle).toContainText('R')
  })
})
