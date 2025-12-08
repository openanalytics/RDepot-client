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
  USERS_FILTRATION_ACTIVE_ID,
  USERS_FILTRATION_DELETED_ID,
  USERS_FILTRATION_SEARCH_ID,
  USERS_SIDEBAR_ID,
  FILTRATION_RESET_BUTTON_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'

const TITLE = 'users filtration'
test.describe(TITLE, () => {
  test('deleted', async ({ page }) => {
    await login(page, 'einstein')

    await page.locator(`#${USERS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/users')
    await expect(page).toHaveTitle(/RDepot - users/)

    const userDeletedSelector = page.locator(
      '.mdi-trash-can.text-grey'
    )
    const usersRowsSelector = page.locator('role=row')
    await expect(usersRowsSelector).toHaveCount(8)
    await expect(userDeletedSelector).toHaveCount(1)

    await page
      .locator(`#${USERS_FILTRATION_DELETED_ID}`)
      .click()

    await expect(usersRowsSelector).toHaveCount(8)
    await expect(userDeletedSelector).toHaveCount(1)

    await page
      .locator(`#${USERS_FILTRATION_DELETED_ID}`)
      .click()

    await expect(usersRowsSelector).toHaveCount(8)
    await expect(userDeletedSelector).toHaveCount(1)

    await page
      .locator(`#${USERS_FILTRATION_DELETED_ID}`)
      .click()

    await expect(usersRowsSelector).toHaveCount(2)
    await expect(userDeletedSelector).toHaveCount(0)
  })

  test('active', async ({ page }) => {
    await login(page, 'einstein')

    await page.locator(`#${USERS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/users')
    await expect(page).toHaveTitle(/RDepot - users/)

    const userActiveSelector = page.getByRole('checkbox', {
      checked: true
    })
    const usersRowsSelector = page.locator('role=row')
    await expect(usersRowsSelector).toHaveCount(8)
    await expect(userActiveSelector).toHaveCount(5)

    await page
      .locator(`#${USERS_FILTRATION_ACTIVE_ID}`)
      .click()

    await expect(usersRowsSelector).toHaveCount(3)
    //that one is tricky - it counts switch=true in the filtration bar
    await expect(userActiveSelector).toHaveCount(0)

    await page
      .locator(`#${USERS_FILTRATION_ACTIVE_ID}`)
      .click()

    await expect(usersRowsSelector).toHaveCount(8)
    await expect(userActiveSelector).toHaveCount(5)

    await page
      .locator(`#${USERS_FILTRATION_ACTIVE_ID}`)
      .click()

    await expect(usersRowsSelector).toHaveCount(6)
    await expect(userActiveSelector).toHaveCount(6)
  })

  test('reset button', async ({ page }) => {
    await login(page, 'einstein')

    await page.locator(`#${USERS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/users')
    await expect(page).toHaveTitle(/RDepot - users/)
    const usersRowsSelector = page.locator('role=row')
    await expect(usersRowsSelector).toHaveCount(8)

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeHidden()

    await page
      .locator(`#${USERS_FILTRATION_ACTIVE_ID}`)
      .click()

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeVisible()
    await expect(usersRowsSelector).toHaveCount(3)

    await page
      .locator(`#${FILTRATION_RESET_BUTTON_ID}`)
      .click()

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeHidden()
    await expect(usersRowsSelector).toHaveCount(8)
  })

  test('displays no data available text', async ({
    page
  }) => {
    await login(page, 'einstein')

    await page.locator(`#${USERS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/users')
    await expect(page).toHaveTitle(/RDepot - users/)

    const usersRowsSelector = page.locator('role=row')
    await page
      .locator(`#${USERS_FILTRATION_SEARCH_ID}`)
      .fill('aaaaaaaaaa')
    await expect(usersRowsSelector).toHaveCount(2)
    await expect(
      await page
        .locator('.v-data-table__tbody')
        .textContent()
    ).toContain('No data available')
  })
})
