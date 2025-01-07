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
  REPOSITORIES_FILTRATION_PUBLISHED_FIELD_ID,
  REPOSITORIES_SIDEBAR_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'

const TITLE = 'repositories filtration'
test.describe(TITLE, () => {
  test('published', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')

    const repositoryPublishedSelector = page.getByRole(
      'checkbox',
      { checked: true }
    )
    const repositoriesRowsSelector =
      page.locator('role=row')
    await expect(repositoriesRowsSelector).toHaveCount(8)
    await expect(repositoryPublishedSelector).toHaveCount(3)

    await page
      .locator(
        `#${REPOSITORIES_FILTRATION_PUBLISHED_FIELD_ID}`
      )
      .click()

    await expect(repositoriesRowsSelector).toHaveCount(4)
    await expect(repositoryPublishedSelector).toHaveCount(4)

    await page
      .locator(
        `#${REPOSITORIES_FILTRATION_PUBLISHED_FIELD_ID}`
      )
      .click()

    await expect(repositoriesRowsSelector).toHaveCount(8)
    await expect(repositoryPublishedSelector).toHaveCount(3)

    await page
      .locator(
        `#${REPOSITORIES_FILTRATION_PUBLISHED_FIELD_ID}`
      )
      .click()

    await expect(repositoriesRowsSelector).toHaveCount(5)
    await expect(repositoryPublishedSelector).toHaveCount(0)
  })
})
