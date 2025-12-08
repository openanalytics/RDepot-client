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
  REPOSITORIES_FILTRATION_SEARCH_FIELD_ID,
  REPOSITORIES_SIDEBAR_ID,
  FILTRATION_RESET_BUTTON_ID,
  REPOSITORIES_FILTRATION_TECHNOLOGY_FIELD_ID,
  REPOSITORIES_FILTRATION_MAINTAINER_FIELD_ID,
  REPOSITORIES_FILTRATION_DELETED_FIELD_ID
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
      {
        checked: true
      }
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

    await expect(repositoriesRowsSelector).toHaveCount(5)
    await expect(repositoryPublishedSelector).toHaveCount(0)

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

    await expect(repositoriesRowsSelector).toHaveCount(4)
    await expect(repositoryPublishedSelector).toHaveCount(4)
  })

  test('reset button', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')
    const repositoriesRowsSelector =
      page.locator('role=row')

    await expect(repositoriesRowsSelector).toHaveCount(8)

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeHidden()

    await page
      .locator(
        `#${REPOSITORIES_FILTRATION_PUBLISHED_FIELD_ID}`
      )
      .click()
    await expect(repositoriesRowsSelector).toHaveCount(5)

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeVisible()

    await page
      .locator(`#${FILTRATION_RESET_BUTTON_ID}`)
      .click()

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeHidden()
    await expect(repositoriesRowsSelector).toHaveCount(8)
  })

  test('should check filtration fields before and after reset', async ({
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

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeHidden()
    await expect(repositoriesRowsSelector).toHaveCount(8)

    const searchValue = await page.locator(
      `#${REPOSITORIES_FILTRATION_SEARCH_FIELD_ID}`
    )
    const technologyValue = await page.locator(
      `#${REPOSITORIES_FILTRATION_TECHNOLOGY_FIELD_ID}`
    )
    const maintainerValue = await page.locator(
      `#${REPOSITORIES_FILTRATION_MAINTAINER_FIELD_ID}`
    )
    const deletedValue = await page.locator(
      `#${REPOSITORIES_FILTRATION_DELETED_FIELD_ID}`
    )

    await expect(await searchValue.inputValue()).toBe('')
    await expect(await technologyValue.inputValue()).toBe(
      ''
    )
    await expect(await maintainerValue.inputValue()).toBe(
      ''
    )
    await expect(await deletedValue.inputValue()).toBe(
      'true'
    )

    await technologyValue.waitFor()
    await technologyValue.click({ force: true })

    await page.getByRole('option', { name: 'R' }).click()

    await page
      .locator(
        `#${REPOSITORIES_FILTRATION_SEARCH_FIELD_ID}`
      )
      .fill('2')

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeVisible()
    await expect(repositoriesRowsSelector).toHaveCount(2)
    await expect(await searchValue.inputValue()).toBe('2')
    await expect(await technologyValue.inputValue()).toBe(
      'R'
    )

    await page
      .locator(`#${FILTRATION_RESET_BUTTON_ID}`)
      .click()

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeHidden()
    await expect(repositoriesRowsSelector).toHaveCount(8)

    await expect(await searchValue.inputValue()).toBe('')
    await expect(await technologyValue.inputValue()).toBe(
      ''
    )
    await expect(await maintainerValue.inputValue()).toBe(
      ''
    )
    await expect(await deletedValue.inputValue()).toBe(
      'true'
    )
  })

  test('no data available', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')

    const repositoriesRowsSelector =
      page.locator('role=row')
    await expect(repositoriesRowsSelector).toHaveCount(8)

    await page
      .locator(
        `#${REPOSITORIES_FILTRATION_SEARCH_FIELD_ID}`
      )
      .fill('aaaaaaaaaa')
    await expect(repositoriesRowsSelector).toHaveCount(2)

    await expect(
      await page
        .locator('.v-data-table__tbody')
        .textContent()
    ).toContain('No data available')
  })
})
