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
  NOTIFICATIONS_BADGE_ID,
  NOTIFICATIONS_BELL_ID,
  PACKAGES_LIST_ACTIVATE_BUTTON_ID
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '../helpers/login'

const TITLE = 'notifications'
test.describe(TITLE, () => {
  test.fail(
    'display notifications bell with a new event badge',
    async ({ page }) => {
      await login(page, 'einstein')

      const notificationBadgeSelector = page.locator(
        `#${NOTIFICATIONS_BADGE_ID}`
      )

      await page
        .locator(`#${PACKAGES_LIST_ACTIVATE_BUTTON_ID}`)
        .click()
      await page
        .locator(`#${NOTIFICATIONS_BELL_ID}`)
        .click()
      await notificationBadgeSelector.waitFor()

      expect(
        await notificationBadgeSelector.allInnerTexts()
      ).toEqual('1')
      await page
        .locator(`#${NOTIFICATIONS_BELL_ID}`)
        .click()
      await page
        .locator(`#${NOTIFICATIONS_BELL_ID}`)
        .click()

      expect(
        await notificationBadgeSelector.allInnerTexts()
      ).toEqual('0')
    }
  )
})
