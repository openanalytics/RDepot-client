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
  SUBMISSIONS_FILTRATION_SEARCH_FIELD_ID,
  SUBMISSIONS_FILTRATION_STATE_FIELD_ID,
  SUBMISSIONS_FILTRATION_TO_DATE_FIELD_ID,
  SUBMISSIONS_FILTRATION_FROM_DATE_FIELD_ID,
  SUBMISSIONS_FILTRATION_TECHNOLOGY_FIELD_ID,
  SUBMISSIONS_FILTRATION_REPOSITORY_FIELD_ID,
  SUBMISSIONS_FILTRATION_REPOSITORY_FIELD_TESTREPO1_ID,
  SUBMISSIONS_SIDEBAR_ID,
  FILTRATION_RESET_BUTTON_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'

const TITLE = 'submissions filtration'
test.describe(TITLE, () => {
  test('reset button', async ({ page }) => {
    await login(page, 'einstein')
    await page.locator(`#${SUBMISSIONS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/submissions')
    await expect(page).toHaveTitle(/RDepot - submissions/)
    const submissionsRowsSelector = page.locator('role=row')

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeHidden()
    await expect(submissionsRowsSelector).toHaveCount(21)

    await page
      .locator(`#${SUBMISSIONS_FILTRATION_SEARCH_FIELD_ID}`)
      .fill('A3')
    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeVisible()
    await expect(submissionsRowsSelector).toHaveCount(7)

    await page
      .locator(`#${FILTRATION_RESET_BUTTON_ID}`)
      .click()

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeHidden()
    await expect(submissionsRowsSelector).toHaveCount(21)
  })

  test('should check filtration fields before and after reset', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page.locator(`#${SUBMISSIONS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/submissions')
    await expect(page).toHaveTitle(/RDepot - submissions/)
    const submissionsRowsSelector = page.locator('role=row')

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeHidden()
    await expect(submissionsRowsSelector).toHaveCount(21)

    const searchValue = await page.locator(
      `#${SUBMISSIONS_FILTRATION_SEARCH_FIELD_ID}`
    )
    const technologyValue = await page.locator(
      `#${SUBMISSIONS_FILTRATION_TECHNOLOGY_FIELD_ID}`
    )
    const repositoryValue = await page.locator(
      `#${SUBMISSIONS_FILTRATION_REPOSITORY_FIELD_ID}`
    )
    const stateValue = await page.locator(
      `#${SUBMISSIONS_FILTRATION_STATE_FIELD_ID}`
    )
    const fromDateValue = await page.locator(
      `#${SUBMISSIONS_FILTRATION_FROM_DATE_FIELD_ID}`
    )
    const toDateValue = await page.locator(
      `#${SUBMISSIONS_FILTRATION_TO_DATE_FIELD_ID}`
    )

    await expect(await searchValue.inputValue()).toBe('')
    await expect(await technologyValue.inputValue()).toBe(
      ''
    )
    await expect(await repositoryValue.inputValue()).toBe(
      ''
    )
    await expect(await fromDateValue.inputValue()).toBe('')
    await expect(await toDateValue.inputValue()).toBe('')
    await expect(await stateValue.inputValue()).toBe('')

    await repositoryValue.waitFor()
    await repositoryValue.click({ force: true })
    const testrepo1 = page.locator(
      `#${SUBMISSIONS_FILTRATION_REPOSITORY_FIELD_TESTREPO1_ID}`
    )
    await testrepo1.waitFor()
    await testrepo1.click()

    await page
      .locator(`#${SUBMISSIONS_FILTRATION_SEARCH_FIELD_ID}`)
      .fill('A3')

    await technologyValue.waitFor()
    await technologyValue.click({ force: true })

    await page.getByRole('option', { name: 'R' }).click()

    await expect(
      page.locator(`#${FILTRATION_RESET_BUTTON_ID}`)
    ).toBeVisible()
    await expect(submissionsRowsSelector).toHaveCount(3)
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
    await expect(submissionsRowsSelector).toHaveCount(21)

    await expect(await searchValue.inputValue()).toBe('')
    await expect(await technologyValue.inputValue()).toBe(
      ''
    )
    await expect(await repositoryValue.inputValue()).toBe(
      ''
    )
    await expect(await fromDateValue.inputValue()).toBe('')
    await expect(await toDateValue.inputValue()).toBe('')
    await expect(await stateValue.inputValue()).toBe('')
  })
})
