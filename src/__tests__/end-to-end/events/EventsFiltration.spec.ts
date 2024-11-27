/*
 * R Depot
 *
 * Copyright (C) 2012-2024 Open Analytics NV
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
  EVENTS_FILTRATION_FROM_DATE_FIELD_ID,
  EVENTS_FILTRATION_TO_DATE_FIELD_ID,
  EVENTS_SIDEBAR_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'

const TITLE = 'events filtration'
test.describe(TITLE, () => {
  test('the same from and to date', async ({ page }) => {
    await login(page, 'einstein')
    await page.locator(`#${EVENTS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/events')
    const toDateFieldLocator = page.locator(
      `#${EVENTS_FILTRATION_TO_DATE_FIELD_ID}`
    )

    const selectYearInputSelector = page.locator(
      '.v-date-picker-controls__mode-btn'
    )
    const selectMonthInputSelector = page.locator(
      '.v-date-picker-controls__month-btn'
    )
    const select2023YearSelector = page.locator(
      'button span:text("2023")'
    )

    const select12MonthSelector = page.locator(
      'button span:text("Dec")'
    )

    const select07DaySelector = page.locator(
      'button span:text-is("7")'
    )
    const selectDateSelector = page.locator(
      '.v-picker-title'
    )

    const progressCircularSelector = page.locator(
      '.progressCircular'
    )

    const selectedDateChipSelector = page.locator(
      '.v-chip__content:text-is("2023.12.07")'
    )

    await toDateFieldLocator.waitFor()
    await toDateFieldLocator.click()

    await selectDateSelector.waitFor()
    await selectYearInputSelector.waitFor()
    await selectYearInputSelector.click()
    await select2023YearSelector.waitFor()
    await select2023YearSelector.click()
    await selectMonthInputSelector.waitFor()
    await selectMonthInputSelector.click()
    await select12MonthSelector.waitFor()
    await select12MonthSelector.click()
    await select07DaySelector.waitFor()
    await select07DaySelector.click()

    await expect(progressCircularSelector).toHaveCSS(
      'display',
      'none'
    )
    const fromDateFieldLocator = page.locator(
      `#${EVENTS_FILTRATION_FROM_DATE_FIELD_ID}`
    )
    await fromDateFieldLocator.waitFor()
    await fromDateFieldLocator.click()

    await selectDateSelector.waitFor()
    await selectYearInputSelector.waitFor()
    await selectYearInputSelector.click()
    await select2023YearSelector.waitFor()
    await select2023YearSelector.click()
    await selectMonthInputSelector.waitFor()
    await selectMonthInputSelector.click()
    await select12MonthSelector.waitFor()
    await select12MonthSelector.click()
    await select07DaySelector.waitFor()
    await select07DaySelector.click()

    await expect(progressCircularSelector).toHaveCSS(
      'display',
      'none'
    )

    const vCardSelector = page.locator('.v-card-title')

    await expect(vCardSelector).toHaveCount(1)
    await expect(selectedDateChipSelector).toHaveCount(2)
  })
})
