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
  REPOSITORIES_SIDEBAR_ID,
  REPUBLISH_REPOSITORY_TESTREPO2_ICON_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'
import { restoreData } from '@/__tests__/end-to-end/helpers/restoreData'

// eslint-disable-next-line no-empty-pattern
test.beforeAll(async ({}, testInfo) => {
  await restoreData(testInfo.project.name)
})

const TITLE = 'repositories republish'
test.describe(TITLE, { tag: '@serial' }, () => {
  test('republish R repository', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')
    await expect(page).toHaveTitle(/RDepot - repositories/)

    const repositoriesRowsSelector =
      page.locator('role=row')
    await expect(repositoriesRowsSelector).toHaveCount(8)

    await page
      .locator(`#${REPUBLISH_REPOSITORY_TESTREPO2_ICON_ID}`)
      .click()
    await page.locator('button:has-text("Submit")').click()

    await expect(
      await page.locator('button:has-text("Submit")')
    ).toHaveCount(0)
    await expect(
      await page.locator('.v-progress-circular__overlay')
    ).toHaveCount(1)
    const toasts = await page
      .locator('.Toastify__toast-body ')
      .allTextContents()

    await expect(toasts[1]).toContain(
      'Request processed successfully'
    )
  })
})
