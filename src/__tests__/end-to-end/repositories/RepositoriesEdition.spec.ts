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
  EDIT_REPOSITORY_HASH_METHOD_FIELD_ID,
  EDIT_REPOSITORY_SUBMIT_ID,
  EDIT_REPOSITORY_TESTREPO8_ICON_ID,
  REPOSITORIES_LIST_PYTHON_REPO_ID,
  REPOSITORIES_SIDEBAR_ID,
  EDIT_REPOSITORY_SERVER_ADDRESS_ALERT,
  EDIT_REPOSITORY_SERVER_ADDRESS_FIELD_ID,
  REPOSITORY_DESCRIPTION_HASH_METHOD_ID,
  EDIT_REPOSITORY_PUBLICATION_URI_FIELD_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'
import { restoreData } from '@/__tests__/end-to-end/helpers/restoreData'

// eslint-disable-next-line no-empty-pattern
test.beforeAll(async ({}, testInfo) => {
  await restoreData(testInfo.project.name)
})

const TITLE = 'repositories edition'
test.describe(TITLE, { tag: '@serial' }, () => {
  test('server address alert as admin', async ({
    page
  }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')
    await expect(page).toHaveTitle(/RDepot - repositories/)

    const repositoriesRowsSelector =
      page.locator('role=row')
    await expect(repositoriesRowsSelector).toHaveCount(8)

    await page
      .locator(`#${EDIT_REPOSITORY_TESTREPO8_ICON_ID}`)
      .click()
    const serverAddressAlert = page.locator(
      `#${EDIT_REPOSITORY_SERVER_ADDRESS_ALERT}`
    )
    await expect(serverAddressAlert).toHaveCount(0)

    await page
      .locator(
        `#${EDIT_REPOSITORY_SERVER_ADDRESS_FIELD_ID}`
      )
      .click()

    await page
      .locator(
        `#${EDIT_REPOSITORY_PUBLICATION_URI_FIELD_ID}`
      )
      .click()
    await serverAddressAlert.waitFor()

    expect(
      await serverAddressAlert.textContent()
    ).toContain(
      'http://oa-rdepot-repo:8080/python/testrepo8'
    )
  })

  test('server address alert as user', async ({ page }) => {
    await login(page, 'tesla')

    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')
    await expect(page).toHaveTitle(/RDepot - repositories/)

    const repositoriesRowsSelector =
      page.locator('role=row')
    await expect(repositoriesRowsSelector).toHaveCount(8)

    await page
      .locator(`#${EDIT_REPOSITORY_TESTREPO8_ICON_ID}`)
      .click()
    const serverAddressAlert = page.locator(
      `#${EDIT_REPOSITORY_SERVER_ADDRESS_ALERT}`
    )
    await expect(serverAddressAlert).toHaveCount(0)

    await page
      .locator(
        `#${EDIT_REPOSITORY_SERVER_ADDRESS_FIELD_ID}`
      )
      .click()

    await page
      .locator(
        `#${EDIT_REPOSITORY_PUBLICATION_URI_FIELD_ID}`
      )
      .click()

    await expect(serverAddressAlert).toHaveCount(0)
  })

  test('hash field', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')
    await expect(page).toHaveTitle(/RDepot - repositories/)

    const repositoryToEditSelection = page.locator(
      `#${REPOSITORIES_LIST_PYTHON_REPO_ID}`
    )

    const repositoriesRowsSelector =
      page.locator('role=row')
    await expect(repositoriesRowsSelector).toHaveCount(8)

    await repositoryToEditSelection.click()
    await page
      .locator(`#${REPOSITORY_DESCRIPTION_HASH_METHOD_ID}`)
      .waitFor()

    const repositoryHashMethodSelector =
      page.getByText('SHA256')
    expect(repositoryHashMethodSelector).toHaveCount(1)

    await page
      .locator(`#${EDIT_REPOSITORY_TESTREPO8_ICON_ID}`)
      .click()

    await page
      .locator(`#${EDIT_REPOSITORY_HASH_METHOD_FIELD_ID}`)
      .click({ force: true })

    await page.getByText('SHA512').waitFor()
    await page.getByText('SHA512').click()

    await page
      .locator(`#${EDIT_REPOSITORY_SUBMIT_ID}`)
      .click()

    const editRepositoryHashFieldSelector = page.locator(
      `#${EDIT_REPOSITORY_HASH_METHOD_FIELD_ID}`
    )
    await expect(
      editRepositoryHashFieldSelector
    ).toHaveCount(0)

    await expect(
      page.locator(`#${EDIT_REPOSITORY_TESTREPO8_ICON_ID}`)
    ).toHaveCount(1)

    await repositoryToEditSelection.click()
    await expect(
      page.locator(
        `#${REPOSITORY_DESCRIPTION_HASH_METHOD_ID}`
      )
    ).toHaveCount(0)
    await repositoryToEditSelection.click()
    await expect(
      page.locator(
        `#${REPOSITORY_DESCRIPTION_HASH_METHOD_ID}`
      )
    ).toHaveCount(1)
    const repositoryNewHashMethodSelector =
      page.getByText('SHA512')
    await expect(repositoryHashMethodSelector).toHaveCount(
      0
    )
    await expect(
      repositoryNewHashMethodSelector
    ).toHaveCount(1)
  })
})
