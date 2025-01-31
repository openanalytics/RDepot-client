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
import { PACKAGES_FILTRATION_DELETED_FIELD_ID } from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'

const TITLE = 'packages filtration'
test.describe(TITLE, () => {
  test('deleted', async ({ page }) => {
    await login(page, 'einstein')

    const packagesRowsSelector = page.locator('role=row')
    const packagesDeletedSelector = page.locator(
      '.mdi-trash-can.text-grey'
    )

    await expect(packagesRowsSelector).toHaveCount(21)
    await expect(packagesDeletedSelector).toHaveCount(4)

    await page
      .locator(`#${PACKAGES_FILTRATION_DELETED_FIELD_ID}`)
      .click()

    await expect(packagesRowsSelector).toHaveCount(7)
    await expect(packagesDeletedSelector).toHaveCount(6)

    await page
      .locator(`#${PACKAGES_FILTRATION_DELETED_FIELD_ID}`)
      .click()

    await expect(packagesRowsSelector).toHaveCount(21)
    await expect(packagesDeletedSelector).toHaveCount(4)

    await page
      .locator(`#${PACKAGES_FILTRATION_DELETED_FIELD_ID}`)
      .click()

    await expect(packagesRowsSelector).toHaveCount(21)
    await expect(packagesDeletedSelector).toHaveCount(0)
  })
})
