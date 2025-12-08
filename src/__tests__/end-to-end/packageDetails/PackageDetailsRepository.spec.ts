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

import { expect, test } from '@playwright/test'
import { login } from '../helpers/login'
import {
  PACKAGE_DETAILS_BUTTON_R_ID,
  PACKAGE_DETAILS_GO_TO_REPOSITORY_ID,
  PACKAGE_EVENTS_CARD_ID,
  REPOSITORIES_FILTRATION_SEARCH_FIELD_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'

const TITLE = 'package details repository'
test.describe(TITLE, () => {
  test('should redirect to repositories page with correct filtration', async ({
    page
  }) => {
    await login(page, 'einstein')
    const rowsSelector = page.locator('role=row')
    await expect(rowsSelector).toHaveCount(21)

    const seePackageDetailsButtonSelector = page.locator(
      `#${PACKAGE_DETAILS_BUTTON_R_ID}`
    )
    await seePackageDetailsButtonSelector.waitFor()
    await seePackageDetailsButtonSelector.click()
    await expect(page).toHaveTitle(
      /RDepot - package details/
    )

    const goToEventsPageButtonLocator = page.locator(
      `#${PACKAGE_EVENTS_CARD_ID}`
    )
    await goToEventsPageButtonLocator.waitFor()

    const goToRepositoryPageButtonLocator = page.locator(
      `#${PACKAGE_DETAILS_GO_TO_REPOSITORY_ID}`
    )
    await goToRepositoryPageButtonLocator.waitFor()
    await goToRepositoryPageButtonLocator.click()

    await page.waitForURL('**/repositories')
    await expect(page).toHaveTitle(/RDepot - repositories/)

    const repositoryFiltrationLocator = page.locator(
      `#${REPOSITORIES_FILTRATION_SEARCH_FIELD_ID}`
    )

    await repositoryFiltrationLocator.waitFor()

    await expect(page.getByLabel('Search')).toHaveValue(
      'testrepo3'
    )
    await expect(rowsSelector).toHaveCount(2)
  })
})
