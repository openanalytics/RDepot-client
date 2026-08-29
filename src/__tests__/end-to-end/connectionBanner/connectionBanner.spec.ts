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

import { test, expect } from '@playwright/test'
import { login } from '@/__tests__/end-to-end/helpers/login'
import { CONNECTION_BANNER_ID } from '@/__tests__/end-to-end/helpers/elementsIds'

test.describe('connection banner', () => {
  test('should appear when backend returns 504', async ({
    page
  }) => {
    await login(page, 'einstein')

    const connectionBanner = page.locator(
      `#${CONNECTION_BANNER_ID}`
    )
    await expect(connectionBanner).toHaveCount(0)

    await page.route('**/api/v2/**', (route) => {
      return route.fulfill({ status: 504 })
    })

    await page.reload()

    await expect(connectionBanner).toBeVisible()
  })

  test('should send a health check request after 504', async ({
    page
  }) => {
    await login(page, 'einstein')

    await page.route('**/api/v2/**', (route) => {
      return route.fulfill({ status: 504 })
    })

    const healthCheckPromise = page.waitForRequest((req) =>
      req.url().includes('/actuator/health')
    )

    await page.route('**/actuator/health', (route) => {
      return route.fulfill({ status: 503 })
    })

    await page.reload()

    const connectionBanner = page.locator(
      `#${CONNECTION_BANNER_ID}`
    )
    await expect(connectionBanner).toBeVisible()

    const healthCheckRequest = await healthCheckPromise
    expect(healthCheckRequest.url()).toContain(
      '/actuator/health'
    )
  })

  test('should show success banner when health check returns success', async ({
    page
  }) => {
    await login(page, 'einstein')

    await page.route('**/api/v2/**', (route) => {
      return route.fulfill({ status: 504 })
    })

    await page.route('**/actuator/health', (route) => {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ status: 'UP' })
      })
    })

    await page.reload()

    const connectionBanner = page.locator(
      `#${CONNECTION_BANNER_ID}`
    )
    await expect(connectionBanner).toBeVisible()

    await expect(connectionBanner).toHaveClass(
      /text-success/
    )
  })
})
