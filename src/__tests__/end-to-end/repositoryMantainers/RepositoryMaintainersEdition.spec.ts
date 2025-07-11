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
  ALBERT_EINSTEIN_TESTREPO10_ID,
  EDIT_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID,
  EDIT_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_MESSAGES_ID,
  EDIT_REPOSITORY_MAINTAINER_SUBMIT_ID,
  EDIT_REPOSITORY_MAINTAINER_USER_INPUT_ID,
  NIKOLA_TESLA_TESTREPO1_ID,
  REPOSITORY_MAINTAINERS_SIDEBAR_ID,
  TEST_REPO_2_ID,
  TEST_REPO_3_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'
import { restoreData } from '@/__tests__/end-to-end/helpers/restoreData'
import { i18n } from '@/plugins/i18n'

const TITLE = 'repository maintainers edit form'
test.describe(TITLE, { tag: '@serial' }, () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeAll(async ({}, testInfo) => {
    await restoreData(testInfo.project.name)
  })

  test('proper initial values', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORY_MAINTAINERS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repository-maintainers')

    const editEinsteinMaintainer = page.locator(
      `#${ALBERT_EINSTEIN_TESTREPO10_ID}`
    )
    await editEinsteinMaintainer.waitFor()
    await editEinsteinMaintainer.click()

    const nameInputFieldSelector = page.locator(
      `#${EDIT_REPOSITORY_MAINTAINER_USER_INPUT_ID}`
    )
    const parentDiv = page
      .locator(
        `#${EDIT_REPOSITORY_MAINTAINER_USER_INPUT_ID}`
      )
      .locator('..')

    await nameInputFieldSelector.waitFor()
    await expect(nameInputFieldSelector).toBeDisabled()
    await expect(parentDiv).toContainText('Albert Einstein')

    const repositoryInputField = page.locator(
      `#${EDIT_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID}`
    )
    await expect(repositoryInputField).not.toBeDisabled()
    await repositoryInputField.waitFor()

    await page
      .locator(
        'label:has-text("Repository") + .v-field__input:has-text("testrepo10")'
      )
      .waitFor()
  })

  test('edit', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORY_MAINTAINERS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repository-maintainers')

    const editEinsteinMaintainer = page.locator(
      `#${ALBERT_EINSTEIN_TESTREPO10_ID}`
    )
    await editEinsteinMaintainer.waitFor()
    await editEinsteinMaintainer.click()

    const nameInputFieldSelector = page.locator(
      `#${EDIT_REPOSITORY_MAINTAINER_USER_INPUT_ID}`
    )
    await nameInputFieldSelector.waitFor()

    const repositoryInputField = page.locator(
      `#${EDIT_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID}`
    )
    await expect(repositoryInputField).not.toBeDisabled()
    await page
      .locator(
        `#${EDIT_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID}`
      )
      .click({ force: true })
    const testRepo3Selector = page.locator(
      `#${TEST_REPO_3_ID}`
    )
    await testRepo3Selector.waitFor()
    await testRepo3Selector.click()
    await expect(testRepo3Selector).toHaveCount(0)

    await page
      .locator(`#${EDIT_REPOSITORY_MAINTAINER_SUBMIT_ID}`)
      .click()
  })

  test('display proper error messages', async ({
    page
  }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORY_MAINTAINERS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repository-maintainers')

    const editTeslaMaintainer = page.locator(
      `#${NIKOLA_TESLA_TESTREPO1_ID}`
    )
    await editTeslaMaintainer.waitFor()
    await editTeslaMaintainer.click()

    const repositoryInputField = page.locator(
      `#${EDIT_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID}`
    )
    await repositoryInputField.waitFor()

    const clearRepositorySelector = page.locator(
      'xpath=//i[@aria-label="Clear Repository"]'
    )
    await clearRepositorySelector.waitFor()
    await clearRepositorySelector.click()

    const repositoryInputMessagesSelector = page.locator(
      `#${EDIT_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_MESSAGES_ID}`
    )
    expect(
      await repositoryInputMessagesSelector.textContent()
    ).toContain(i18n.t('messages.errors.required'))

    await page
      .locator(
        `#${EDIT_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID}`
      )
      .click({ force: true })
    const testRepo2Selector = page.locator(
      `#${TEST_REPO_2_ID}`
    )
    await testRepo2Selector.waitFor()
    await testRepo2Selector.click()
    await expect(testRepo2Selector).toHaveCount(0)

    await page
      .locator(`#${EDIT_REPOSITORY_MAINTAINER_SUBMIT_ID}`)
      .click()
  })
})
