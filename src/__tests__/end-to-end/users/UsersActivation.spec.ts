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
  ACTIVE_CHECKBOX_ID,
  USERS_SIDEBAR_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'
import { restoreData } from '@/__tests__/end-to-end/helpers/restoreData'

const ACTIVE_USER = 'tarski@localhost'
const INACTIVE_USER = 'doe@localhost'

function activeCheckbox(page: Page, email: string) {
  return page
    .locator('role=row', { hasText: email })
    .locator(`#${ACTIVE_CHECKBOX_ID}`)
}

async function openUsers(page: Page) {
  await page.locator(`#${USERS_SIDEBAR_ID}`).click()
  await page.waitForURL('**/users')
  await activeCheckbox(page, ACTIVE_USER).waitFor()
}

async function toggle(
  page: Page,
  email: string,
  active: boolean
) {
  const refetch = page.waitForResponse(
    (response) =>
      response.request().method() === 'GET' &&
      /\/api\/v2\/manager\/users\?/.test(response.url())
  )
  await activeCheckbox(page, email).click()
  const users = (await (await refetch).json()).data
    .content as {
    email: string
    active: boolean
    permissions: string[]
  }[]
  const updated = users.find((user) => user.email === email)

  expect(updated?.active).toBe(active)
  expect(updated?.permissions).toContain(
    active ? 'user.deactivate' : 'user.activate'
  )
  expect(updated?.permissions).not.toContain(
    active ? 'user.activate' : 'user.deactivate'
  )
  await expect(activeCheckbox(page, email)).toBeChecked({
    checked: active
  })
}

async function expectPersisted(
  page: Page,
  email: string,
  active: boolean
) {
  await page.reload()
  await expect(activeCheckbox(page, email)).toBeChecked({
    checked: active
  })
}

const TITLE = 'users activation'
test.describe(TITLE, { tag: '@serial' }, () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeAll(async ({}, testInfo) => {
    await restoreData(testInfo.project.name)
  })

  test('does not show "not authorized" on users that can be toggled', async ({
    page
  }) => {
    await login(page, 'einstein')
    await openUsers(page)

    for (const email of [ACTIVE_USER, INACTIVE_USER]) {
      await activeCheckbox(page, email).hover()
      await expect(
        page.locator('.v-tooltip.v-overlay--active')
      ).toHaveCount(0)
    }
  })

  test('deactivate and reactivate an active user', async ({
    page
  }) => {
    await login(page, 'einstein')
    await openUsers(page)
    await expect(
      activeCheckbox(page, ACTIVE_USER)
    ).toBeChecked()

    await toggle(page, ACTIVE_USER, false)
    await toggle(page, ACTIVE_USER, true)
    await expectPersisted(page, ACTIVE_USER, true)
  })

  test('activate and deactivate an inactive user', async ({
    page
  }) => {
    await login(page, 'einstein')
    await openUsers(page)
    await expect(
      activeCheckbox(page, INACTIVE_USER)
    ).not.toBeChecked()

    await toggle(page, INACTIVE_USER, true)
    await toggle(page, INACTIVE_USER, false)
    await expectPersisted(page, INACTIVE_USER, false)
  })
})
