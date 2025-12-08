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
  COPY_ADMIN_EMAIL_BUTTON_ID,
  ACTIVE_CHECKBOX_ID,
  USERS_SIDEBAR_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'

const TITLE = 'users list'
test.describe(TITLE, () => {
  test('displays data-table', async ({ page }) => {
    await login(page, 'einstein')
    await page.locator(`#${USERS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/users')
    const usersRowsSelector = page.locator('role=row')
    await expect(usersRowsSelector).toHaveCount(8)
  })

  test("copy user's email", async ({ page }) => {
    await login(page, 'einstein')
    await page.locator(`#${USERS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/users')
    const usersRowsSelector = page.locator('role=row')
    await expect(usersRowsSelector).toHaveCount(8)
    const adminEmailCopyButtonLocator = page.locator(
      `#${COPY_ADMIN_EMAIL_BUTTON_ID}`
    )
    await adminEmailCopyButtonLocator.waitFor()
    await adminEmailCopyButtonLocator.click()
  })

  test('check if user can deactivate themselves', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page.locator(`#${USERS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/users')
    const usersRowsSelector = page.locator('role=row')
    await expect(usersRowsSelector).toHaveCount(8)

    const activeCheckbox = await page.locator(
      `#${ACTIVE_CHECKBOX_ID}`
    )
    await expect(activeCheckbox.nth(2)).toBeChecked()

    await activeCheckbox.nth(2).hover()

    await expect(
      await page.locator('.v-tooltip.v-overlay--active')
    ).toHaveText('Users cannot deactivate themselves')
  })
})
