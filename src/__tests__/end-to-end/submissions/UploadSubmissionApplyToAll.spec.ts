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

import { expect, Page, test } from '@playwright/test'
import {
  APPLY_ALL_ARCHITECTURE_ID,
  APPLY_ALL_BUTTON_ID,
  APPLY_ALL_DISTRIBUTION_ID,
  APPLY_ALL_RVERSION_ID,
  BINARY_SUBMISSION_CHECKBOX,
  DROP_ZONE_CLASS,
  UPLOAD_PACKAGES_SIDEBAR_ID,
  UPLOAD_SUBMISSION_ARCHITECTURE,
  UPLOAD_SUBMISSION_CONTINUE_BUTTON_ID,
  UPLOAD_SUBMISSION_DISTRIBUTION,
  UPLOAD_SUBMISSION_REPOSITORY_FIELD_ID,
  UPLOAD_SUBMISSION_REPOSITORY_TESTREPO3_ID,
  UPLOAD_SUBMISSION_RVERSION
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '@/__tests__/end-to-end/helpers/login'
import { restoreData } from '@/__tests__/end-to-end/helpers/restoreData'

const TITLE = 'apply to all binary packages'
test.describe(TITLE, { tag: '@serial' }, () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeAll(async ({}, testInfo) => {
    await restoreData(testInfo.project.name)
  })

  async function navigateToStep2(page: Page) {
    await login(page, 'einstein')
    await page
      .locator(`#${UPLOAD_PACKAGES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/upload-packages')
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
  }

  async function uploadTwoFiles(page: Page) {
    const fileChooserPromise =
      page.waitForEvent('filechooser')
    await page.locator(`.${DROP_ZONE_CLASS}`).click()
    const fileChooser = await fileChooserPromise
    await fileChooser.setFiles([
      './src/__tests__/end-to-end/testData/arrow_8.0.0.tar.gz',
      './src/__tests__/end-to-end/testData/itestSource.tar.gz'
    ])
  }

  async function uploadThreeFiles(page: Page) {
    const fileChooserPromise =
      page.waitForEvent('filechooser')
    await page.locator(`.${DROP_ZONE_CLASS}`).click()
    const fileChooser = await fileChooserPromise
    await fileChooser.setFiles([
      './src/__tests__/end-to-end/testData/arrow_8.0.0.tar.gz',
      './src/__tests__/end-to-end/testData/itestSource.tar.gz',
      './src/__tests__/end-to-end/testData/urllib3-2.6.1.tar.gz'
    ])
  }

  test('apply to all section is not visible with single package', async ({
    page
  }) => {
    await navigateToStep2(page)

    const fileChooserPromise =
      page.waitForEvent('filechooser')
    await page.locator(`.${DROP_ZONE_CLASS}`).click()
    const fileChooser = await fileChooserPromise
    await fileChooser.setFiles(
      './src/__tests__/end-to-end/testData/arrow_8.0.0.tar.gz'
    )

    await page
      .locator(`#${BINARY_SUBMISSION_CHECKBOX}`)
      .first()
      .click()

    await expect(
      page.locator(`#${APPLY_ALL_BUTTON_ID}`)
    ).not.toBeVisible()
  })

  test('apply to all section is not visible with only one binary package among multiple packages', async ({
    page
  }) => {
    await navigateToStep2(page)
    await uploadTwoFiles(page)

    const binaryCheckboxes = page.locator(
      `#${BINARY_SUBMISSION_CHECKBOX}`
    )
    await binaryCheckboxes.first().click()

    await expect(
      page.locator(`#${APPLY_ALL_BUTTON_ID}`)
    ).not.toBeVisible()
  })

  test('apply to all section appears when multiple binary packages exist', async ({
    page
  }) => {
    await navigateToStep2(page)
    await uploadTwoFiles(page)

    const binaryCheckboxes = page.locator(
      `#${BINARY_SUBMISSION_CHECKBOX}`
    )
    await binaryCheckboxes.first().click()
    await binaryCheckboxes.last().click()

    await expect(
      page.locator(`#${APPLY_ALL_BUTTON_ID}`)
    ).toBeVisible()
    await expect(
      page.locator(`#${APPLY_ALL_RVERSION_ID}`)
    ).toBeVisible()
    await expect(
      page.locator(`#${APPLY_ALL_ARCHITECTURE_ID}`)
    ).toBeVisible()
    await expect(
      page.locator(`#${APPLY_ALL_DISTRIBUTION_ID}`)
    ).toBeVisible()
  })

  test('apply to all button is disabled when no fields are selected', async ({
    page
  }) => {
    await navigateToStep2(page)
    await uploadTwoFiles(page)

    const binaryCheckboxes = page.locator(
      `#${BINARY_SUBMISSION_CHECKBOX}`
    )
    await binaryCheckboxes.first().click()
    await binaryCheckboxes.last().click()

    await expect(
      page.locator(`#${APPLY_ALL_BUTTON_ID}`)
    ).toBeDisabled()
  })

  test('apply to all sets values on all binary packages', async ({
    page
  }) => {
    await navigateToStep2(page)
    await uploadTwoFiles(page)

    const binaryCheckboxes = page.locator(
      `#${BINARY_SUBMISSION_CHECKBOX}`
    )
    await binaryCheckboxes.first().click()
    await binaryCheckboxes.last().click()

    await page
      .locator(`#${APPLY_ALL_RVERSION_ID}`)
      .click({ force: true })
    await page.getByText('4.2').click()

    await page
      .locator(`#${APPLY_ALL_ARCHITECTURE_ID}`)
      .click({ force: true })
    await page.getByText('x86_64').click()

    await page
      .locator(`#${APPLY_ALL_DISTRIBUTION_ID}`)
      .click({ force: true })
    await page.getByText('centos7').click()

    await expect(
      page.locator(`#${APPLY_ALL_BUTTON_ID}`)
    ).toBeEnabled()

    await page.locator(`#${APPLY_ALL_BUTTON_ID}`).click()

    const rversionSelects = page.locator(
      `#${UPLOAD_SUBMISSION_RVERSION}`
    )
    const architectureSelects = page.locator(
      `#${UPLOAD_SUBMISSION_ARCHITECTURE}`
    )
    const distributionSelects = page.locator(
      `#${UPLOAD_SUBMISSION_DISTRIBUTION}`
    )

    await expect(rversionSelects.first()).toHaveValue('4.2')
    await expect(rversionSelects.last()).toHaveValue('4.2')
    await expect(architectureSelects.first()).toHaveValue(
      'x86_64'
    )
    await expect(architectureSelects.last()).toHaveValue(
      'x86_64'
    )
    await expect(distributionSelects.first()).toHaveValue(
      'centos7'
    )
    await expect(distributionSelects.last()).toHaveValue(
      'centos7'
    )
  })

  test('apply to all only affects binary packages', async ({
    page
  }) => {
    await navigateToStep2(page)
    await uploadThreeFiles(page)

    const binaryCheckboxes = page.locator(
      `#${BINARY_SUBMISSION_CHECKBOX}`
    )
    await binaryCheckboxes.first().click()
    await binaryCheckboxes.nth(1).click()

    await expect(
      page.locator(`#${APPLY_ALL_BUTTON_ID}`)
    ).toBeVisible()

    await page
      .locator(`#${APPLY_ALL_RVERSION_ID}`)
      .click({ force: true })
    await page.getByText('4.2').click()

    await page.locator(`#${APPLY_ALL_BUTTON_ID}`).click()

    const rversionSelects = page.locator(
      `#${UPLOAD_SUBMISSION_RVERSION}`
    )
    await expect(rversionSelects.first()).toHaveValue('4.2')
    await expect(rversionSelects.nth(1)).toHaveValue('4.2')

    await expect(rversionSelects.last()).not.toBeVisible()
  })
})
