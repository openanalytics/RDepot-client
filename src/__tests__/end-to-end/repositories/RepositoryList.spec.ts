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
  CANCEL_BUTTON_ID,
  COPY_PUBLICATION_URI_TESTREPO1_BUTTON_ID,
  COPY_SERVER_ADDRESS_TESTREPO2_BUTTON_ID,
  DELETE_REPO_2_ICON_ID,
  DELETE_REPOSITORY_DIALOG_ID,
  REPOSITORIES_LIST_PYTHON_REPO_ID,
  REPOSITORIES_LIST_R_REPO_ID,
  REPOSITORIES_SIDEBAR_ID,
  REPOSITORY_DESCRIPTION_HASH_METHOD_ID,
  REPOSITORY_DESCRIPTION_LAST_MODIFICATION_DATE_ID,
  REPOSITORY_DESCRIPTION_LAST_PUBLICATION_DATE_ID,
  REPOSITORY_DESCRIPTION_PUBLICATION_STATUS_ID,
  REPUBLISH_REPOSITORY_DIALOG_ID,
  REPUBLISH_REPOSITORY_TESTREPO10_ICON_ID,
  REPUBLISH_REPOSITORY_TESTREPO2_ICON_ID,
  REPOSITORY_REDIRECT_TO_SOURCE_ID,
  EDIT_REPOSITORY_TESTREPO2_ICON_ID,
  EDIT_REPOSITORY_SERVER_ADDRESS_FIELD_ID,
  SUBMIT_BUTTON_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'
import { restoreData } from '@/__tests__/end-to-end/helpers/restoreData'

const TITLE = 'repository list'
test.describe(TITLE, () => {
  test('expand Python repository', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')

    const pythonRepoSelector = page.locator(
      `#${REPOSITORIES_LIST_PYTHON_REPO_ID}`
    )

    const repoModificationDateSelector = page.locator(
      `#${REPOSITORY_DESCRIPTION_LAST_MODIFICATION_DATE_ID}`
    )
    const repoStatusSelector = page.locator(
      `#${REPOSITORY_DESCRIPTION_PUBLICATION_STATUS_ID}`
    )
    const repoPublicationDateSelector = page.locator(
      `#${REPOSITORY_DESCRIPTION_LAST_PUBLICATION_DATE_ID}`
    )
    const repoHashMethodSelector = page.locator(
      `#${REPOSITORY_DESCRIPTION_HASH_METHOD_ID}`
    )

    await pythonRepoSelector.waitFor()
    await pythonRepoSelector.click()
    await repoModificationDateSelector.waitFor()
    await repoStatusSelector.waitFor()
    await repoPublicationDateSelector.waitFor()
    await repoHashMethodSelector.waitFor()
  })

  test('expand R repository', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')

    const rRepoSelector = page.locator(
      `#${REPOSITORIES_LIST_R_REPO_ID}`
    )

    const repoModificationDateSelector = page.locator(
      `#${REPOSITORY_DESCRIPTION_LAST_MODIFICATION_DATE_ID}`
    )
    const repoStatusSelector = page.locator(
      `#${REPOSITORY_DESCRIPTION_PUBLICATION_STATUS_ID}`
    )
    const repoPublicationDateSelector = page.locator(
      `#${REPOSITORY_DESCRIPTION_LAST_PUBLICATION_DATE_ID}`
    )
    const repoHashMethodSelector = page.locator(
      `#${REPOSITORY_DESCRIPTION_HASH_METHOD_ID}`
    )
    const repoRedirectToSourceSelector = page.locator(
      `#${REPOSITORY_REDIRECT_TO_SOURCE_ID}`
    )

    await rRepoSelector.waitFor()
    await rRepoSelector.click()
    await repoModificationDateSelector.waitFor()
    await repoStatusSelector.waitFor()
    await repoPublicationDateSelector.waitFor()
    await expect(repoHashMethodSelector).toHaveCount(0)
    await expect(repoRedirectToSourceSelector).toHaveClass(
      /mdi-close-circle-outline/
    )
  })

  test('copy publication', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')

    const copyButtonSelector = page.locator(
      `#${COPY_PUBLICATION_URI_TESTREPO1_BUTTON_ID}`
    )
    await copyButtonSelector.waitFor()
    await copyButtonSelector.click()
  })

  test('copy server address', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')

    const rRepoSelector = page.locator(
      `#${REPOSITORIES_LIST_R_REPO_ID}`
    )
    await rRepoSelector.waitFor()
    await rRepoSelector.click()

    const copyButtonSelector = page.locator(
      `#${COPY_SERVER_ADDRESS_TESTREPO2_BUTTON_ID}`
    )
    await copyButtonSelector.waitFor()
    await copyButtonSelector.click()
  })

  test('open republish dialog', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')
    const republishButtonSelector = page.locator(
      `#${REPUBLISH_REPOSITORY_TESTREPO2_ICON_ID}`
    )
    await republishButtonSelector.waitFor()
    await republishButtonSelector.click()

    const republishDialogSelector = page.locator(
      `#${REPUBLISH_REPOSITORY_DIALOG_ID}`
    )
    await republishDialogSelector.waitFor()

    const cancelDialogSelector = page.locator(
      `#${CANCEL_BUTTON_ID}`
    )
    await cancelDialogSelector.waitFor()
    await cancelDialogSelector.click()
  })

  test('republish dialog disabled when repository is not published', async ({
    page
  }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')
    const republishButtonSelector = page.locator(
      `#${REPUBLISH_REPOSITORY_TESTREPO10_ICON_ID}.text-grey`
    )
    await republishButtonSelector.waitFor()
  })

  test('open delete dialog', async ({ page }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')
    const deleteButtonSelector = page.locator(
      `#${DELETE_REPO_2_ICON_ID}`
    )
    await deleteButtonSelector.waitFor()
    await deleteButtonSelector.click()

    const deleteDialogSelector = page.locator(
      `#${DELETE_REPOSITORY_DIALOG_ID}`
    )
    await deleteDialogSelector.waitFor()

    const cancelDialogSelector = page.locator(
      `#${CANCEL_BUTTON_ID}`
    )
    await cancelDialogSelector.waitFor()
    await cancelDialogSelector.click()
  })
})

test.describe(TITLE, { tag: '@serial' }, () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeAll(async ({}, testInfo) => {
    await restoreData(testInfo.project.name)
  })

  test('display deprecated server address', async ({
    page
  }) => {
    await login(page, 'einstein')

    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')

    const repositoryServerAddressWarnings = page.locator(
      'i.mdi-alert-decagram'
    )
    await expect(
      repositoryServerAddressWarnings
    ).toHaveCount(7)

    const editRepoSelector = page.locator(
      `#${EDIT_REPOSITORY_TESTREPO2_ICON_ID}`
    )
    await editRepoSelector.waitFor()
    await editRepoSelector.click()

    const repositoryServerAddressSelector = page.locator(
      `#${EDIT_REPOSITORY_SERVER_ADDRESS_FIELD_ID}`
    )
    await repositoryServerAddressSelector.waitFor()
    await repositoryServerAddressSelector.fill(
      'http://oa-rdepot-repo:8080/r/testrepo2'
    )

    await page.locator(`#${SUBMIT_BUTTON_ID}`).click()
    await expect(
      repositoryServerAddressWarnings
    ).toHaveCount(6)
  })

  test('should check how many repositories are in the table footer', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')
    await expect(page).toHaveTitle(/RDepot - repositories/)
    const repositoriesRowsSelector =
      page.locator('role=row')
    await expect(repositoriesRowsSelector).toHaveCount(8)
    await expect(
      (
        await page
          .locator('.v-data-table-footer__info')
          .innerText()
      ).includes('1-7 of 7')
    ).toBe(true)
  })
})
