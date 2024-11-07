/*
 * R Depot
 *
 * Copyright (C) 2012-2024 Open Analytics NV
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
  PACKAGE_MAINTAINERS_SIDEBAR_ID
} from '@/__tests__/integration/helpers/elementsIds'
import { login } from '../helpers/login'

const TITLE = 'package maintainers filtration'
test.describe.only(TITLE, () => {
  test('deleted', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${PACKAGE_MAINTAINERS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/package-maintainers')
    await expect(page).toHaveTitle(
      /RDepot - package maintainers/
    )

    const maintainerDeletedSelector = page.locator(
      '.mdi-trash-can.text-grey'
    )
    const maintainersRowsSelector = page.locator('role=row')
    await expect(maintainersRowsSelector).toHaveCount(12)
    await expect(maintainerDeletedSelector).toHaveCount(2)

    await page
      .locator(
        `#${PACKAGE_MAINTAINERS_FILTRATION_DELETED_FIELD_ID}`
      )
      .click()

    await expect(maintainersRowsSelector).toHaveCount(3)
    await expect(maintainerDeletedSelector).toHaveCount(2)

    await page
      .locator(
        `#${PACKAGE_MAINTAINERS_FILTRATION_DELETED_FIELD_ID}`
      )
      .click()

    await expect(maintainersRowsSelector).toHaveCount(12)
    await expect(maintainerDeletedSelector).toHaveCount(2)

    await page
      .locator(
        `#${PACKAGE_MAINTAINERS_FILTRATION_DELETED_FIELD_ID}`
      )
      .click()

    await expect(maintainersRowsSelector).toHaveCount(11)
    await expect(maintainerDeletedSelector).toHaveCount(0)
  })
})
