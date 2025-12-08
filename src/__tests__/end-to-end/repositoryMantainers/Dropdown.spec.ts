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
  ADD_REPOSITORY_MAINTAINER_ID,
  ALBERT_EINSTEIN_ID,
  CREATE_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID,
  CREATE_REPOSITORY_MAINTAINER_USER_INPUT_ID,
  REPOSITORY_MAINTAINERS_SIDEBAR_ID,
  REPOSITORIES_SIDEBAR_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'
import { addRepositories } from '@/__tests__/end-to-end/helpers/restoreData'

const TITLE = 'repository maintainers create form dropdown'
test.describe(TITLE, { tag: '@serial' }, () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeAll(async ({}, testInfo) => {
    await addRepositories(testInfo.project.name)
  })

  test('load all repositories', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')

    await page
      .locator(`#${REPOSITORY_MAINTAINERS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repository-maintainers')

    const createMaintainerButtonSelector = page.locator(
      `#${ADD_REPOSITORY_MAINTAINER_ID}`
    )
    await createMaintainerButtonSelector.waitFor()
    await createMaintainerButtonSelector.click()

    const repositoryInputField = page.locator(
      `#${CREATE_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID}`
    )

    await page
      .locator(
        `#${CREATE_REPOSITORY_MAINTAINER_USER_INPUT_ID}`
      )
      .click({ force: true })

    const albertEinsteinSelector = page.locator(
      `#${ALBERT_EINSTEIN_ID}`
    )
    await albertEinsteinSelector.waitFor()
    await albertEinsteinSelector.click()

    await repositoryInputField.click({ force: true })

    await page.hover('#select-input-repository-testrepo1')
    await page.mouse.wheel(0, 400)
    await page.mouse.wheel(0, 400)

    await expect(
      page.locator('#select-input-repository-testrepo20')
    ).toHaveCount(1)
  })
})
