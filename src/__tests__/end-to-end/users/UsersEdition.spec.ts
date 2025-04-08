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
  EDIT_USER_PACKAGE_MAINTAINER_ID,
  EDIT_USER_ROLE_FIELD_ID,
  EDIT_USER_USER_ID,
  SUBMIT_BUTTON_ID,
  USERS_SIDEBAR_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '@/__tests__/end-to-end/helpers/login'
import { restoreData } from '@/__tests__/end-to-end/helpers/restoreData'

// eslint-disable-next-line no-empty-pattern
test.beforeAll(async ({}, testInfo) => {
  await restoreData(testInfo.project.name)
})

const TITLE = 'users edition'
test.describe.only(TITLE, { tag: '@serial' }, () => {
  test('edit role (upgrade)', async ({ page }) => {
    await login(page, 'einstein')

    await page.locator(`#${USERS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/users')
    await expect(page).toHaveTitle(/RDepot - users/)

    const userDisabledEditionSelector = page.locator(
      '.mdi-pencil.text-grey'
    )
    const usersRowsSelector = page.locator('role=row')
    await expect(usersRowsSelector).toHaveCount(8)
    await expect(userDisabledEditionSelector).toHaveCount(2)
    await expect(
      page.getByRole('cell', { name: 'User', exact: true })
    ).toHaveCount(3)
    await expect(
      page.getByRole('cell', { name: 'Admin', exact: true })
    ).toHaveCount(2)

    await page.locator(`#${EDIT_USER_USER_ID}`).click()

    await page
      .locator(`#${EDIT_USER_ROLE_FIELD_ID}`)
      .press('Enter')
    await page
      .getByRole('option', { name: 'Admin' })
      .press('Enter')

    await page.locator(`#${SUBMIT_BUTTON_ID}`).click()

    await expect(userDisabledEditionSelector).toHaveCount(3)
    await expect(
      page.getByRole('cell', { name: 'User', exact: true })
    ).toHaveCount(2)
    await expect(
      page.getByRole('cell', { name: 'Admin', exact: true })
    ).toHaveCount(3)
  })

  test('edit role (downgrade)', async ({ page }) => {
    await login(page, 'einstein')

    await page.locator(`#${USERS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/users')
    await expect(page).toHaveTitle(/RDepot - users/)

    await expect(
      page.getByRole('cell', {
        name: 'Package maintainer',
        exact: true
      })
    ).toHaveCount(1)
    await expect(
      page.getByRole('cell', {
        name: 'Repository maintainer',
        exact: true
      })
    ).toHaveCount(1)

    await page
      .locator(`#${EDIT_USER_PACKAGE_MAINTAINER_ID}`)
      .click()
    await page
      .locator(`#${EDIT_USER_ROLE_FIELD_ID}`)
      .press('Enter')
    await page
      .getByRole('option', {
        name: 'Repository maintainer'
      })
      .press('Enter')

    await page.locator(`#${SUBMIT_BUTTON_ID}`).click()
    await expect(
      page.getByRole('cell', {
        name: 'Package maintainer',
        exact: true
      })
    ).toHaveCount(0)
    await expect(
      page.getByRole('cell', {
        name: 'Repository maintainer',
        exact: true
      })
    ).toHaveCount(2)
  })
})
