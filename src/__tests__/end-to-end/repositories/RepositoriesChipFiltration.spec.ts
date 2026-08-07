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
  REPOSITORIES_SIDEBAR_ID,
  REPOSITORIES_FILTRATION_TECHNOLOGY_FIELD_ID,
  FILTRATION_RESET_BUTTON_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'

const TITLE = 'repositories chip filtration'
test.describe(TITLE, () => {
  test('clicking technology chip filters repositories by that technology', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')
    await expect(page).toHaveTitle(/RDepot - repositories/)

    const rowsSelector = page.locator('role=row')
    await expect(rowsSelector).not.toHaveCount(0)
    const initialRowCount = await rowsSelector.count()

    const firstTechnologyChip = page
      .locator('td .v-chip')
      .filter({ hasText: /^(R|Python)$/ })
      .first()
    await firstTechnologyChip.waitFor()
    const chipText = await firstTechnologyChip.innerText()

    await firstTechnologyChip.click()

    const technologyField = page.locator(
      `#${REPOSITORIES_FILTRATION_TECHNOLOGY_FIELD_ID}`
    )
    await expect(technologyField).toHaveValue(chipText)

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeVisible()

    const filteredRowCount = await rowsSelector.count()
    expect(filteredRowCount).toBeLessThanOrEqual(
      initialRowCount
    )
  })
})
