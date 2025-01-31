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
import { login } from '../helpers/login'
import {
  PACKAGE_DETAILS_BUTTON_ID,
  PACKAGE_PROPERTY_DEPENDS_ID,
  PACKAGE_PROPERTY_IMPORTS_ID,
  PACKAGE_LICENSE_CARD_ID,
  PACKAGE_PROPERTY_MD5SUM_ID,
  PACKAGE_PROPERTY_SUGGESTS_ID,
  PACKAGE_PROPERTY_SYSTEM_REQUIREMENTS_ID,
  PACKAGE_PROPERTY_URL_ID,
  PACKAGE_VERSIONS_CHART_ID,
  PACKAGE_REPOSITORY_CARD_ID,
  PACKAGE_PROPERTY_SUBMITTER_ID,
  PACKAGE_PROPERTY_APPROVER_ID,
  PACKAGE_PROPERTY_MAINTAINER_ID,
  PACKAGE_PROPERTY_AUTHOR_ID,
  PACKAGE_PROPERTY_MANUAL_ID,
  PACKAGE_PROPERTY_SOURCE_FILE_ID
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
      .locator(`#${PACKAGE_VERSIONS_CHART_ID}`)
      .waitFor()
    await page
      .locator(
        `#${PACKAGE_PROPERTY_SYSTEM_REQUIREMENTS_ID}`
      )
      .waitFor()
    await page
      .locator(`#${PACKAGE_LICENSE_CARD_ID}`)
      .waitFor()
    await page
      .locator(`#${PACKAGE_PROPERTY_URL_ID}`)
      .waitFor()
    await page
      .locator(`#${PACKAGE_PROPERTY_DEPENDS_ID}`)
      .waitFor()
    await page
      .locator(`#${PACKAGE_PROPERTY_IMPORTS_ID}`)
      .waitFor()
    await page
      .locator(`#${PACKAGE_PROPERTY_SUGGESTS_ID}`)
      .waitFor()
    await page
      .locator(`#${PACKAGE_REPOSITORY_CARD_ID}`)
      .waitFor()
    await page
      .locator(`#${PACKAGE_PROPERTY_MD5SUM_ID}`)
      .waitFor()
    await page
      .locator(`#${PACKAGE_PROPERTY_SUBMITTER_ID}`)
      .waitFor()
    await page
      .locator(`#${PACKAGE_PROPERTY_APPROVER_ID}`)
      .waitFor()
    await page
      .locator(`#${PACKAGE_PROPERTY_MAINTAINER_ID}`)
      .waitFor()
    await page
      .locator(`#${PACKAGE_PROPERTY_AUTHOR_ID}`)
      .waitFor()
    await page
      .locator(`#${PACKAGE_PROPERTY_MANUAL_ID}`)
      .waitFor()
    await page
      .locator(`#${PACKAGE_PROPERTY_SOURCE_FILE_ID}`)
      .waitFor()
  })
})
