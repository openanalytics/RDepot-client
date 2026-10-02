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
  PACKAGES_SIDEBAR_ID,
  PACKAGES_FILTRATION_TECHNOLOGY_FIELD_ID,
  PACKAGES_FILTRATION_FILE_TYPE_FIELD_ID,
  PACKAGES_FILTRATION_SUBMISSION_STATE_FIELD_ID,
  FILTRATION_RESET_BUTTON_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'
import {
  awaitTablePage,
  expectRowsFrom
} from '@/__tests__/end-to-end/helpers/tableRows'

const API_PATH = '/api/v2/manager/packages'

const TITLE = 'packages chip filtration'
test.describe(TITLE, () => {
  test('clicking technology chip filters packages by that technology', async ({
    page
  }) => {
    const initialData = awaitTablePage(page, API_PATH)
    await login(page, 'einstein')
    await page.locator(`#${PACKAGES_SIDEBAR_ID}`).click()
    await page.waitForURL('**/packages')
    await expect(page).toHaveTitle(/RDepot - packages/)

    const initialRowCount = await expectRowsFrom(
      page,
      initialData
    )

    const firstTechnologyChip = page
      .locator('td .v-chip')
      .filter({ hasText: /^(R|Python)$/ })
      .first()
    await firstTechnologyChip.waitFor()
    const chipText = await firstTechnologyChip.innerText()

    const filteredData = awaitTablePage(page, API_PATH)
    await firstTechnologyChip.click()

    const technologyField = page.locator(
      `#${PACKAGES_FILTRATION_TECHNOLOGY_FIELD_ID}`
    )
    await expect(technologyField).toHaveValue(chipText)

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeVisible()

    const filteredRowCount = await expectRowsFrom(
      page,
      filteredData
    )
    expect(filteredRowCount).toBeLessThanOrEqual(
      initialRowCount
    )
  })

  test('clicking file type chip filters packages by that file type', async ({
    page
  }) => {
    const initialData = awaitTablePage(page, API_PATH)
    await login(page, 'einstein')
    await page.locator(`#${PACKAGES_SIDEBAR_ID}`).click()
    await page.waitForURL('**/packages')
    await expect(page).toHaveTitle(/RDepot - packages/)

    const initialRowCount = await expectRowsFrom(
      page,
      initialData
    )

    const firstFileTypeChip = page
      .locator('td .v-chip')
      .filter({ hasText: /^(Binary|Source)$/ })
      .first()
    await firstFileTypeChip.waitFor()

    const filteredData = awaitTablePage(page, API_PATH)
    await firstFileTypeChip.click()

    const fileTypeField = page.locator(
      `#${PACKAGES_FILTRATION_FILE_TYPE_FIELD_ID}`
    )
    await expect(fileTypeField).not.toHaveValue('')

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeVisible()

    const filteredRowCount = await expectRowsFrom(
      page,
      filteredData
    )
    expect(filteredRowCount).toBeLessThanOrEqual(
      initialRowCount
    )
  })

  test('clicking state icon filters packages by that state', async ({
    page
  }) => {
    const initialData = awaitTablePage(page, API_PATH)
    await login(page, 'einstein')
    await page.locator(`#${PACKAGES_SIDEBAR_ID}`).click()
    await page.waitForURL('**/packages')
    await expect(page).toHaveTitle(/RDepot - packages/)

    const initialRowCount = await expectRowsFrom(
      page,
      initialData
    )

    const firstStateIcon = page
      .locator('td #tooltip-activator')
      .first()
    await firstStateIcon.waitFor()

    const filteredData = awaitTablePage(page, API_PATH)
    await firstStateIcon.click()

    const stateField = page.locator(
      `#${PACKAGES_FILTRATION_SUBMISSION_STATE_FIELD_ID}`
    )
    await expect(stateField).not.toHaveValue('')

    const filteredRowCount = await expectRowsFrom(
      page,
      filteredData
    )
    expect(filteredRowCount).toBeLessThanOrEqual(
      initialRowCount
    )
  })
})
