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
import {
  ACCESS_TOKENS_SIDEBAR_ID,
  EVENTS_SIDEBAR_ID,
  PACKAGE_MAINTAINERS_SIDEBAR_ID,
  PACKAGES_SIDEBAR_ID,
  REPOSITORIES_SIDEBAR_ID,
  REPOSITORY_MAINTAINERS_SIDEBAR_ID,
  SETTINGS_GENERAL_LIST_SIDEBAR_ID,
  SETTINGS_LIST_SIDEBAR_ID,
  SIDEBAR_COLLAPSE_TOGGLE_ID,
  LOGOUT_BUTTON_ID,
  SIDEBAR_VERSION_ID,
  SUBMISSIONS_SIDEBAR_ID,
  UPLOAD_PACKAGES_SIDEBAR_ID,
  USERS_SIDEBAR_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'

const TITLE = 'sidebar navigation'
test.describe(TITLE, () => {
  test('events', async ({ page }) => {
    await login(page, 'einstein')

    await page.locator(`#${EVENTS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/events')
    await expect(page).toHaveTitle(/RDepot - events/)
  })
  test('upload packages', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${UPLOAD_PACKAGES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/upload-packages')
    await expect(page).toHaveTitle(
      /RDepot - upload packages/
    )
  })
  test('packages', async ({ page }) => {
    await login(page, 'einstein')

    await page.locator(`#${EVENTS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/events')

    await page.locator(`#${PACKAGES_SIDEBAR_ID}`).click()
    await page.waitForURL('**/packages')
    await expect(page).toHaveTitle(/RDepot - packages/)
  })
  test('package maintainers', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${PACKAGE_MAINTAINERS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/package-maintainers')
    await expect(page).toHaveTitle(
      /RDepot - package maintainers/
    )
  })
  test('repositories', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')
    await expect(page).toHaveTitle(/RDepot - repositories/)
  })
  test('repository maintainers', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORY_MAINTAINERS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repository-maintainers')
    await expect(page).toHaveTitle(
      /RDepot - repository maintainers/
    )
  })
  test('users', async ({ page }) => {
    await login(page, 'einstein')

    await page.locator(`#${USERS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/users')
    await expect(page).toHaveTitle(/RDepot - users/)
  })
  test('submissions', async ({ page }) => {
    await login(page, 'einstein')

    await page.locator(`#${SUBMISSIONS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/submissions')
    await expect(page).toHaveTitle(/RDepot - submissions/)
  })
  test('general settings', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${SETTINGS_LIST_SIDEBAR_ID}`)
      .click()
    await page
      .locator(`#${SETTINGS_GENERAL_LIST_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/settings-general')
    await expect(page).toHaveTitle(/RDepot - settings/)
  })
  test('tokens', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${SETTINGS_LIST_SIDEBAR_ID}`)
      .click()
    await page
      .locator(`#${ACCESS_TOKENS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/settings-tokens')
    await expect(page).toHaveTitle(/RDepot - access tokens/)
  })
})

test.describe('sidebar collapse', () => {
  test('collapse toggle button is visible', async ({
    page
  }) => {
    await login(page, 'einstein')

    await expect(
      page.locator(`#${SIDEBAR_COLLAPSE_TOGGLE_ID}`)
    ).toBeVisible()
  })

  test('clicking collapse toggle hides settings group', async ({
    page
  }) => {
    await login(page, 'einstein')

    await expect(
      page.locator(`#${SETTINGS_LIST_SIDEBAR_ID}`)
    ).toBeVisible()

    await page
      .locator(`#${SIDEBAR_COLLAPSE_TOGGLE_ID}`)
      .click()

    await expect(
      page.locator(`#${SETTINGS_LIST_SIDEBAR_ID}`)
    ).toBeHidden()
  })

  test('collapsed sidebar still allows navigation to settings', async ({
    page
  }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${SIDEBAR_COLLAPSE_TOGGLE_ID}`)
      .click()

    await page
      .locator('a[href="/settings-general"]')
      .click()
    await page.waitForURL('**/settings-general')
    await expect(page).toHaveTitle(/RDepot - settings/)
  })

  test('collapsed sidebar still allows navigation to tokens', async ({
    page
  }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${SIDEBAR_COLLAPSE_TOGGLE_ID}`)
      .click()

    await page.locator('a[href="/settings-tokens"]').click()
    await page.waitForURL('**/settings-tokens')
    await expect(page).toHaveTitle(/RDepot - access tokens/)
  })

  test('version text is hidden in collapsed mode', async ({
    page
  }) => {
    await login(page, 'einstein')

    await expect(
      page.locator(`#${SIDEBAR_VERSION_ID}`)
    ).toBeVisible()

    await page
      .locator(`#${SIDEBAR_COLLAPSE_TOGGLE_ID}`)
      .click()

    await expect(
      page.locator(`#${SIDEBAR_VERSION_ID}`)
    ).toBeHidden()
  })

  test('expanding sidebar restores settings group', async ({
    page
  }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${SIDEBAR_COLLAPSE_TOGGLE_ID}`)
      .click()
    await expect(
      page.locator(`#${SETTINGS_LIST_SIDEBAR_ID}`)
    ).toBeHidden()

    await page
      .locator(`#${SIDEBAR_COLLAPSE_TOGGLE_ID}`)
      .click()
    await expect(
      page.locator(`#${SETTINGS_LIST_SIDEBAR_ID}`)
    ).toBeVisible()
  })

  test('logout button is visible when expanded', async ({
    page
  }) => {
    await login(page, 'einstein')

    await expect(
      page.locator(`#${LOGOUT_BUTTON_ID}`)
    ).toBeVisible()
  })

  test('events navigation works in collapsed mode', async ({
    page
  }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${SIDEBAR_COLLAPSE_TOGGLE_ID}`)
      .click()

    await page.locator(`#${EVENTS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/events')
    await expect(page).toHaveTitle(/RDepot - events/)
  })
})
