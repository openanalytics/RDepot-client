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
import { PACKAGE_MAINTAINERS_SIDEBAR_ID } from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '@/__tests__/end-to-end/helpers/login'

const TITLE_SERIAL = 'Package maintainers list'

test.describe(TITLE_SERIAL, () => {
  test('renders properly', async ({ page }) => {
    await login(page, 'einstein')
    await page
      .locator(`#${PACKAGE_MAINTAINERS_SIDEBAR_ID}`)
      .click()

    await page.waitForURL('**/package-maintainers')

    const maintainersRowsSelector = page.locator('role=row')
    await expect(maintainersRowsSelector).toHaveCount(12)
  })

  test('should check how many package maintainers are in the table footer', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page
      .locator(`#${PACKAGE_MAINTAINERS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/package-maintainers')
    await expect(page).toHaveTitle(
      /RDepot - package maintainers/
    )
    const maintainersRowsSelector = page.locator('role=row')
    await expect(maintainersRowsSelector).toHaveCount(12)
    await expect(
      (
        await page
          .locator('.v-data-table-footer__info')
          .innerText()
      ).includes('1-11 of 11')
    ).toBe(true)
  })
})
