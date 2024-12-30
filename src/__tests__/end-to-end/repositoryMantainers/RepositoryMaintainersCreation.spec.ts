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
  ADD_REPOSITORY_MAINTAINER_ID,
  ALBERT_EINSTEIN_ID,
  CREATE_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID,
  CREATE_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_MESSAGES_ID,
  CREATE_REPOSITORY_MAINTAINER_SUBMIT_ID,
  CREATE_REPOSITORY_MAINTAINER_USER_INPUT_ID,
  CREATE_REPOSITORY_MAINTAINER_USER_INPUT_MESSAGES_ID,
  NIKOLA_TESLA_ID,
  REPOSITORY_MAINTAINERS_SIDEBAR_ID,
  TEST_REPO_10_ID,
  TEST_REPO_3_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'
import { i18n } from '@/plugins/i18n'
import { restoreData } from '@/__tests__/end-to-end/helpers/restoreData'

const TITLE = 'repository maintainers create form'
test.describe(TITLE, { tag: '@serial' }, () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeAll(async ({}, testInfo) => {
    await restoreData(testInfo.project.name)
  })

  test('create', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORY_MAINTAINERS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repository-maintainers')

    const createMaintainerButtonSelector = page.locator(
      `#${ADD_REPOSITORY_MAINTAINER_ID}`
    )
    await createMaintainerButtonSelector.waitFor()
    await createMaintainerButtonSelector.click()

    const repositoryInputField = page.locator(
      `#${CREATE_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID}`
    )
    await repositoryInputField.waitFor()
    await expect(repositoryInputField).toBeDisabled()

    await page
      .locator(
        `#${CREATE_REPOSITORY_MAINTAINER_USER_INPUT_ID}`
      )
      .click({ force: true })

    const nikolaTeslaSelector = page.locator(
      `#${NIKOLA_TESLA_ID}`
    )
    await nikolaTeslaSelector.waitFor()
    await nikolaTeslaSelector.click()
    await expect(nikolaTeslaSelector).toHaveCount(0)

    await expect(repositoryInputField).not.toBeDisabled()
    await repositoryInputField.click({ force: true })
    const testRepo10Selector = page.locator(
      `#${TEST_REPO_10_ID}`
    )
    await testRepo10Selector.waitFor()
    await testRepo10Selector.click()

    await page
      .locator(`#${CREATE_REPOSITORY_MAINTAINER_SUBMIT_ID}`)
      .click()
  })

  test('should not create maintainer that already exists', async ({
    page
  }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORY_MAINTAINERS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repository-maintainers')

    const createMaintainerButtonSelector = page.locator(
      `#${ADD_REPOSITORY_MAINTAINER_ID}`
    )
    await createMaintainerButtonSelector.waitFor()
    await createMaintainerButtonSelector.click()

    const repositoryInputField = page.locator(
      `#${CREATE_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID}`
    )

    await page
      .locator(
        `#${CREATE_REPOSITORY_MAINTAINER_USER_INPUT_ID}`
      )
      .click({ force: true })

    const albertEinsteinSelector = page.locator(
      `#${ALBERT_EINSTEIN_ID}`
    )
    await albertEinsteinSelector.waitFor()
    await albertEinsteinSelector.click()
    await expect(albertEinsteinSelector).toHaveCount(0)
    await expect(repositoryInputField).not.toBeDisabled()
    await repositoryInputField.click({ force: true })
    const testRepo10Selector = page.locator(
      `#${TEST_REPO_10_ID}`
    )
    await testRepo10Selector.waitFor()
    expect(testRepo10Selector).toHaveClass(
      /v-list-item--disabled/
    )
    expect(
      await testRepo10Selector.textContent()
    ).toContain('Albert Einstein')

    const testRepo3Selector = page.locator(
      `#${TEST_REPO_10_ID}`
    )
    await testRepo3Selector.waitFor()
    expect(testRepo3Selector).not.toHaveClass(
      'v-list-item--disabled'
    )

    await expect(
      page.locator(
        `#${CREATE_REPOSITORY_MAINTAINER_SUBMIT_ID}`
      )
    ).toBeDisabled()
  })

  test('display proper error messages', async ({
    page
  }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORY_MAINTAINERS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repository-maintainers')

    const createMaintainerButtonSelector = page.locator(
      `#${ADD_REPOSITORY_MAINTAINER_ID}`
    )
    await createMaintainerButtonSelector.waitFor()
    await createMaintainerButtonSelector.click()

    const repositoryInputField = page.locator(
      `#${CREATE_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID}`
    )
    const repositoryInputMessagesSelector =
      page.locator(`#${CREATE_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_MESSAGES_ID} 
      `)

    await repositoryInputField.waitFor()
    await expect(repositoryInputField).toBeDisabled()
    expect(
      await repositoryInputMessagesSelector.textContent()
    ).toContain(
      i18n.t(
        'maintainers.createForm.disabledRepositoryMessage'
      )
    )

    await page
      .locator(
        `#${CREATE_REPOSITORY_MAINTAINER_USER_INPUT_ID}`
      )
      .click({ force: true })

    const albertEinsteinSelector = page.locator(
      `#${ALBERT_EINSTEIN_ID}`
    )
    await albertEinsteinSelector.waitFor()
    await albertEinsteinSelector.click()

    const clearUserButton = page.locator(
      'xpath=//i[@aria-label="Clear User"]'
    )
    await clearUserButton.waitFor()
    await clearUserButton.click()

    const userInputMessages = page.locator(
      `#${CREATE_REPOSITORY_MAINTAINER_USER_INPUT_MESSAGES_ID}`
    )
    expect(await userInputMessages.textContent()).toContain(
      i18n.t('common.errors.required')
    )
    await expect(repositoryInputField).toBeDisabled()
    await page
      .locator(
        `#${CREATE_REPOSITORY_MAINTAINER_USER_INPUT_ID}`
      )
      .click({ force: true })
    await albertEinsteinSelector.waitFor()
    await albertEinsteinSelector.click()
    await expect(albertEinsteinSelector).toHaveCount(0)
    await page
      .locator(
        `#${
          CREATE_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID
        }`
      )
      .click({ force: true })

    const testRepo3Selector = page.locator(
      `#${TEST_REPO_3_ID}`
    )
    await testRepo3Selector.waitFor()
    await testRepo3Selector.click()

    const clearRepoSelector = page.locator(
      'xpath=//i[@aria-label="Clear Repository"]'
    )

    await clearRepoSelector.waitFor()
    await clearRepoSelector.click()

    expect(
      await repositoryInputMessagesSelector.textContent()
    ).toContain(i18n.t('common.errors.required'))

    await page
      .locator(
        `#${
          CREATE_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID
        }`
      )
      .click({ force: true })

    await testRepo3Selector.waitFor()
    await testRepo3Selector.click()

    await expect(
      page.locator(
        `#${CREATE_REPOSITORY_MAINTAINER_SUBMIT_ID}`
      )
    ).not.toBeDisabled()
  })
})
