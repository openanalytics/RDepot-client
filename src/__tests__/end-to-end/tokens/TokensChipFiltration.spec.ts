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
  ACCESS_TOKENS_SIDEBAR_ID,
  SETTINGS_LIST_SIDEBAR_ID,
  TOKENS_FILTRATION_ACTIVE_ID,
  FILTRATION_RESET_BUTTON_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'

const TITLE = 'tokens chip filtration'
test.describe(TITLE, () => {
  test('clicking active icon filters tokens by active status', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page
      .locator(`#${SETTINGS_LIST_SIDEBAR_ID}`)
      .click()
    await page
      .locator(`#${ACCESS_TOKENS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/settings-tokens')
    await expect(page).toHaveTitle(/RDepot - access tokens/)

    const rowsSelector = page.locator('role=row')
    await expect(rowsSelector).not.toHaveCount(0)
    const initialRowCount = await rowsSelector.count()

    const firstActiveIcon = page
      .locator('td #access-token-active-icon')
      .first()
    await firstActiveIcon.waitFor()

    await firstActiveIcon.click()

    const activeField = page.locator(
      `#${TOKENS_FILTRATION_ACTIVE_ID}`
    )
    await expect(activeField).not.toHaveValue('')

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeVisible()

    const filteredRowCount = await rowsSelector.count()
    expect(filteredRowCount).toBeLessThanOrEqual(
      initialRowCount
    )
  })
})
