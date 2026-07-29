/*
 * R Depot
 *
 * Copyright (C) 2012-2026 Open Analytics NV
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
import { login } from '../helpers/login'
import { awaitTableData } from '@/__tests__/end-to-end/helpers/awaitTableData'
import {
  PACKAGE_DETAILS_BUTTON_URLLIB_ID,
  PACKAGES_FILTRATION_SEARCH_FIELD_ID,
  PACKAGE_DESCRIPTION_MARKDOWN_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import {
  packageDescription,
  restoreData
} from '@/__tests__/end-to-end/helpers/restoreData'

const TITLE = 'package details details'

test.describe(TITLE, { tag: '@serial' }, () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeAll(async ({}, testInfo) => {
    await packageDescription(testInfo.project.name)
  })
  // eslint-disable-next-line no-empty-pattern
  test.afterAll(async ({}, testInfo) => {
    await restoreData(testInfo.project.name)
  })

  test('should copy code in package details without prompts', async ({
    page
  }) => {
    const initialDataLoaded = awaitTableData(
      page,
      '/api/v2/manager/packages'
    )
    await login(page, 'einstein')
    const rowsSelector = page.locator('role=row')
    await initialDataLoaded
    await expect(rowsSelector).toHaveCount(21)

    await page
      .locator(`#${PACKAGES_FILTRATION_SEARCH_FIELD_ID}`)
      .fill('urllib')

    const seePackageDetailsButtonSelector = page.locator(
      `#${PACKAGE_DETAILS_BUTTON_URLLIB_ID}`
    )
    await seePackageDetailsButtonSelector.waitFor()
    await seePackageDetailsButtonSelector.click()
    await expect(page).toHaveTitle(
      /RDepot - package details/
    )

    const packageDescription = page.locator(
      `#${PACKAGE_DESCRIPTION_MARKDOWN_ID}`
    )
    await expect(packageDescription).toBeVisible()

    const firstCopy = page
      .locator(`#${PACKAGE_DESCRIPTION_MARKDOWN_ID}`)
      .locator('[data-copy]')
      .first()
    await firstCopy.waitFor()
    await firstCopy.click()

    const firstClipboardText =
      await firstCopy.getAttribute('data-copy')

    await expect(firstClipboardText).toBe(
      'import urllib3\nresp = urllib3.request("GET", "http://httpbin.org/robots.txt")\nresp.status\nresp.data'
    )

    const secondCopy = page
      .locator(`#${PACKAGE_DESCRIPTION_MARKDOWN_ID}`)
      .locator('[data-copy]')
      .nth(1)
    await secondCopy.waitFor()
    await secondCopy.click()

    const secondClipboardText =
      await secondCopy.getAttribute('data-copy')

    await expect(secondClipboardText).toBe(
      'python -m pip install urllib3'
    )

    const thirdCopy = page
      .locator(`#${PACKAGE_DESCRIPTION_MARKDOWN_ID}`)
      .locator('[data-copy]')
      .nth(2)
    await secondCopy.waitFor()
    await secondCopy.click()

    const thirdClipboardText =
      await thirdCopy.getAttribute('data-copy')

    await expect(thirdClipboardText).toBe(
      'git clone https://github.com/urllib3/urllib3.git\ncd urllib3\npip install .'
    )
  })
})
