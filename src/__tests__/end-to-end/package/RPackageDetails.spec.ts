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
import { login } from '../helpers/login'
import {
  PACKAGE_DETAILS_BUTTON_ID,
  R_PACKAGE_DEPENDS_PROPERTY_ID,
  R_PACKAGE_IMPORTS_PROPERTY_ID,
  R_PACKAGE_LICENSE_PROPERTY_ID,
  R_PACKAGE_MD5SUM_PROPERTY_ID,
  R_PACKAGE_SUGGESTS_PROPERTY_ID,
  R_PACKAGE_SYSTEM_REQUIREMENTS_PROPERTY_ID,
  R_PACKAGE_URL_PROPERTY_ID,
  R_PACKAGE_VERSION_PROPERTY_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'

const TITLE = 'R package details'
test.describe(TITLE, () => {
  test('displays all package properties', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page
      .locator('.v-data-table__tr:nth-child(1)')
      .click()

    const seeDetailsButtonSelector = page.locator(
      `#${PACKAGE_DETAILS_BUTTON_ID}`
    )

    await seeDetailsButtonSelector.waitFor()
    await seeDetailsButtonSelector.click()
    await expect(page).toHaveTitle(
      /RDepot - package details/
    )
    await page
      .locator(`#${R_PACKAGE_VERSION_PROPERTY_ID}`)
      .waitFor()
    await page
      .locator(
        `#${R_PACKAGE_SYSTEM_REQUIREMENTS_PROPERTY_ID}`
      )
      .waitFor()
    await page
      .locator(`#${R_PACKAGE_LICENSE_PROPERTY_ID}`)
      .waitFor()
    await page
      .locator(`#${R_PACKAGE_URL_PROPERTY_ID}`)
      .waitFor()
    await page
      .locator(`#${R_PACKAGE_DEPENDS_PROPERTY_ID}`)
      .waitFor()
    await page
      .locator(`#${R_PACKAGE_IMPORTS_PROPERTY_ID}`)
      .waitFor()
    await page
      .locator(`#${R_PACKAGE_SUGGESTS_PROPERTY_ID}`)
      .waitFor()
    await page
      .locator(`#${R_PACKAGE_MD5SUM_PROPERTY_ID}`)
      .waitFor()
  })
})
