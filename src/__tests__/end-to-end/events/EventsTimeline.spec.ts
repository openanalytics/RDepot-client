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
  EVENTS_FILTRATION_RESOURCE_TYPE_ID,
  EVENTS_SIDEBAR_ID,
  PACKAGES_SIDEBAR_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'

const TITLE = 'events timeline'
test.describe(TITLE, () => {
  test('show fetched page', async ({ page }) => {
    await login(page, 'einstein')
    await page.locator(`#${EVENTS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/events')

    const arrowTag = await page.locator('.mdi-email')

    await expect(arrowTag).toHaveCount(2)

    const resourceTypeField = page.locator(
      `#${EVENTS_FILTRATION_RESOURCE_TYPE_ID}`
    )

    await resourceTypeField.waitFor()
    await resourceTypeField.click({ force: true })

    await page
      .locator(
        '#v-menu-260 > div > div > div:nth-child(3) > div.v-list-item__content > div'
      )
      .click()
    await expect(
      page.locator('#reset-button')
    ).toBeVisible()

    const maintainerTag = await page.locator('.mdi-package')

    await expect(maintainerTag).toHaveCount(12)

    await page.locator(`#${PACKAGES_SIDEBAR_ID}`).click()
    await page.waitForURL('**/packages')
    const packagesRowsSelector = page.locator('role=row')
    await expect(packagesRowsSelector).toHaveCount(21)

    await page.locator(`#${EVENTS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/events')

    await expect(arrowTag).toHaveCount(2)
  })
})
