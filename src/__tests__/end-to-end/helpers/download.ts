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

import { expect, Page } from '@playwright/test'
import fs from 'fs'

export async function downloadFile(
  page: Page,
  downloadButtonId: string,
  expectedDownloadFileName?: string
) {
  const downloadPromise = page.waitForEvent('download')
  await page.locator(`#${downloadButtonId}`).click()
  const download = await downloadPromise
  await download.saveAs(
    './downloads/' + download.suggestedFilename()
  )

  const expectedFileName = expectedDownloadFileName
    ? expectedDownloadFileName
    : download.suggestedFilename()

  ifFileIsInFilesSystem(expectedFileName)
}

export function ifFileIsInFilesSystem(fileName: string) {
  expect(fs.existsSync('./downloads/' + fileName)).toBe(
    true
  )
}
