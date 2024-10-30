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
  PAGE_SIZE_ID,
  SAVE_SETTINGS_BUTTON_ID,
  SETTINGS_GENERAL_LIST_SIDEBAR_ID,
  SETTINGS_LIST_SIDEBAR_ID,
  SUBMISSIONS_SIDEBAR_ID
} from '@/__tests__/integration/helpers/elementsIds'
import { restoreData } from '@/__tests__/integration/helpers/restoreData'
import { login } from '@/__tests__/end-to-end/helpers/login'

// eslint-disable-next-line no-empty-pattern
test.beforeAll(async ({}, testInfo) => {
  await restoreData(testInfo.project.name)
})

test.describe('user settings', () => {
  test('change page size', async ({ page }) => {
    await login(page, 'einstein')
    await page
      .locator(`#${SETTINGS_LIST_SIDEBAR_ID}`)
      .click()
    await page
      .locator(`#${SETTINGS_GENERAL_LIST_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/settings-general')
    await expect(page).toHaveTitle(/RDepot - settings/)
    await page.locator(`#${PAGE_SIZE_ID}`).fill('2')
    await page.locator(`#${PAGE_SIZE_ID}`).press('Tab')
    await page
      .locator(`#${SAVE_SETTINGS_BUTTON_ID}`)
      .click()
    const locator = page.locator(
      `#${SAVE_SETTINGS_BUTTON_ID}`
    )
    await expect(locator).toHaveCount(0)
    await page.locator(`#${SUBMISSIONS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/submissions')
    await expect(page).toHaveTitle(/RDepot - submissions/)
    const pageSizeInput = page.locator(
      '.v-data-table-footer__items-per-page'
    )
    await expect(pageSizeInput).toContainText('2')
  })
})
