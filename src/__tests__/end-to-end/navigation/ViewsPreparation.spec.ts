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
  PACKAGE_MAINTAINERS_FILTRATION_SEARCH_FIELD_ID,
  PACKAGE_MAINTAINERS_SIDEBAR_ID,
  PACKAGES_FILTRATION_MAINTAINER_FIELD_GALILEO_ID,
  PACKAGES_FILTRATION_MAINTAINER_FIELD_ID,
  PACKAGES_SIDEBAR_ID,
  REPOSITORIES_FILTRATION_SEARCH_FIELD_ID,
  REPOSITORIES_SIDEBAR_ID,
  REPOSITORY_MAINTAINERS_FILTRATION_SEARCH_FIELD_ID,
  REPOSITORY_MAINTAINERS_SIDEBAR_ID,
  SUBMISSIONS_FILTRATION_REPOSITORY_FIELD_ID,
  SUBMISSIONS_FILTRATION_REPOSITORY_FIELD_TESTREPO1_ID,
  SUBMISSIONS_SIDEBAR_ID,
  UPLOAD_PACKAGES_SIDEBAR_ID,
  UPLOAD_SUBMISSION_CONTINUE_BUTTON_ID,
  UPLOAD_SUBMISSION_REPOSITORY_FIELD_ID,
  UPLOAD_SUBMISSION_REPOSITORY_TESTREPO3_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'

const TITLE = 'views preparation - filtration cleaning'
test.describe(TITLE, () => {
  test('repositories view - after uploading package', async ({
    page
  }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${UPLOAD_PACKAGES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/upload-packages')
    await page
      .locator(`#${UPLOAD_SUBMISSION_REPOSITORY_FIELD_ID}`)
      .click()
    const repositoryOptionLocator = page.locator(
      `#${UPLOAD_SUBMISSION_REPOSITORY_TESTREPO3_ID}`
    )
    repositoryOptionLocator.waitFor()
    repositoryOptionLocator.click()
    await page
      .locator(`#${UPLOAD_SUBMISSION_CONTINUE_BUTTON_ID}`)
      .click()
    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')
    const repositoriesSearchFieldLocator = page.locator(
      `input#${REPOSITORIES_FILTRATION_SEARCH_FIELD_ID}`
    )
    expect(
      await repositoriesSearchFieldLocator.inputValue()
    ).toEqual('')
  })
  test('repositories view - after repository maintainers filtration', async ({
    page
  }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORY_MAINTAINERS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repository-maintainers')

    await page
      .locator(
        `#${REPOSITORY_MAINTAINERS_FILTRATION_SEARCH_FIELD_ID}`
      )
      .fill('testrepo1')

    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')
    const repositoriesSearchFieldLocator = page.locator(
      `input#${REPOSITORIES_FILTRATION_SEARCH_FIELD_ID}`
    )
    expect(
      await repositoriesSearchFieldLocator.inputValue()
    ).toEqual('')
  })
  test('packages view - reset maintainers select input', async ({
    page
  }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${PACKAGE_MAINTAINERS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/package-maintainers')

    await page
      .locator(
        `#${PACKAGE_MAINTAINERS_FILTRATION_SEARCH_FIELD_ID}`
      )
      .fill('Local Admin User')

    await page.locator(`#${PACKAGES_SIDEBAR_ID}`).click()

    await page.waitForURL('**/packages')
    await expect(page).toHaveTitle(/RDepot - packages/)
    await page
      .locator(
        `#${PACKAGES_FILTRATION_MAINTAINER_FIELD_ID}`
      )
      .click({ force: true })
    await page
      .locator(
        `#${PACKAGES_FILTRATION_MAINTAINER_FIELD_GALILEO_ID}`
      )
      .waitFor()
  })
  test('submissions view', async ({ page }) => {
    await login(page, 'einstein')
    await page
      .locator(`#${UPLOAD_PACKAGES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/upload-packages')
    await page
      .locator(`#${UPLOAD_SUBMISSION_REPOSITORY_FIELD_ID}`)
      .click()
    const repositoryOptionLocator = page.locator(
      `#${UPLOAD_SUBMISSION_REPOSITORY_TESTREPO3_ID}`
    )
    await repositoryOptionLocator.waitFor()
    await repositoryOptionLocator.click()
    await page
      .locator(`#${UPLOAD_SUBMISSION_CONTINUE_BUTTON_ID}`)
      .click()

    await page.locator(`#${SUBMISSIONS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/submissions')
    await page
      .locator(
        `#${SUBMISSIONS_FILTRATION_REPOSITORY_FIELD_ID}`
      )
      .click({ force: true })
    await page
      .locator(
        `#${SUBMISSIONS_FILTRATION_REPOSITORY_FIELD_TESTREPO1_ID}`
      )
      .waitFor()
  })
})
