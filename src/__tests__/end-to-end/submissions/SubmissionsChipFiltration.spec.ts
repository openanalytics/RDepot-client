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
  SUBMISSIONS_FILTRATION_TECHNOLOGY_FIELD_ID,
  SUBMISSIONS_FILTRATION_STATE_FIELD_ID,
  SUBMISSIONS_FILTRATION_FILE_TYPE_FIELD_ID,
  FILTRATION_RESET_BUTTON_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'

const TITLE = 'submissions chip filtration'
test.describe(TITLE, () => {
  test('clicking technology chip filters submissions by that technology', async ({
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

    const firstTechnologyChip = page
      .locator('td .v-chip')
      .filter({ hasText: /^(R|Python)$/ })
      .first()
    await firstTechnologyChip.waitFor()
    const chipText = await firstTechnologyChip.innerText()

    await firstTechnologyChip.click()

    const technologyField = page.locator(
      `#${SUBMISSIONS_FILTRATION_TECHNOLOGY_FIELD_ID}`
    )
    await expect(technologyField).toHaveValue(chipText)

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeVisible()

    const filteredRowCount =
      await submissionsRowsSelector.count()
    expect(filteredRowCount).toBeLessThanOrEqual(
      initialRowCount
    )
  })

  test('clicking state icon filters submissions by that state', async ({
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

    const firstStateIcon = page
      .locator('td #tooltip-activator')
      .first()
    await firstStateIcon.waitFor()

    await firstStateIcon.click()

    const stateField = page.locator(
      `#${SUBMISSIONS_FILTRATION_STATE_FIELD_ID}`
    )
    await expect(stateField).not.toHaveValue('')

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeVisible()

    const filteredRowCount =
      await submissionsRowsSelector.count()
    expect(filteredRowCount).toBeLessThanOrEqual(
      initialRowCount
    )
  })

  test('clicking file type chip filters submissions by that file type', async ({
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

    const firstFileTypeChip = page
      .locator('td .v-chip')
      .filter({ hasText: /^(Binary|Source)$/ })
      .first()
    await firstFileTypeChip.waitFor()

    await firstFileTypeChip.click()

    const fileTypeField = page.locator(
      `#${SUBMISSIONS_FILTRATION_FILE_TYPE_FIELD_ID}`
    )
    await expect(fileTypeField).not.toHaveValue('')

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeVisible()

    const filteredRowCount =
      await submissionsRowsSelector.count()
    expect(filteredRowCount).toBeLessThanOrEqual(
      initialRowCount
    )
  })
})
