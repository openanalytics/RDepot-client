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
  SETTINGS_LIST_SIDEBAR_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '@/__tests__/end-to-end/helpers/login'

const TITLE_SERIAL = 'tokens list'

test.describe(TITLE_SERIAL, () => {
  test('renders properly', async ({ page }) => {
    await login(page, 'einstein')
    await page
      .locator(`#${SETTINGS_LIST_SIDEBAR_ID}`)
      .click()
    await page
      .locator(`#${ACCESS_TOKENS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/settings-tokens')

    const tokensRowSelector = page.locator('role=row')
    await expect(tokensRowSelector).toHaveCount(3)
  })
})
