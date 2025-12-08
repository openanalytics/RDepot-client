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
import { login } from '../helpers/login'

const TITLE = 'page not found'
test.describe(TITLE, () => {
  test('non existing package details', async ({ page }) => {
    await login(page, 'einstein')
    await expect(page).toHaveTitle(/RDepot - packages/)
    await page.goto('/packages/R/1111111')

    await expect(page).toHaveTitle(
      /RDepot - Page not found/
    )
  })
})
