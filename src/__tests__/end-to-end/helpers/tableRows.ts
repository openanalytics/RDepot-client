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

import { expect, Page, Response } from '@playwright/test'

const TABLE_PAGE_SIZE = 20

export function awaitTablePage(
  page: Page,
  apiPath: string
) {
  return page.waitForResponse(
    (response) =>
      response.url().includes(apiPath) &&
      response.url().includes(`size=${TABLE_PAGE_SIZE}`) &&
      response.request().method() === 'GET' &&
      response.status() === 200
  )
}

export async function expectRowsFrom(
  page: Page,
  response: Promise<Response>
) {
  const items: unknown[] = (await (await response).json())
    .data.content
  await expect(page.locator('role=row')).toHaveCount(
    items.length + 1
  )
  return items.length
}
