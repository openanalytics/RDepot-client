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
  REPOSITORY_MAINTAINERS_FILTRATION_DELETED_FIELD_ID,
  REPOSITORY_MAINTAINERS_FILTRATION_SEARCH_FIELD_ID,
  REPOSITORY_MAINTAINERS_FILTRATION_TECHNOLOGY_FIELD_ID,
  REPOSITORY_MAINTAINERS_SIDEBAR_ID,
  FILTRATION_RESET_BUTTON_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'

const TITLE = 'repository maintainers filtration'
test.describe(TITLE, () => {
  test('deleted', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORY_MAINTAINERS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repository-maintainers')

    const maintainerDeletedSelector = page.locator(
      '.mdi-trash-can.text-grey'
    )
    const maintainersRowsSelector = page.locator('role=row')
    await expect(maintainersRowsSelector).toHaveCount(7)
    await expect(maintainerDeletedSelector).toHaveCount(1)

    await page
      .locator(
        `#${REPOSITORY_MAINTAINERS_FILTRATION_DELETED_FIELD_ID}`
      )
      .click()

    await expect(maintainersRowsSelector).toHaveCount(6)
    await expect(maintainerDeletedSelector).toHaveCount(0)

    await page
      .locator(
        `#${REPOSITORY_MAINTAINERS_FILTRATION_DELETED_FIELD_ID}`
      )
      .click()

    await expect(maintainersRowsSelector).toHaveCount(7)
    await expect(maintainerDeletedSelector).toHaveCount(1)

    await page
      .locator(
        `#${REPOSITORY_MAINTAINERS_FILTRATION_DELETED_FIELD_ID}`
      )
      .click()

    await expect(maintainersRowsSelector).toHaveCount(2)
    await expect(maintainerDeletedSelector).toHaveCount(1)
  })

  test('reset button', async ({ page }) => {
    await login(page, 'einstein')
    await page
      .locator(`#${REPOSITORY_MAINTAINERS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repository-maintainers')
    const maintainersRowsSelector = page.locator('role=row')
    await expect(maintainersRowsSelector).toHaveCount(7)

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeHidden()
    await page
      .locator(
        `#${REPOSITORY_MAINTAINERS_FILTRATION_DELETED_FIELD_ID}`
      )
      .click()
    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeVisible()

    await expect(maintainersRowsSelector).toHaveCount(6)

    await page
      .locator(`#${FILTRATION_RESET_BUTTON_ID}`)
      .click()

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeHidden()

    await expect(maintainersRowsSelector).toHaveCount(7)
  })

  test('should check filtration fields before and after reset', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page
      .locator(`#${REPOSITORY_MAINTAINERS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repository-maintainers')
    await expect(page).toHaveTitle(
      /RDepot - repository maintainers/
    )
    const maintainersRowsSelector = page.locator('role=row')

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeHidden()
    await expect(maintainersRowsSelector).toHaveCount(7)

    const searchValue = await page.locator(
      `#${REPOSITORY_MAINTAINERS_FILTRATION_SEARCH_FIELD_ID}`
    )
    const deletedValue = await page.locator(
      `#${REPOSITORY_MAINTAINERS_FILTRATION_DELETED_FIELD_ID}`
    )
    const technologyValue = await page.locator(
      `#${REPOSITORY_MAINTAINERS_FILTRATION_TECHNOLOGY_FIELD_ID}`
    )

    await expect(await searchValue.inputValue()).toBe('')
    await expect(await deletedValue.inputValue()).toBe(
      'true'
    )
    await expect(await technologyValue.inputValue()).toBe(
      ''
    )

    await technologyValue.waitFor()
    await technologyValue.click({ force: true })

    await page.getByRole('option', { name: 'R' }).click()

    await page
      .locator(
        `#${REPOSITORY_MAINTAINERS_FILTRATION_SEARCH_FIELD_ID}`
      )
      .fill('Tesla')

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeVisible()
    await expect(maintainersRowsSelector).toHaveCount(4)
    await expect(await searchValue.inputValue()).toBe(
      'Tesla'
    )
    await expect(await technologyValue.inputValue()).toBe(
      'R'
    )

    await page
      .locator(`#${FILTRATION_RESET_BUTTON_ID}`)
      .click()

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeHidden()
    await expect(maintainersRowsSelector).toHaveCount(7)

    await expect(await searchValue.inputValue()).toBe('')
    await expect(await technologyValue.inputValue()).toBe(
      ''
    )
  })

  test('displays no data available text', async ({
    page
  }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORY_MAINTAINERS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repository-maintainers')

    const maintainersRowsSelector = page.locator('role=row')
    await expect(maintainersRowsSelector).toHaveCount(7)

    await page
      .locator(
        `#${REPOSITORY_MAINTAINERS_FILTRATION_SEARCH_FIELD_ID}`
      )
      .fill('aaaaaaaaaa')
    await expect(maintainersRowsSelector).toHaveCount(2)
    await expect(
      await page
        .locator('.v-data-table__tbody')
        .textContent()
    ).toContain('No data available')
  })
})
