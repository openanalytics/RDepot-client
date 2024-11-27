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
  PACKAGES_LIST_DELETE_A3_092_TESTREPO3_ID,
  PACKAGES_LIST_DELETE_MODAL,
  SUBMIT_BUTTON_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'
import { restoreData } from '@/__tests__/end-to-end/helpers/restoreData'

const TITLE = 'packages single actions'
test.describe(TITLE, { tag: '@serial' }, () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeAll(async ({}, testInfo) => {
    await restoreData(testInfo.project.name)
  })

  test('delete', async ({ page }) => {
    await login(page, 'einstein')
    const deletePackageSelector = page.locator(
      `#${PACKAGES_LIST_DELETE_A3_092_TESTREPO3_ID}`
    )

    await deletePackageSelector.click()
    const deletePackagesModalSelector = page.locator(
      `#${PACKAGES_LIST_DELETE_MODAL}`
    )
    deletePackagesModalSelector.waitFor()
    const packagesToDeleteSelector = page.locator(
      `#${PACKAGES_LIST_DELETE_MODAL} .v-list-item-title`
    )
    await expect(packagesToDeleteSelector).toHaveCount(1)
    await page.locator(`#${SUBMIT_BUTTON_ID}`).click()

    await expect(deletePackageSelector).toHaveCount(0)
  })
})
