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
import { test, expect, Page } from '@playwright/test'
import {
  PACKAGES_LIST_ACTIVATE_BUTTON_ID,
  PACKAGES_LIST_ACTIVE_ACCRUED_10_TESTREPO1_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'
import { restoreData } from '@/__tests__/end-to-end/helpers/restoreData'

interface PackageRow {
  id: string
  name: string
  version: string
  repository: string
}

const ACTIVE_PACKAGE: PackageRow = {
  id: PACKAGES_LIST_ACTIVATE_BUTTON_ID,
  name: 'A3',
  version: '0.9.2',
  repository: 'testrepo3'
}

const INACTIVE_PACKAGE: PackageRow = {
  id: PACKAGES_LIST_ACTIVE_ACCRUED_10_TESTREPO1_ID,
  name: 'accrued',
  version: '1.0',
  repository: 'testrepo1'
}

async function toggle(
  page: Page,
  row: PackageRow,
  active: boolean
) {
  const refetch = page.waitForResponse(
    (response) =>
      response.request().method() === 'GET' &&
      /\/api\/v2\/manager\/packages\?/.test(response.url())
  )
  await page.locator(`#${row.id}`).click()
  const packages = (await (await refetch).json()).data
    .content as {
    name: string
    version: string
    repository: { name: string }
    active: boolean
    permissions: string[]
  }[]
  const updated = packages.find(
    (packageBag) =>
      packageBag.name === row.name &&
      packageBag.version === row.version &&
      packageBag.repository.name === row.repository
  )

  expect(updated?.active).toBe(active)
  expect(updated?.permissions).toContain(
    active ? 'package.deactivate' : 'package.activate'
  )
  expect(updated?.permissions).not.toContain(
    active ? 'package.activate' : 'package.deactivate'
  )
  await expect(page.locator(`#${row.id}`)).toBeChecked({
    checked: active
  })
}

async function expectPersisted(
  page: Page,
  row: PackageRow,
  active: boolean
) {
  await page.reload()
  await expect(page.locator(`#${row.id}`)).toBeChecked({
    checked: active
  })
}

const TITLE = 'packages activation'
test.describe(TITLE, { tag: '@serial' }, () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeAll(async ({}, testInfo) => {
    await restoreData(testInfo.project.name)
  })

  test('deactivate and reactivate an active package', async ({
    page
  }) => {
    await login(page, 'einstein')
    await expect(
      page.locator(`#${ACTIVE_PACKAGE.id}`)
    ).toBeChecked()

    await toggle(page, ACTIVE_PACKAGE, false)
    await toggle(page, ACTIVE_PACKAGE, true)
    await expectPersisted(page, ACTIVE_PACKAGE, true)
  })

  test('activate and deactivate an inactive package', async ({
    page
  }) => {
    await login(page, 'einstein')
    await expect(
      page.locator(`#${INACTIVE_PACKAGE.id}`)
    ).not.toBeChecked()

    await toggle(page, INACTIVE_PACKAGE, true)
    await toggle(page, INACTIVE_PACKAGE, false)
    await expectPersisted(page, INACTIVE_PACKAGE, false)
  })
})
