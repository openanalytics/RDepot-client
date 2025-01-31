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
import {
  DELETE_USER_ROLE_ADMIN_LOGGED_IN_ID,
  DELETE_USER_ROLE_USER_ID,
  SUBMIT_USER_DELETION_BUTTON_ID,
  USERS_SIDEBAR_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '@/__tests__/end-to-end/helpers/login'
import { restoreData } from '@/__tests__/end-to-end/helpers/restoreData'

// eslint-disable-next-line no-empty-pattern
test.beforeAll(async ({}, testInfo) => {
  await restoreData(testInfo.project.name)
})

const TITLE = 'users filtration'
test.describe(TITLE, { tag: '@serial' }, () => {
  test('deleted', async ({ page }) => {
    await login(page, 'einstein')

    await page.locator(`#${USERS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/users')
    await expect(page).toHaveTitle(/RDepot - users/)

    const userDisabledDeletionSelector = page.locator(
      '.mdi-trash-can.text-grey'
    )
    const usersRowsSelector = page.locator('role=row')
    await expect(usersRowsSelector).toHaveCount(8)
    await expect(userDisabledDeletionSelector).toHaveCount(
      1
    )

    await page
      .locator(`#${DELETE_USER_ROLE_USER_ID}`)
      .click()

    const modalLocator = page.locator(
      `#${SUBMIT_USER_DELETION_BUTTON_ID}`
    )
    modalLocator.waitFor()
    page
      .locator(`#${SUBMIT_USER_DELETION_BUTTON_ID}`)
      .click()

    await expect(userDisabledDeletionSelector).toHaveCount(
      2
    )

    const meLocator = page.locator(
      `#${DELETE_USER_ROLE_ADMIN_LOGGED_IN_ID}`
    )
    const deletedUserLocator = page.locator(
      `#${DELETE_USER_ROLE_USER_ID}`
    )

    expect(meLocator).toHaveClass(/text-grey/)
    expect(deletedUserLocator).toHaveClass(/text-grey/)
  })
})
