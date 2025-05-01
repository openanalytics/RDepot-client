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
import { EVENTS_SIDEBAR_ID } from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'

const TITLE = 'events filtration'
test.describe(TITLE, () => {
  test('go to package details', async ({ page }) => {
    await login(page, 'einstein')
    await page.locator(`#${EVENTS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/events')

    const eventsResourceSelector = page
      .getByRole('combobox')
      .nth(2)
    await eventsResourceSelector.waitFor()
    await eventsResourceSelector.click()

    const eventsPackageSelector = page
      .getByRole('option', { name: 'Package' })
      .nth(0)

    await eventsPackageSelector.waitFor()
    await eventsPackageSelector.click()

    const goToID = page.locator('#goTo-button-15').nth(0)
    await goToID.click()

    await expect(page).toHaveTitle(
      /RDepot - package details/
    )
  })

  test('go to submission details', async ({ page }) => {
    await login(page, 'einstein')
    await page.locator(`#${EVENTS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/events')

    const eventsResourceSelector = page
      .getByRole('combobox')
      .nth(2)
    await eventsResourceSelector.waitFor()
    await eventsResourceSelector.click()

    const eventsSubmissionSelector = page.getByRole(
      'option',
      { name: 'Submission' }
    )

    await eventsSubmissionSelector.waitFor()
    await eventsSubmissionSelector.click()

    const goToID = page.locator('#goTo-button-47').nth(0)
    await goToID.click()

    await expect(page).toHaveTitle(
      /RDepot - package details/
    )
  })
})
