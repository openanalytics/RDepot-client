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
import { login } from '../helpers/login'
import { i18n } from '@/plugins/i18n'
import {
  OA_LIST_NOTES_RST,
  SUBMISSIONS_LIST_NOTES_MARKDOWN
} from '@/__tests__/end-to-end/helpers/elementsIds'

const TITLE = 'packages list'
test.describe(TITLE, () => {
  test('no description provided', async ({ page }) => {
    await login(page, 'einstein')

    await page.locator("td:has-text('boto3')").click()

    expect(
      await page.locator('.additional-row p').textContent()
    ).toContain(i18n.t('package.noDescriptionProvided'))
  })

  test('expanded markdown description', async ({
    page
  }) => {
    await login(page, 'einstein')

    await page
      .locator("td:has-text('accelerated-numpy')")
      .click()

    await expect(
      page.locator(`#${SUBMISSIONS_LIST_NOTES_MARKDOWN}`)
    ).toHaveCount(1)

    await expect(
      page.locator(`#${OA_LIST_NOTES_RST}`)
    ).toHaveCount(0)
  })

  test('expanded rst description', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator("td:has-text('accelerated-numpy')")
      .click()

    await page.getByLabel('Next page').click()
    await page
      .locator("td:has-text('python-dateutil')")
      .click()

    await expect(
      page.locator(`#${SUBMISSIONS_LIST_NOTES_MARKDOWN}`)
    ).toHaveCount(0)

    await expect(
      page.locator(`#${OA_LIST_NOTES_RST}`)
    ).toHaveCount(1)
  })
})
