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
  SUBMISSIONS_SIDEBAR_ID,
  SUBMISSIONS_FILTRATION_FROM_DATE_FIELD_ID,
  SUBMISSIONS_FILTRATION_TO_DATE_FIELD_ID,
  FILTRATION_RESET_BUTTON_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'

const TITLE = 'submissions date chip filtration'
test.describe(TITLE, () => {
  test('clicking date chip filters submissions by that date', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page.locator(`#${SUBMISSIONS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/submissions')
    await expect(page).toHaveTitle(/RDepot - submissions/)

    const submissionsRowsSelector = page.locator('role=row')
    await expect(submissionsRowsSelector).toHaveCount(21)
    const initialRowCount =
      await submissionsRowsSelector.count()

    const firstDateChip = page
      .locator('td .v-chip')
      .filter({ hasText: /^\d{4}\.\d{2}\.\d{2}$/ })
      .first()
    await firstDateChip.waitFor()
    const chipText = await firstDateChip.innerText()

    const [year, month, day] = chipText.split('.')
    const expectedDateValue = `${year}-${month}-${day}`

    await firstDateChip.click()

    const fromDateField = page.locator(
      `#${SUBMISSIONS_FILTRATION_FROM_DATE_FIELD_ID}`
    )
    const toDateField = page.locator(
      `#${SUBMISSIONS_FILTRATION_TO_DATE_FIELD_ID}`
    )

    await expect(fromDateField).toHaveValue(
      expectedDateValue
    )
    await expect(toDateField).toHaveValue(expectedDateValue)

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeVisible()

    const filteredRowCount =
      await submissionsRowsSelector.count()
    expect(filteredRowCount).toBeLessThan(initialRowCount)
  })
})
