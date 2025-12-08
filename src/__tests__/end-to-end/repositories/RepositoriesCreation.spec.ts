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
  ADD_MAINTAINER_ID,
  CREATE_REPOSITORY_SERVER_ADDRESS_FIELD_ID,
  CREATE_REPOSITORY_PUBLICATION_URI_FIELD_ID,
  REPOSITORIES_SIDEBAR_ID,
  EDIT_REPOSITORY_SERVER_ADDRESS_ALERT,
  HEALTH_CHECK_SERVER_ADDRESS_NOT_CHECKED_ID,
  HEALTH_CHECK_SERVER_ADDRESS_INCORRECT_ID,
  HEALTH_CHECK_SERVER_ADDRESS_CORRECT_ID,
  CREATE_REPOSITORY_NAME_FIELD_ID,
  CREATE_REPOSITORY_REDIRECT_TO_SOURCE_FIELD_ID,
  SUBMIT_BUTTON_ID,
  CREATE_REPOSITORY_TECHNOLOGY_FIELD_ID,
  CREATE_REPOSITORY_HASH_METHOD_FIELD_ID,
  REPOSITORY_NAME_FIELD_MESSAGES_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'
import { restoreData } from '@/__tests__/end-to-end/helpers/restoreData'
import { i18n } from '@/plugins/i18n'

// eslint-disable-next-line no-empty-pattern
test.beforeAll(async ({}, testInfo) => {
  await restoreData(testInfo.project.name)
})

const TITLE = 'repositories creation'
test.describe(TITLE, { tag: '@serial' }, () => {
  test('create R repository', async ({ page }) => {
    await login(page, 'einstein')
    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')
    await expect(page).toHaveTitle(/RDepot - repositories/)

    await expect(
      page.locator('#repositories-list-testRepoR')
    ).toHaveCount(0)
    const createRepositorySelector = page.locator(
      `#${ADD_MAINTAINER_ID}`
    )
    await createRepositorySelector.waitFor()
    await createRepositorySelector.click()

    await page
      .locator(`#${CREATE_REPOSITORY_NAME_FIELD_ID}`)
      .fill('testRepoR')
    await page
      .locator(
        `#${CREATE_REPOSITORY_PUBLICATION_URI_FIELD_ID}`
      )
      .fill('https://publicationUri.testRepo.R')
    await page
      .locator(
        `#${CREATE_REPOSITORY_SERVER_ADDRESS_FIELD_ID}`
      )
      .fill('https://serverAddress.testRepoR')
    await page
      .locator(`#${CREATE_REPOSITORY_TECHNOLOGY_FIELD_ID}`)
      .press('Enter')
    await page
      .getByRole('option', { name: 'Python' })
      .press('ArrowDown')
    await page
      .getByRole('option', { name: 'R' })
      .press('Enter')
    await expect(
      page.locator(
        `#${CREATE_REPOSITORY_HASH_METHOD_FIELD_ID}`
      )
    ).not.toBeVisible()
    await page
      .locator(
        `#${CREATE_REPOSITORY_REDIRECT_TO_SOURCE_FIELD_ID}`
      )
      .click()
    await page
      .locator(`#${SUBMIT_BUTTON_ID}`)
      .press('Enter')
    await page.getByTestId('toast-content').dblclick()
    await expect(
      page.locator('#repositories-list-testRepoR')
    ).toHaveCount(1)
  })

  test('create Python repository', async ({ page }) => {
    await login(page, 'einstein')
    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')
    await expect(page).toHaveTitle(/RDepot - repositories/)

    await expect(
      page.locator('#repositories-list-testRepoPython')
    ).toHaveCount(0)
    const createRepositorySelector = page.locator(
      `#${ADD_MAINTAINER_ID}`
    )
    await createRepositorySelector.waitFor()
    await createRepositorySelector.click()

    await page
      .locator(`#${CREATE_REPOSITORY_NAME_FIELD_ID}`)
      .fill('testRepoPython')
    await page
      .locator(
        `#${CREATE_REPOSITORY_PUBLICATION_URI_FIELD_ID}`
      )
      .fill('https://publicationUri.testRepo.Python')
    await page
      .locator(
        `#${CREATE_REPOSITORY_SERVER_ADDRESS_FIELD_ID}`
      )
      .fill('https://serverAddress.testRepoPython')
    await page
      .locator(`#${CREATE_REPOSITORY_TECHNOLOGY_FIELD_ID}`)
      .press('Enter')
    await page
      .getByRole('option', { name: 'Python' })
      .press('Enter')
    await expect(
      page.locator(
        `#${CREATE_REPOSITORY_REDIRECT_TO_SOURCE_FIELD_ID}`
      )
    ).not.toBeVisible()
    await page
      .locator(`#${SUBMIT_BUTTON_ID}`)
      .press('Enter')
    await page.getByTestId('toast-content').dblclick()
    await expect(
      page.locator('#repositories-list-testRepoPython')
    ).toHaveCount(1)
  })

  test('server address alert as admin', async ({
    page
  }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')
    await expect(page).toHaveTitle(/RDepot - repositories/)

    const createRepositorySelector = page.locator(
      `#${ADD_MAINTAINER_ID}`
    )
    await createRepositorySelector.waitFor()
    await createRepositorySelector.click()

    const serverAddressAlert = page.locator(
      `#${EDIT_REPOSITORY_SERVER_ADDRESS_ALERT}`
    )
    await expect(serverAddressAlert).toHaveCount(0)

    await page
      .locator(`#${CREATE_REPOSITORY_TECHNOLOGY_FIELD_ID}`)
      .click({ force: true })
    await page
      .locator('div.v-list-item-title:text-is("Python")')
      .waitFor()
    await page
      .locator('div.v-list-item-title:text-is("Python")')
      .click()

    await page
      .locator(
        `#${CREATE_REPOSITORY_SERVER_ADDRESS_FIELD_ID}`
      )
      .fill('http://oa-rdepot-repo:8080/testrepositoryint')

    await page
      .locator(
        `#${CREATE_REPOSITORY_PUBLICATION_URI_FIELD_ID}`
      )
      .click()
    await serverAddressAlert.waitFor()

    expect(
      await serverAddressAlert.textContent()
    ).toContain(
      'http://oa-rdepot-repo:8080/python/testrepositoryint'
    )
  })

  test('repository server address health check', async ({
    page
  }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')
    await expect(page).toHaveTitle(/RDepot - repositories/)

    const createRepositorySelector = page.locator(
      `#${ADD_MAINTAINER_ID}`
    )
    await createRepositorySelector.waitFor()
    await createRepositorySelector.click()

    const healthCheckIcon = page.locator(
      `#${HEALTH_CHECK_SERVER_ADDRESS_NOT_CHECKED_ID}`
    )
    await healthCheckIcon.waitFor()
    await expect(healthCheckIcon).toHaveCount(1)

    await healthCheckIcon.click()
    const incorrectAddress = page.locator(
      `#${HEALTH_CHECK_SERVER_ADDRESS_INCORRECT_ID}`
    )

    const correctAddress = page.locator(
      `#${HEALTH_CHECK_SERVER_ADDRESS_CORRECT_ID}`
    )
    await incorrectAddress.waitFor()
    await expect(incorrectAddress).toHaveCount(1)
    await expect(healthCheckIcon).toHaveCount(0)

    await page
      .locator(
        `#${CREATE_REPOSITORY_SERVER_ADDRESS_FIELD_ID}`
      )
      .fill('http://wrongAddress/testrepositoryint')

    await healthCheckIcon.waitFor()
    await expect(incorrectAddress).toHaveCount(0)
    await expect(healthCheckIcon).toHaveCount(1)
    await healthCheckIcon.click()
    await incorrectAddress.waitFor()
    await expect(incorrectAddress).toHaveCount(1)
    await expect(healthCheckIcon).toHaveCount(0)

    await page
      .locator(
        `#${CREATE_REPOSITORY_SERVER_ADDRESS_FIELD_ID}`
      )
      .fill('http://oa-rdepot-repo:8080/somerepo')

    await healthCheckIcon.waitFor()
    await expect(incorrectAddress).toHaveCount(0)
    await expect(healthCheckIcon).toHaveCount(1)
    await healthCheckIcon.click()
    await correctAddress.waitFor()
    await expect(incorrectAddress).toHaveCount(0)
    await expect(correctAddress).toHaveCount(1)
    await expect(healthCheckIcon).toHaveCount(0)
  })

  test('create repository name validation', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')
    await expect(page).toHaveTitle(/RDepot - repositories/)

    const createRepositorySelector = page.locator(
      `#${ADD_MAINTAINER_ID}`
    )
    await createRepositorySelector.waitFor()
    await createRepositorySelector.click()

    const nameError = page.locator(
      `#${REPOSITORY_NAME_FIELD_MESSAGES_ID}`
    )

    await page
      .locator(`#${CREATE_REPOSITORY_NAME_FIELD_ID}`)
      .fill('!@#$')

    await expect(nameError).toHaveText('')

    await page
      .locator(`#${CREATE_REPOSITORY_TECHNOLOGY_FIELD_ID}`)
      .press('Enter')
    await page
      .getByRole('option', { name: 'Python' })
      .press('Enter')

    await expect(nameError).toHaveText(
      i18n.t('messages.errors.reponame')
    )

    await page
      .locator(`#${CREATE_REPOSITORY_NAME_FIELD_ID}`)
      .fill('test~123')

    await expect(nameError).toHaveText('')

    await page
      .locator(`#${CREATE_REPOSITORY_TECHNOLOGY_FIELD_ID}`)
      .press('Enter')
    await page
      .getByRole('option', { name: 'Python' })
      .press('ArrowDown')
    await page
      .getByRole('option', { name: 'R' })
      .press('Enter')

    await expect(nameError).toHaveText(
      i18n.t('messages.errors.reponame')
    )

    await page
      .locator(`#${CREATE_REPOSITORY_NAME_FIELD_ID}`)
      .fill('test123')

    await expect(nameError).toHaveText('')
  })
})
