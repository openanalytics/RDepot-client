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
  CANCEL_BUTTON_ID,
  PACKAGES_LIST_CHECKBOX_ACTIONS_A3_091_TESTREPO3_ID,
  PACKAGES_LIST_CHECKBOX_ACTIONS_ACCELERATED_NUMPY_010_TESTREPO8_ID,
  PACKAGES_LIST_CHECKBOX_ACTIONS_ANACODA_0213_TESTREPO4_ID,
  PACKAGES_LIST_DELETE_MODAL,
  PACKAGES_LIST_SELECT_ALL_ID,
  PACKAGES_MULTI_ACTIONS_ID,
  PACKAGES_MULTI_DELETE_ID,
  SUBMIT_BUTTON_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'
import { restoreData } from '@/__tests__/end-to-end/helpers/restoreData'

const TITLE = 'packages multi actions'
test.describe(TITLE, () => {
  test('select and unselect', async ({ page }) => {
    await login(page, 'einstein')

    const packagesRowsSelector = page.locator('role=row')
    await expect(packagesRowsSelector).toHaveCount(21)

    await page
      .locator(
        `#${PACKAGES_LIST_CHECKBOX_ACTIONS_A3_091_TESTREPO3_ID}`
      )
      .click()

    await page
      .locator(
        `#${PACKAGES_LIST_CHECKBOX_ACTIONS_ACCELERATED_NUMPY_010_TESTREPO8_ID}`
      )
      .click()

    await page
      .locator(
        `#${PACKAGES_LIST_CHECKBOX_ACTIONS_ANACODA_0213_TESTREPO4_ID}`
      )
      .click()

    await page
      .locator(
        `#${PACKAGES_LIST_CHECKBOX_ACTIONS_A3_091_TESTREPO3_ID}`
      )
      .click()

    await page
      .locator(`#${PACKAGES_MULTI_ACTIONS_ID}`)
      .click()

    const speedDialOptionsSelector = page.locator(
      `#${PACKAGES_MULTI_DELETE_ID}`
    )
    await speedDialOptionsSelector.waitFor()

    await page
      .locator(`#${PACKAGES_MULTI_DELETE_ID}`)
      .click()

    const speedDialModalSelector = page.locator(
      `#${PACKAGES_LIST_DELETE_MODAL}`
    )
    await speedDialModalSelector.waitFor()

    const packagesTitleSelector = page.locator(
      'css=.v-card .v-list-item-title'
    )
    await expect(packagesTitleSelector).toHaveCount(2)

    await page.locator(`#${CANCEL_BUTTON_ID}`).click()

    await page.locator('css=.mdi-chevron-right').click()
    await expect(packagesRowsSelector).toHaveCount(10)
    await page
      .locator(`#${PACKAGES_LIST_SELECT_ALL_ID}`)
      .click()
    await page.locator('css=.mdi-chevron-left').click()
    await expect(packagesRowsSelector).toHaveCount(21)
    await page
      .locator(`#${PACKAGES_LIST_SELECT_ALL_ID}`)
      .click()
    await page
      .locator(`#${PACKAGES_MULTI_ACTIONS_ID}`)
      .click()
    await speedDialOptionsSelector.waitFor()

    await page
      .locator(`#${PACKAGES_MULTI_DELETE_ID}`)
      .click()

    await speedDialModalSelector.waitFor()
    await expect(packagesTitleSelector).toHaveCount(29)
    await page.locator(`#${CANCEL_BUTTON_ID}`).click()
    await page
      .locator(`#${PACKAGES_LIST_SELECT_ALL_ID}`)
      .click()

    await page
      .locator(`#${PACKAGES_MULTI_ACTIONS_ID}`)
      .click()

    await speedDialOptionsSelector.waitFor()

    await page
      .locator(`#${PACKAGES_MULTI_DELETE_ID}`)
      .click()

    await speedDialModalSelector.waitFor()

    await expect(packagesTitleSelector).toHaveCount(9)
    await page.locator(`#${CANCEL_BUTTON_ID}`).click()
  })

  test('disable the speed dial options when no package is chosen', async ({
    page
  }) => {
    await login(page, 'einstein')
    const packagesRowsSelector = page.locator('role=row')
    await expect(packagesRowsSelector).toHaveCount(21)

    const speedDialOptionSelector = page.locator(
      `#${PACKAGES_MULTI_DELETE_ID}`
    )
    await page
      .locator(`#${PACKAGES_MULTI_ACTIONS_ID}`)
      .click()
    await speedDialOptionSelector.waitFor()

    const deleteLocator = page.locator(
      `#${PACKAGES_MULTI_DELETE_ID}`
    )
    await expect(deleteLocator).toBeDisabled()
  })
})

const TITLE_SERIAL = 'packages multi actions serial'
test.describe(TITLE_SERIAL, { tag: '@serial' }, () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeAll(async ({}, testInfo) => {
    await restoreData(testInfo.project.name)
  })

  test('delete a few packages using speed dial', async ({
    page
  }) => {
    await login(page, 'einstein')
    const packagesRowsSelector = page.locator('role=row')
    await expect(packagesRowsSelector).toHaveCount(21)
    const speedDialOptionSelector = page.locator(
      `#${PACKAGES_MULTI_DELETE_ID}`
    )
    await page
      .locator(
        `#${PACKAGES_LIST_CHECKBOX_ACTIONS_ACCELERATED_NUMPY_010_TESTREPO8_ID}`
      )
      .click()

    await page
      .locator(
        `#${PACKAGES_LIST_CHECKBOX_ACTIONS_ANACODA_0213_TESTREPO4_ID}`
      )
      .click()

    await page
      .locator(`#${PACKAGES_MULTI_ACTIONS_ID}`)
      .click()

    await speedDialOptionSelector.waitFor()
    await page
      .locator(`#${PACKAGES_MULTI_DELETE_ID}`)
      .click()

    const speedDialModalSelector = page.locator(
      `#${PACKAGES_LIST_DELETE_MODAL}`
    )
    await speedDialModalSelector.waitFor()

    const packagesTitleSelector = page.locator(
      'css=.v-card .v-list-item-title'
    )
    await expect(packagesTitleSelector).toHaveCount(2)
    await page.locator(`#${SUBMIT_BUTTON_ID}`).click()
  })
})
