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
  PACKAGE_MAINTAINERS_FILTRATION_DELETED_FIELD_ID,
  PACKAGE_MAINTAINERS_SIDEBAR_ID,
  PACKAGE_MAINTAINERS_FILTRATION_SEARCH_FIELD_ID,
  FILTRATION_RESET_BUTTON_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'
import { awaitTableData } from '../helpers/awaitTableData'

const TITLE = 'package maintainers filtration'
test.describe(TITLE, () => {
  test('deleted', async ({ page }) => {
    await login(page, 'einstein')

    const initialDataLoaded = awaitTableData(
      page,
      '/api/v2/manager/package-maintainers'
    )
    await page
      .locator(`#${PACKAGE_MAINTAINERS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/package-maintainers')
    const maintainerDeletedSelector = page.locator(
      '.mdi-trash-can.text-grey'
    )
    const maintainersRowsSelector = page.locator('role=row')
    await initialDataLoaded
    await expect(maintainersRowsSelector).toHaveCount(21)
    await expect(maintainerDeletedSelector).toHaveCount(11)

    await page
      .locator(
        `#${PACKAGE_MAINTAINERS_FILTRATION_DELETED_FIELD_ID}`
      )
      .click()

    await expect(maintainersRowsSelector).toHaveCount(4)
    await expect(maintainerDeletedSelector).toHaveCount(3)

    await page
      .locator(
        `#${PACKAGE_MAINTAINERS_FILTRATION_DELETED_FIELD_ID}`
      )
      .click()

    await expect(maintainersRowsSelector).toHaveCount(22)
    await expect(maintainerDeletedSelector).toHaveCount(12)

    await page
      .locator(
        `#${PACKAGE_MAINTAINERS_FILTRATION_DELETED_FIELD_ID}`
      )
      .click()

    await expect(maintainersRowsSelector).toHaveCount(28)
    await expect(maintainerDeletedSelector).toHaveCount(12)

    await page
      .locator(
        `#${PACKAGE_MAINTAINERS_FILTRATION_DELETED_FIELD_ID}`
      )
      .click()

    await expect(maintainersRowsSelector).toHaveCount(11)
    await expect(maintainerDeletedSelector).toHaveCount(4)
  })

  test('reset button', async ({ page }) => {
    await login(page, 'einstein')
    const initialDataLoaded = awaitTableData(
      page,
      '/api/v2/manager/package-maintainers'
    )
    await page
      .locator(`#${PACKAGE_MAINTAINERS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/package-maintainers')
    const maintainersRowsSelector = page.locator('role=row')
    await initialDataLoaded
    await expect(maintainersRowsSelector).toHaveCount(21)
    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeHidden()
    await page
      .locator(
        `#${PACKAGE_MAINTAINERS_FILTRATION_DELETED_FIELD_ID}`
      )
      .click()

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeVisible()

    await expect(maintainersRowsSelector).toHaveCount(4)

    const filtrationResetDataLoaded = awaitTableData(
      page,
      '/api/v2/manager/package-maintainers'
    )
    await page
      .locator(`#${FILTRATION_RESET_BUTTON_ID}`)
      .click()

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeHidden()

    await filtrationResetDataLoaded
    await expect(maintainersRowsSelector).toHaveCount(21)
  })

  test('no data available', async ({ page }) => {
    await login(page, 'einstein')
    const initialDataLoaded = awaitTableData(
      page,
      '/api/v2/manager/package-maintainers'
    )
    await page
      .locator(`#${PACKAGE_MAINTAINERS_SIDEBAR_ID}`)
      .click()

    await page.waitForURL('**/package-maintainers')

    const maintainersRowsSelector = page.locator('role=row')
    await initialDataLoaded
    await expect(maintainersRowsSelector).toHaveCount(21)

    await page
      .locator(
        `#${PACKAGE_MAINTAINERS_FILTRATION_SEARCH_FIELD_ID}`
      )
      .fill('aaaaaaaaaa')
    await expect(maintainersRowsSelector).toHaveCount(2)

    await expect(
      await page
        .locator('.v-data-table__tbody')
        .textContent()
    ).toContain('No data available')
  })
})
