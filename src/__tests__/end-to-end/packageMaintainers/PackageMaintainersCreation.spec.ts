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
  A3_TESTREPO3_ID,
  ADD_MAINTAINER_ID,
  ALBERT_EINSTEIN_ID,
  CREATE_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID,
  CREATE_PACKAGE_MAINTAINER_PACKAGE_INPUT_MESSAGES_ID,
  CREATE_PACKAGE_MAINTAINER_REPOSITORY_INPUT_ID,
  CREATE_PACKAGE_MAINTAINER_REPOSITORY_INPUT_MESSAGES_ID,
  CREATE_PACKAGE_MAINTAINER_SUBMIT_ID,
  CREATE_PACKAGE_MAINTAINER_USER_INPUT_ID,
  CREATE_PACKAGE_MAINTAINER_USER_INPUT_MESSAGES_ID,
  GALILEO_GALILEI_ID,
  NIKOLA_TESLA_ID,
  NUMPY_TESTREPO10_ID,
  PACKAGE_MAINTAINERS_SIDEBAR_ID,
  TEST_REPO_10_ID,
  TEST_REPO_3_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'
import { restoreData } from '@/__tests__/end-to-end/helpers/restoreData'
import { i18n } from '@/plugins/i18n'

const TITLE = 'package maintainers creation'
test.describe(TITLE, { tag: '@serial' }, () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeAll(async ({}, testInfo) => {
    await restoreData(testInfo.project.name)
  })

  test('create', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${PACKAGE_MAINTAINERS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/package-maintainers')

    const createMaintainerSelector = page.locator(
      `#${ADD_MAINTAINER_ID}`
    )
    await createMaintainerSelector.waitFor()
    await createMaintainerSelector.click()

    const userInputSelector = page.locator(
      `#${CREATE_PACKAGE_MAINTAINER_USER_INPUT_ID}`
    )
    const repoInputSelector = page.locator(
      `#${CREATE_PACKAGE_MAINTAINER_REPOSITORY_INPUT_ID}`
    )
    const packageInputSelector = page.locator(
      `#${CREATE_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID}`
    )

    await packageInputSelector.waitFor()
    await expect(packageInputSelector).toBeDisabled()

    await userInputSelector.waitFor()
    await userInputSelector.click({ force: true })
    const nikolaTeslaOption = page.locator(
      `#${NIKOLA_TESLA_ID}`
    )
    await nikolaTeslaOption.waitFor()
    await nikolaTeslaOption.click()
    await expect(nikolaTeslaOption).toHaveCount(0)

    await repoInputSelector.waitFor()
    await repoInputSelector.click({ force: true })
    const testRepo10Option = page.locator(
      `#${TEST_REPO_10_ID}`
    )
    await testRepo10Option.waitFor()
    await testRepo10Option.click()
    await expect(testRepo10Option).toHaveCount(0)

    await packageInputSelector.waitFor()
    await packageInputSelector.click({ force: true })
    const numpyTestrepo10Option = page.locator(
      `#${NUMPY_TESTREPO10_ID}`
    )
    await numpyTestrepo10Option.waitFor()
    await numpyTestrepo10Option.click()

    await page
      .locator(`#${CREATE_PACKAGE_MAINTAINER_SUBMIT_ID}`)
      .click()
  })

  test('should not create maintainer that already exists', async ({
    page
  }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${PACKAGE_MAINTAINERS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/package-maintainers')

    const createMaintainerSelector = page.locator(
      `#${ADD_MAINTAINER_ID}`
    )
    await createMaintainerSelector.waitFor()
    await createMaintainerSelector.click()

    const userInputSelector = page.locator(
      `#${CREATE_PACKAGE_MAINTAINER_USER_INPUT_ID}`
    )
    const repoInputSelector = page.locator(
      `#${CREATE_PACKAGE_MAINTAINER_REPOSITORY_INPUT_ID}`
    )
    const packageInputSelector = page.locator(
      `#${CREATE_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID}`
    )

    await packageInputSelector.waitFor()
    await expect(packageInputSelector).toBeDisabled()

    await userInputSelector.waitFor()
    await userInputSelector.click({ force: true })
    const galileoOption = page.locator(
      `#${GALILEO_GALILEI_ID}`
    )
    await galileoOption.waitFor()
    await galileoOption.click()
    await expect(galileoOption).toHaveCount(0)

    await repoInputSelector.waitFor()
    await repoInputSelector.click({ force: true })
    const testRepo3Option = page.locator(
      `#${TEST_REPO_3_ID}`
    )
    await testRepo3Option.waitFor()
    await testRepo3Option.click()
    await expect(testRepo3Option).toHaveCount(0)

    await packageInputSelector.waitFor()
    await expect(packageInputSelector).not.toBeDisabled()
    await packageInputSelector.click({ force: true })

    const a3TestRepo3Selector = page.locator(
      `#${A3_TESTREPO3_ID}`
    )
    await a3TestRepo3Selector.waitFor()
    expect(a3TestRepo3Selector).toHaveClass(
      /v-list-item--disabled/
    )

    await expect(
      page.locator(
        `#${CREATE_PACKAGE_MAINTAINER_SUBMIT_ID}`
      )
    ).toBeDisabled()
  })

  test('should display proper error messages', async ({
    page
  }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${PACKAGE_MAINTAINERS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/package-maintainers')

    const createMaintainerSelector = page.locator(
      `#${ADD_MAINTAINER_ID}`
    )
    await createMaintainerSelector.waitFor()
    await createMaintainerSelector.click()

    const userInputSelector = page.locator(
      `#${CREATE_PACKAGE_MAINTAINER_USER_INPUT_ID}`
    )
    const repoInputSelector = page.locator(
      `#${CREATE_PACKAGE_MAINTAINER_REPOSITORY_INPUT_ID}`
    )
    const packageInputSelector = page.locator(
      `#${CREATE_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID}`
    )

    await packageInputSelector.waitFor()
    await expect(packageInputSelector).toBeDisabled()

    const packageInputMessagesSelector =
      page.locator(`#${CREATE_PACKAGE_MAINTAINER_PACKAGE_INPUT_MESSAGES_ID} 
    `)

    await packageInputMessagesSelector.waitFor()
    expect(
      await packageInputMessagesSelector.textContent()
    ).toContain(
      i18n.t(
        'maintainers.createform.disabledPackageMessage'
      )
    )

    await userInputSelector.waitFor()
    await userInputSelector.click({ force: true })
    const einsteinOption = page.locator(
      `#${ALBERT_EINSTEIN_ID}`
    )
    await einsteinOption.waitFor()
    await einsteinOption.click()
    await expect(einsteinOption).toHaveCount(0)

    const clearUserButton = page.locator(
      'xpath=//i[@aria-label="Clear User"]'
    )
    await clearUserButton.waitFor()
    await clearUserButton.click()

    await userInputSelector.click({ force: true })
    await einsteinOption.waitFor()
    await einsteinOption.click()
    await expect(einsteinOption).toHaveCount(0)

    await repoInputSelector.click({ force: true })
    const testRepo3Option = page.locator(
      `#${TEST_REPO_3_ID}`
    )
    await testRepo3Option.waitFor()
    await testRepo3Option.click()
    await expect(testRepo3Option).toHaveCount(0)

    await expect(packageInputSelector).not.toBeDisabled()

    const clearRepoButtons = page.locator(
      'xpath=//i[@aria-label="Clear Repository"]'
    )
    await clearRepoButtons.nth(1).waitFor()

    await clearRepoButtons.nth(1).click()

    await expect(packageInputSelector).toBeDisabled()

    const repoInputMessagesSelector =
      page.locator(`#${CREATE_PACKAGE_MAINTAINER_REPOSITORY_INPUT_MESSAGES_ID} 
  `)

    await repoInputMessagesSelector.waitFor()
    expect(
      await repoInputMessagesSelector.textContent()
    ).toContain(i18n.t('common.errors.required'))

    await repoInputSelector.click({ force: true })
    await testRepo3Option.waitFor()
    await testRepo3Option.click()
    await expect(testRepo3Option).toHaveCount(0)

    await expect(packageInputSelector).not.toBeDisabled()

    await packageInputSelector.click({ force: true })
    const a3Testrepo3Option = page.locator(
      `#${A3_TESTREPO3_ID}`
    )
    await a3Testrepo3Option.waitFor()
    await a3Testrepo3Option.click()
    await expect(a3Testrepo3Option).toHaveCount(0)

    const clearPackageButton = page.locator(
      'xpath=//i[@aria-label="Clear Package"]'
    )
    await clearPackageButton.waitFor()
    await clearPackageButton.click()

    await packageInputMessagesSelector.waitFor()
    expect(
      await packageInputMessagesSelector.textContent()
    ).toContain(i18n.t('common.errors.required'))

    await packageInputSelector.click({ force: true })
    await a3Testrepo3Option.waitFor()
    await a3Testrepo3Option.click()
    await expect(a3Testrepo3Option).toHaveCount(0)

    await expect(
      page.locator(
        `#${CREATE_PACKAGE_MAINTAINER_SUBMIT_ID}`
      )
    ).not.toBeDisabled()

    await clearUserButton.click()
    await expect(
      page.locator(
        `#${CREATE_PACKAGE_MAINTAINER_SUBMIT_ID}`
      )
    ).toBeDisabled()

    const userInputMessagesSelector =
      page.locator(`#${CREATE_PACKAGE_MAINTAINER_USER_INPUT_MESSAGES_ID} 
`)

    await userInputMessagesSelector.waitFor()
    expect(
      await userInputMessagesSelector.textContent()
    ).toContain(i18n.t('common.errors.required'))
  })
})
