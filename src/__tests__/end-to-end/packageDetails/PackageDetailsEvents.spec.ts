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
  EVENTS_FILTRATION_PACKAGE_FIELD_ID,
  EVENTS_FILTRATION_REPOSITORY_FIELD_ID,
  PACKAGE_DETAILS_BUTTON_R_ID,
  PACKAGE_EVENTS_CARD_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'

const TITLE = 'package details events'
test.describe(TITLE, () => {
  test('should redirect to events page with correct filtration', async ({
    page
  }) => {
    await login(page, 'einstein')
    const packagesRowsSelector = page.locator('role=row')
    await expect(packagesRowsSelector).toHaveCount(21)

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
    await goToEventsPageButtonLocator.click()

    await page.waitForURL('**/events')
    await expect(page).toHaveTitle(/RDepot - events/)

    const repositoryFiltrationLocator = page.locator(
      `#${EVENTS_FILTRATION_REPOSITORY_FIELD_ID}`
    )
    const packageFiltrationLocator = page.locator(
      `#${EVENTS_FILTRATION_PACKAGE_FIELD_ID}`
    )

    await repositoryFiltrationLocator.waitFor()
    await packageFiltrationLocator.waitFor()

    const comboboxesValues = await page
      .getByRole('combobox')
      .allTextContents()

    const packageChips = page
      .locator('.v-field__input span')
      .filter({ hasText: /^A3$/ })
    await packageChips.waitFor()

    expect(comboboxesValues[3]).toContain('testrepo3')
    expect(comboboxesValues[4]).toContain('A3')
    await expect(packageChips).toHaveCount(1)

    await expect(
      page.locator('css=.eventCard')
    ).toHaveCount(20)
  })
})
