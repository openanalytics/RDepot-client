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
  COPY_PUBLICATION_URI_TESTREPO1_BUTTON_ID,
  COPY_SERVER_ADDRESS_TESTREPO2_BUTTON_ID,
  REPOSITORIES_LIST_PYTHON_REPO_ID,
  REPOSITORIES_LIST_R_REPO_ID,
  REPOSITORIES_SIDEBAR_ID,
  REPOSITORY_DESCRIPTION_HASH_METHOD_ID,
  REPOSITORY_DESCRIPTION_LAST_MODIFICATION_DATE_ID,
  REPOSITORY_DESCRIPTION_LAST_PUBLICATION_DATE_ID,
  REPOSITORY_DESCRIPTION_PUBLICATION_STATUS_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'

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

    await rRepoSelector.waitFor()
    await rRepoSelector.click()
    await repoModificationDateSelector.waitFor()
    await repoStatusSelector.waitFor()
    await repoPublicationDateSelector.waitFor()
    await expect(repoHashMethodSelector).toHaveCount(0)
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

    const copyButtonSelector = page.locator(
      `#${COPY_SERVER_ADDRESS_TESTREPO2_BUTTON_ID}`
    )
    await copyButtonSelector.waitFor()
    await copyButtonSelector.click()
  })
})
