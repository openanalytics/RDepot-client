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
  DELETE_REPO_2_ICON_ID,
  DELETE_REPO_3_ICON_ID,
  DELETE_REPOSITORY_CANCEL_ID,
  DELETE_REPOSITORY_SUBMIT_ID,
  REPOSITORIES_SIDEBAR_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'
import { restoreData } from '@/__tests__/end-to-end/helpers/restoreData'

// eslint-disable-next-line no-empty-pattern
test.beforeAll(async ({}, testInfo) => {
  await restoreData(testInfo.project.name)
})

const TITLE = 'repository actions'
test.describe(TITLE, { tag: '@serial' }, () => {
  test('soft deletion', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')

    const repositoryToEditSelection = page.locator(
      `#${DELETE_REPO_2_ICON_ID}`
    )
    await repositoryToEditSelection.waitFor()
    await repositoryToEditSelection.click()

    const deleteRepositoryModalSelector = page.locator(
      `#${DELETE_REPOSITORY_SUBMIT_ID}`
    )
    await deleteRepositoryModalSelector.waitFor()
    await deleteRepositoryModalSelector.click()

    await expect(repositoryToEditSelection).toHaveCount(0)
  })
  test('soft deletion - cancel', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')

    const repositoryToEditSelection = page.locator(
      `#${DELETE_REPO_3_ICON_ID}`
    )
    await repositoryToEditSelection.waitFor()
    await repositoryToEditSelection.click()

    const deleteRepositoryModalSelector = page.locator(
      `#${DELETE_REPOSITORY_CANCEL_ID}`
    )
    await deleteRepositoryModalSelector.waitFor()
    await deleteRepositoryModalSelector.click()

    await expect(repositoryToEditSelection).toHaveCount(1)
  })
})
