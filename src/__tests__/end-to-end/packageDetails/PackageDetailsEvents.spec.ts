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
import { login } from '../helpers/login'
import { awaitTableData } from '@/__tests__/end-to-end/helpers/awaitTableData'
import {
  PACKAGE_DETAILS_BUTTON_R_ID,
  PACKAGE_EVENTS_CARD_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'

const TITLE = 'package details events'
test.describe(TITLE, () => {
  test('should display events with correct filtration', async ({
    page
  }) => {
    const initialDataLoaded = awaitTableData(
      page,
      '/api/v2/manager/packages'
    )
    await login(page, 'einstein')
    const packagesRowsSelector = page.locator('role=row')
    await initialDataLoaded
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

    const timeline = page.locator('#eventsTimeline')
    await timeline.waitFor()

    await expect(
      page.locator('css=.eventCard')
    ).toHaveCount(10)

    await expect(page.locator('.dateDot')).toHaveCount(2)
  })
})
