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

import { expect, test } from '@playwright/test'
import {
  PACKAGES_FILTRATION_DELETED_FIELD_ID,
  PACKAGES_FILTRATION_SEARCH_FIELD_ID,
  PACKAGES_FILTRATION_TECHNOLOGY_FIELD_ID,
  PACKAGES_FILTRATION_REPOSITORY_FIELD_ID,
  PACKAGES_FILTRATION_SUBMISSION_STATE_FIELD_ID,
  PACKAGES_FILTRATION_MAINTAINER_FIELD_ID,
  FILTRATION_RESET_BUTTON_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'

const TITLE = 'packages filtration'
test.describe(TITLE, () => {
  test('deleted', async ({ page }) => {
    await login(page, 'einstein')

    const packagesRowsSelector = page.locator('role=row')
    const packagesDeletedSelector = page.locator(
      '.mdi-trash-can.text-grey'
    )

    await expect(packagesRowsSelector).toHaveCount(21)
    await expect(packagesDeletedSelector).toHaveCount(0)

    await page
      .locator(`#${PACKAGES_FILTRATION_DELETED_FIELD_ID}`)
      .click()

    await expect(packagesRowsSelector).toHaveCount(21)
    await expect(packagesDeletedSelector).toHaveCount(4)

    await page
      .locator(`#${PACKAGES_FILTRATION_DELETED_FIELD_ID}`)
      .click()

    await expect(packagesRowsSelector).toHaveCount(7)
    await expect(packagesDeletedSelector).toHaveCount(6)

    await page
      .locator(`#${PACKAGES_FILTRATION_DELETED_FIELD_ID}`)
      .click()

    await expect(packagesRowsSelector).toHaveCount(21)
    await expect(packagesDeletedSelector).toHaveCount(4)
  })

  test('reset button', async ({ page }) => {
    await login(page, 'einstein')
    const packagesRowsSelector = page.locator('role=row')
    await expect(packagesRowsSelector).toHaveCount(21)

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeVisible()

    await page
      .locator(`#${PACKAGES_FILTRATION_SEARCH_FIELD_ID}`)
      .fill('A3')

    await expect(packagesRowsSelector).toHaveCount(4)

    await page
      .locator(`#${FILTRATION_RESET_BUTTON_ID}`)
      .click()

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeHidden()

    await expect(packagesRowsSelector).toHaveCount(21)
  })

  test('submission state', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator('.v-chip__content')
      .filter({ hasText: /^ACCEPTED$/ })
      .first()
      .waitFor()

    const packagesSubmissionStateSelector = page
      .getByRole('combobox')
      .nth(2)
    await packagesSubmissionStateSelector.waitFor()
    await packagesSubmissionStateSelector.click()

    const packageSubmissionStateRejectedOptionSelector =
      page.getByRole('option', { name: 'REJECTED' })

    await packageSubmissionStateRejectedOptionSelector.waitFor()
    await packageSubmissionStateRejectedOptionSelector.click()

    await page
      .getByText('ACCEPTEDREJECTED', { exact: true })
      .waitFor()

    const closableTags = page
      .locator('span')
      .getByLabel('Close')
    await expect(closableTags).toHaveCount(2)

    await page
      .getByRole('button', { name: 'Reset' })
      .click()

    await page
      .locator('.v-chip__content')
      .filter({ hasText: /^ACCEPTED$/ })
      .first()
      .waitFor()
    await expect(closableTags).toHaveCount(1)
  })

  test('should check filtration fields before and after reset', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page.waitForURL('**/packages')
    await expect(page).toHaveTitle(/RDepot - packages/)
    const packagesRowsSelector = page.locator('role=row')

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeVisible()
    await expect(packagesRowsSelector).toHaveCount(21)

    const searchValue = await page.locator(
      `#${PACKAGES_FILTRATION_SEARCH_FIELD_ID}`
    )
    const technologyValue = await page.locator(
      `#${PACKAGES_FILTRATION_TECHNOLOGY_FIELD_ID}`
    )
    const repositoryValue = await page.locator(
      `#${PACKAGES_FILTRATION_REPOSITORY_FIELD_ID}`
    )
    const stateValue = await page.locator(
      `#${PACKAGES_FILTRATION_SUBMISSION_STATE_FIELD_ID}`
    )
    const deletedValue = await page.locator(
      `#${PACKAGES_FILTRATION_DELETED_FIELD_ID}`
    )
    const maintainerValue = await page.locator(
      `#${PACKAGES_FILTRATION_MAINTAINER_FIELD_ID}`
    )

    await expect(await searchValue.inputValue()).toBe('')
    await expect(await technologyValue.inputValue()).toBe(
      ''
    )
    await expect(await repositoryValue.inputValue()).toBe(
      ''
    )
    await expect(await deletedValue.inputValue()).toBe(
      'true'
    )
    await expect(await maintainerValue.inputValue()).toBe(
      ''
    )
    await expect(await stateValue.inputValue()).toBe(
      'ACCEPTED'
    )

    await repositoryValue.waitFor()
    await repositoryValue.click({ force: true })
    await page
      .locator('.v-list-item', { hasText: /^testrepo1$/ })
      .click()

    await page
      .locator(`#${PACKAGES_FILTRATION_SEARCH_FIELD_ID}`)
      .fill('A3')

    await technologyValue.waitFor()
    await technologyValue.click({ force: true })
    await page.getByRole('option', { name: 'R' }).click()

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeVisible()
    await expect(packagesRowsSelector).toHaveCount(2)
    await expect(await searchValue.inputValue()).toBe('A3')
    await expect(await technologyValue.inputValue()).toBe(
      'R'
    )

    await page
      .locator(`#${FILTRATION_RESET_BUTTON_ID}`)
      .click()

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeHidden()
    await expect(packagesRowsSelector).toHaveCount(21)

    await expect(await searchValue.inputValue()).toBe('')
    await expect(await technologyValue.inputValue()).toBe(
      ''
    )
    await expect(await repositoryValue.inputValue()).toBe(
      ''
    )
    await expect(await maintainerValue.inputValue()).toBe(
      ''
    )
    await expect(await deletedValue.inputValue()).toBe(
      'true'
    )
    await expect(await stateValue.inputValue()).toBe(
      'ACCEPTED'
    )
  })

  test('no data available', async ({ page }) => {
    await login(page, 'einstein')

    const packagesRowsSelector = page.locator('role=row')
    await expect(packagesRowsSelector).toHaveCount(21)

    await page
      .locator(`#${PACKAGES_FILTRATION_SEARCH_FIELD_ID}`)
      .fill('aaaaaaaaaa')
    await expect(packagesRowsSelector).toHaveCount(2)

    await expect(
      await page
        .locator('.v-data-table__tbody')
        .textContent()
    ).toContain('No data available')
  })
})
