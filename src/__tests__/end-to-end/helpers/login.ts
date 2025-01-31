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

import {
  PASSWORD_INPUT_ID,
  SUBMIT_LOGIN_BUTTON_ID,
  USERNAME_INPUT_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { expect, Page } from '@playwright/test'

export async function login(page: Page, login: string) {
  await page.goto('/')
  await page.locator(`#${USERNAME_INPUT_ID}`).fill(login)
  await page
    .locator(`#${PASSWORD_INPUT_ID}`)
    .fill('testpassword')
  await page.locator(`#${SUBMIT_LOGIN_BUTTON_ID}`).click()
  await page.waitForURL('**/packages')
  await expect(page).toHaveTitle(/RDepot - packages/)
}
