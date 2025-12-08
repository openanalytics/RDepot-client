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
  ABC_TESTREPO1_ID,
  EDIT_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID,
  EDIT_PACKAGE_MAINTAINER_PACKAGE_INPUT_MESSAGES_ID,
  EDIT_PACKAGE_MAINTAINER_REPOSITORY_INPUT_ID,
  EDIT_PACKAGE_MAINTAINER_REPOSITORY_INPUT_MESSAGES_ID,
  EDIT_PACKAGE_MAINTAINER_SUBMIT_ID,
  EDIT_PACKAGE_MAINTAINER_USER_INPUT_ID,
  GALILEO_GALILEI_ABC_TESTREPO1_ID,
  GALILEO_GALILEI_ABC_TESTREPO3_ID,
  GALILEO_GALILEI_ACCRUED_TESTREPO1_ID,
  NUMPY_TESTREPO10_ID,
  PACKAGE_MAINTAINERS_SIDEBAR_ID,
  TEST_REPO_10_ID,
  WHEEL_TESTREPO10_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'
import { restoreData } from '@/__tests__/end-to-end/helpers/restoreData'
import { i18n } from '@/plugins/i18n'

const TITLE = 'package maintainers edition'
test.describe(TITLE, { tag: '@serial' }, () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeAll(async ({}, testInfo) => {
    await restoreData(testInfo.project.name)
  })

  test('has proper initial values', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${PACKAGE_MAINTAINERS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/package-maintainers')
    const maintainersRowsSelector = page.locator('role=row')
    await expect(maintainersRowsSelector).toHaveCount(12)

    const editMaintainerButtonSelector = page.locator(
      `#${GALILEO_GALILEI_ACCRUED_TESTREPO1_ID}`
    )
    await editMaintainerButtonSelector.waitFor()
    await editMaintainerButtonSelector.click()

    const userInputSelector = page.locator(
      `#${EDIT_PACKAGE_MAINTAINER_USER_INPUT_ID}`
    )

    await userInputSelector.waitFor()
    await expect(userInputSelector).toBeDisabled()

    const parentDiv = page
      .locator(`#${EDIT_PACKAGE_MAINTAINER_USER_INPUT_ID}`)
      .locator('..')

    await expect(parentDiv).toContainText('Galileo Galilei')

    await page
      .locator(
        'label:has-text("Repository") + .v-field__input:has-text("testrepo1")'
      )
      .waitFor()

    await page
      .locator(
        'label:has-text("Package") + .v-field__input:has-text("accrued")'
      )
      .waitFor()
  })

  test('change package', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${PACKAGE_MAINTAINERS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/package-maintainers')
    const maintainersRowsSelector = page.locator('role=row')
    await expect(maintainersRowsSelector).toHaveCount(12)

    const editMaintainerButtonSelector = page.locator(
      `#${GALILEO_GALILEI_ACCRUED_TESTREPO1_ID}`
    )
    await editMaintainerButtonSelector.waitFor()
    await editMaintainerButtonSelector.click()

    const editPackageInputSelector = page.locator(
      `#${EDIT_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID}`
    )

    await editPackageInputSelector.waitFor()
    await editPackageInputSelector.click({
      force: true
    })

    const packageOption = page.locator(
      `#${ABC_TESTREPO1_ID}`
    )
    await packageOption.waitFor()
    await packageOption.click()
    await expect(packageOption).toHaveCount(0)

    await page
      .locator(`#${EDIT_PACKAGE_MAINTAINER_SUBMIT_ID}`)
      .click()
  })

  test('change repository and package', async ({
    page
  }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${PACKAGE_MAINTAINERS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/package-maintainers')
    const maintainersRowsSelector = page.locator('role=row')
    await expect(maintainersRowsSelector).toHaveCount(12)

    const editMaintainerButtonSelector = page.locator(
      `#${GALILEO_GALILEI_ABC_TESTREPO3_ID}`
    )
    await editMaintainerButtonSelector.waitFor()
    await editMaintainerButtonSelector.click()

    const editRepoInputSelector = page.locator(
      `#${EDIT_PACKAGE_MAINTAINER_REPOSITORY_INPUT_ID}`
    )
    await editRepoInputSelector.waitFor()
    await editRepoInputSelector.click({
      force: true
    })

    const repoOption = page.locator(`#${TEST_REPO_10_ID}`)
    await repoOption.waitFor()
    await repoOption.click()
    await expect(repoOption).toHaveCount(0)

    await page
      .locator(
        'label:has-text("Package") + .v-field__input:has-text("")'
      )
      .waitFor()

    const editPackageInputSelector = page.locator(
      `#${EDIT_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID}`
    )
    await editPackageInputSelector.waitFor()
    await editPackageInputSelector.click({
      force: true
    })

    const packageOption = page.locator(
      `#${NUMPY_TESTREPO10_ID}`
    )
    await packageOption.waitFor()
    await packageOption.click()
    await expect(packageOption).toHaveCount(0)

    await page
      .locator(`#${EDIT_PACKAGE_MAINTAINER_SUBMIT_ID}`)
      .click()
  })

  test('should display proper error messages', async ({
    page
  }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${PACKAGE_MAINTAINERS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/package-maintainers')
    const maintainersRowsSelector = page.locator('role=row')
    await expect(maintainersRowsSelector).toHaveCount(12)

    const editMaintainerSelector = page.locator(
      `#${GALILEO_GALILEI_ABC_TESTREPO1_ID}`
    )
    await editMaintainerSelector.waitFor()
    await editMaintainerSelector.click()

    const repoInputSelector = page.locator(
      `#${EDIT_PACKAGE_MAINTAINER_REPOSITORY_INPUT_ID}`
    )
    const packageInputSelector = page.locator(
      `#${EDIT_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID}`
    )

    await packageInputSelector.waitFor()
    await expect(packageInputSelector).not.toBeDisabled()

    const clearRepoButtons = page.locator(
      'xpath=//i[@aria-label="Clear Repository"]'
    )
    await clearRepoButtons.nth(1).waitFor()

    await clearRepoButtons.nth(1).click()

    const repositoryInputMessagesSelector =
      page.locator(`#${EDIT_PACKAGE_MAINTAINER_REPOSITORY_INPUT_MESSAGES_ID} 
    `)

    await repositoryInputMessagesSelector.waitFor()
    expect(
      await repositoryInputMessagesSelector.textContent()
    ).toContain(i18n.t('messages.errors.required'))

    const packageInputMessagesSelector =
      page.locator(`#${EDIT_PACKAGE_MAINTAINER_PACKAGE_INPUT_MESSAGES_ID} 
    `)

    await packageInputMessagesSelector.waitFor()
    expect(
      await packageInputMessagesSelector.textContent()
    ).toContain('Required')

    await expect(packageInputSelector).toBeDisabled()

    await repoInputSelector.click({ force: true })
    const repoOption = page.locator(`#${TEST_REPO_10_ID}`)
    await repoOption.waitFor()
    await repoOption.click()
    await expect(repoOption).toHaveCount(0)

    await expect(packageInputSelector).not.toBeDisabled()

    await packageInputSelector.click({ force: true })
    const packageOption = page.locator(
      `#${WHEEL_TESTREPO10_ID}`
    )
    await packageOption.waitFor()
    await packageOption.click()
    await expect(packageOption).toHaveCount(0)

    await expect(
      page.locator(`#${EDIT_PACKAGE_MAINTAINER_SUBMIT_ID}`)
    ).not.toBeDisabled()
  })
})
