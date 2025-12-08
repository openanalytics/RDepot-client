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
  ACCESS_TOKENS_SIDEBAR_ID,
  SETTINGS_LIST_SIDEBAR_ID,
  TOKENS_FILTRATION_ACTIVE_ID,
  TOKENS_FILTRATION_EXPIRED_ID,
  TOKENS_FILTRATION_SEARCH_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '@/__tests__/end-to-end/helpers/login'

const TITLE_SERIAL = 'tokens filtration'
test.describe(TITLE_SERIAL, () => {
  test('active', async ({ page }) => {
    await login(page, 'einstein')
    await page
      .locator(`#${SETTINGS_LIST_SIDEBAR_ID}`)
      .click()
    await page
      .locator(`#${ACCESS_TOKENS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/settings-tokens')

    const tokenActiveSelector = page.getByRole('checkbox', {
      checked: true
    })
    const tokensRowSelector = page.locator('role=row')
    await expect(tokensRowSelector).toHaveCount(3)
    await expect(tokenActiveSelector).toHaveCount(0)

    await page
      .locator(`#${TOKENS_FILTRATION_ACTIVE_ID}`)
      .click()

    await expect(tokensRowSelector).toHaveCount(2)
    await expect(tokenActiveSelector).toHaveCount(0)

    await page
      .locator(`#${TOKENS_FILTRATION_ACTIVE_ID}`)
      .click()

    await expect(tokensRowSelector).toHaveCount(3)
    await expect(tokenActiveSelector).toHaveCount(0)

    await page
      .locator(`#${TOKENS_FILTRATION_ACTIVE_ID}`)
      .click()

    await expect(tokensRowSelector).toHaveCount(3)
    await expect(tokenActiveSelector).toHaveCount(1)
  })

  test('expired', async ({ page }) => {
    await login(page, 'einstein')
    await page
      .locator(`#${SETTINGS_LIST_SIDEBAR_ID}`)
      .click()
    await page
      .locator(`#${ACCESS_TOKENS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/settings-tokens')
    await expect(page).toHaveTitle(/RDepot - access tokens/)

    const tokensRowSelector = page.locator('role=row')
    await expect(tokensRowSelector).toHaveCount(3)

    await page
      .locator(`#${TOKENS_FILTRATION_EXPIRED_ID}`)
      .click()

    await expect(tokensRowSelector).toHaveCount(2)

    await page
      .locator(`#${TOKENS_FILTRATION_EXPIRED_ID}`)
      .click()

    await expect(tokensRowSelector).toHaveCount(3)

    await page
      .locator(`#${TOKENS_FILTRATION_EXPIRED_ID}`)
      .click()

    await expect(tokensRowSelector).toHaveCount(2)
  })

  test('no data available', async ({ page }) => {
    await login(page, 'einstein')
    await page
      .locator(`#${SETTINGS_LIST_SIDEBAR_ID}`)
      .click()
    await page
      .locator(`#${ACCESS_TOKENS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/settings-tokens')
    await expect(page).toHaveTitle(/RDepot - access tokens/)

    const tokensRowSelector = page.locator('role=row')
    await expect(tokensRowSelector).toHaveCount(3)

    await page
      .locator(`#${TOKENS_FILTRATION_SEARCH_ID}`)
      .fill('aaaaaaaaaa')
    await expect(tokensRowSelector).toHaveCount(2)
    expect(
      await page
        .locator('.v-data-table__tbody')
        .textContent()
    ).toContain('No data available')
  })
})
