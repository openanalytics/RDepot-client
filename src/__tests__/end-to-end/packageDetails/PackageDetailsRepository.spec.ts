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

import { expect, test } from '@playwright/test'
import { login } from '../helpers/login'
import { awaitTableData } from '@/__tests__/end-to-end/helpers/awaitTableData'
import {
  PACKAGE_DETAILS_BUTTON_R_ID,
  REPOSITORY_DESCRIPTION_LAST_MODIFICATION_DATE_ID,
  REPOSITORY_DESCRIPTION_HASH_METHOD_ID,
  REPOSITORY_REDIRECT_TO_SOURCE_ID,
  PACKAGE_REPOSITORY_CARD_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'

const TITLE = 'package details repository'
test.describe(TITLE, () => {
  test('should redirect to repositories page with correct filtration', async ({
    page
  }) => {
    const initialDataLoaded = awaitTableData(
      page,
      '/api/v2/manager/packages'
    )
    await login(page, 'einstein')
    const rowsSelector = page.locator('role=row')
    await initialDataLoaded
    await expect(rowsSelector).toHaveCount(21)

    const seePackageDetailsButtonSelector = page.locator(
      `#${PACKAGE_DETAILS_BUTTON_R_ID}`
    )
    await seePackageDetailsButtonSelector.waitFor()
    await seePackageDetailsButtonSelector.click()
    await expect(page).toHaveTitle(
      /RDepot - package details/
    )

    const repositoryDetailsButtonLocator = page.locator(
      `#${PACKAGE_REPOSITORY_CARD_ID}`
    )
    await repositoryDetailsButtonLocator.waitFor()
    await repositoryDetailsButtonLocator.click()

    const repoModificationDateSelector = page.locator(
      `#${REPOSITORY_DESCRIPTION_LAST_MODIFICATION_DATE_ID}`
    )
    const repoHashMethodSelector = page.locator(
      `#${REPOSITORY_DESCRIPTION_HASH_METHOD_ID}`
    )
    const repoRedirectToSourceSelector = page.locator(
      `#${REPOSITORY_REDIRECT_TO_SOURCE_ID}`
    )

    await repoModificationDateSelector.waitFor()
    await expect(repoHashMethodSelector).toHaveCount(0)
    await expect(repoRedirectToSourceSelector).toHaveClass(
      /mdi-close-circle-outline/
    )
  })
})
