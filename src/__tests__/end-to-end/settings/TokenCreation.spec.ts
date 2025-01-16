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
  ACCESS_TOKENS_SIDEBAR_ID,
  ADD_TOKEN_BUTTON_ID,
  CREATE_TOKEN_EXPIRATION_DATE_INPUT_ID,
  CREATE_TOKEN_NAME_INPUT_ID,
  CREATE_TOKEN_SUBMIT_BUTTON_ID,
  SETTINGS_LIST_SIDEBAR_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { restoreData } from '@/__tests__/end-to-end/helpers/restoreData'
import { login } from '@/__tests__/end-to-end/helpers/login'

// eslint-disable-next-line no-empty-pattern
test.beforeAll(async ({}, testInfo) => {
  await restoreData(testInfo.project.name)
})

const TITLE_SERIAL = 'tokens'
test.describe(TITLE_SERIAL, { tag: '@serial' }, () => {
  test('create', async ({ page }) => {
    await login(page, 'einstein')
    await page
      .locator(`#${SETTINGS_LIST_SIDEBAR_ID}`)
      .click()
    await page
      .locator(`#${ACCESS_TOKENS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/settings-tokens')

    const createTokenSelector = page.locator(
      `#${ADD_TOKEN_BUTTON_ID}`
    )
    await createTokenSelector.waitFor()
    await createTokenSelector.click()

    const tokenNameInputSelector = page.locator(
      `#${CREATE_TOKEN_NAME_INPUT_ID}`
    )
    await tokenNameInputSelector.waitFor()
    await tokenNameInputSelector.fill('test_token_name')

    const tokenExpDateInputSelector = page.locator(
      `#${CREATE_TOKEN_EXPIRATION_DATE_INPUT_ID}`
    )
    const expValue =
      await tokenExpDateInputSelector.inputValue()

    expect(expValue).not.toBeUndefined()
    await page
      .locator(`#${CREATE_TOKEN_SUBMIT_BUTTON_ID}`)
      .click()
  })
})
