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
  UPLOAD_SUBMISSION_REPOSITORY_FIELD_ID,
  UPLOAD_SUBMISSION_REPOSITORY_TESTREPO3_ID,
  UPLOAD_SUBMISSION_CONTINUE_BUTTON_ID,
  DROP_ZONE_CLASS,
  BINARY_SUBMISSION_CHECKBOX,
  UPLOAD_SUBMISSION_RVERSION,
  UPLOAD_SUBMISSION_ARCHITECTURE,
  UPLOAD_SUBMISSION_DISTRIBUTION,
  UPLOAD_SUBMISSION_SUCCESS_ICON,
  UPLOAD_PACKAGES_SIDEBAR_ID
} from '@/__tests__/integration/helpers/elementsIds'
import { login } from '@/__tests__/end-to-end/helpers/login'

const TITLE = 'packages upload'
test.describe(TITLE, { tag: '@serial' }, () => {
  test('upload binary package', async ({ page }) => {
    await login(page, 'einstein')
    await page
      .locator(`#${UPLOAD_PACKAGES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/upload-packages')
    await expect(page).toHaveTitle(
      /RDepot - upload packages/
    )
    await page
      .locator(`#${UPLOAD_SUBMISSION_REPOSITORY_FIELD_ID}`)
      .click({ force: true })
    await page
      .locator(
        `#${UPLOAD_SUBMISSION_REPOSITORY_TESTREPO3_ID}`
      )
      .click()
    await page
      .locator(`#${UPLOAD_SUBMISSION_CONTINUE_BUTTON_ID}`)
      .click()

    const fileChooserPromise =
      page.waitForEvent('filechooser')
    await page.locator(`.${DROP_ZONE_CLASS}`).click()
    const fileChooser = await fileChooserPromise
    await fileChooser.setFiles(
      '../testSourceFiles/info/arrow_8.0.0.tar.gz'
    )
    await page
      .locator(`#${BINARY_SUBMISSION_CHECKBOX}`)
      .click()
    await page
      .locator(`#${UPLOAD_SUBMISSION_RVERSION}`)
      .click({ force: true })
    await page.getByText('4.2').click()
    await page
      .locator(`#${UPLOAD_SUBMISSION_ARCHITECTURE}`)
      .click({ force: true })
    await page.getByText('x86_64').click()
    await page
      .locator(`#${UPLOAD_SUBMISSION_DISTRIBUTION}`)
      .click({ force: true })
    await page.getByText('centos7').click()
    await page
      .locator(`#${UPLOAD_SUBMISSION_CONTINUE_BUTTON_ID}`)
      .click()
    await expect(
      page.locator(`#${UPLOAD_SUBMISSION_SUCCESS_ICON}`)
    ).toBeVisible()
  })
})
