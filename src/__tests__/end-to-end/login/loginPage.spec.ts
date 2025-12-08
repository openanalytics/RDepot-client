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
import { login } from '@/__tests__/end-to-end/helpers/login'
import {
  PASSWORD_INPUT_ID,
  SUBMIT_LOGIN_BUTTON_ID,
  USERNAME_INPUT_ID,
  REPOSITORY_MAINTAINERS_SIDEBAR_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'

test.describe('login page', () => {
  test('has title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/login/)
  })

  test('correctly logged in', async ({ page }) => {
    await login(page, 'einstein')
  })

  test('should redirect back to original URL after successful authentication', async ({
    page
  }) => {
    await page.goto('/')
    await page.goto('/repositories')
    await expect(page).toHaveTitle(/login/)
    await page
      .locator(`#${USERNAME_INPUT_ID}`)
      .fill('einstein')
    await page
      .locator(`#${PASSWORD_INPUT_ID}`)
      .fill('testpassword')
    await page.locator(`#${SUBMIT_LOGIN_BUTTON_ID}`).click()
    await expect(page).toHaveTitle(/repositories/)
  })

  test('should update sidebar after re-login on different account', async ({
    page
  }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/login/)
    await page
      .locator(`#${USERNAME_INPUT_ID}`)
      .fill('einstein')
    await page
      .locator(`#${PASSWORD_INPUT_ID}`)
      .fill('testpassword')
    await page.locator(`#${SUBMIT_LOGIN_BUTTON_ID}`).click()

    await page
      .locator(`#${REPOSITORY_MAINTAINERS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repository-maintainers')

    await expect(page).toHaveTitle(/repository maintainers/)

    await page.locator('#logout-button').click()

    await expect(page).toHaveTitle(/login/)
    await page
      .locator(`#${USERNAME_INPUT_ID}`)
      .fill('tesla')
    await page
      .locator(`#${PASSWORD_INPUT_ID}`)
      .fill('testpassword')
    await page.locator(`#${SUBMIT_LOGIN_BUTTON_ID}`).click()

    await expect(
      await page.locator(
        `#${REPOSITORY_MAINTAINERS_SIDEBAR_ID}`
      )
    ).toBeHidden()
  })
})
