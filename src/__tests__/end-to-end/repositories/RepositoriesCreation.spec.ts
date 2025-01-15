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
  ADD_MAINTAINER_ID,
  CREATE_REPOSITORY_SERVER_ADDRESS_FIELD_ID,
  CREATE_REPOSITORY_PUBLICATION_URI_FIELD_ID,
  CREATE_REPOSITORY_TECHNOLOGY,
  REPOSITORIES_SIDEBAR_ID,
  EDIT_REPOSITORY_SERVER_ADDRESS_ALERT
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

    const createRepositorySelector = page.locator(
      `#${ADD_MAINTAINER_ID}`
    )
    await createRepositorySelector.waitFor()
    await createRepositorySelector.click()

    const serverAddressAlert = page.locator(
      `#${EDIT_REPOSITORY_SERVER_ADDRESS_ALERT}`
    )
    await expect(serverAddressAlert).toHaveCount(0)

    await page
      .locator(`#${CREATE_REPOSITORY_TECHNOLOGY}`)
      .click({ force: true })
    await page
      .locator('div.v-list-item-title:has-text("Python")')
      .waitFor()
    await page
      .locator('div.v-list-item-title:has-text("Python")')
      .click()

    await page
      .locator(
        `#${CREATE_REPOSITORY_SERVER_ADDRESS_FIELD_ID}`
      )
      .fill('http://oa-rdepot-repo:8080/testrepositoryint')

    await page
      .locator(
        `#${CREATE_REPOSITORY_PUBLICATION_URI_FIELD_ID}`
      )
      .click()
    await serverAddressAlert.waitFor()

    expect(
      await serverAddressAlert.textContent()
    ).toContain(
      'http://oa-rdepot-repo:8080/python/testrepositoryint'
    )
  })
})
