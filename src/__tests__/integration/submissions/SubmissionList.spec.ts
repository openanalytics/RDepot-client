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

import {
  describe,
  it,
  beforeEach,
  afterEach,
  beforeAll
} from 'vitest'
import {
  SUBMISSIONS_SIDEBAR_ID,
  DOWNLOAD_SUBMISSION_ID,
  DOWNLOAD_SUBMISSION_FILENAME_ID,
  SUBMISSIONS_FILTRATION_SEARCH_FIELD_ID,
  WAITING_FOR_APPROVE_SUBMISSION_ID,
  WAITING_FOR_REJECT_SUBMISSION_ID,
  WAITING_FOR_CANCEL_SUBMISSION_ID,
  SUBMISSIONS_MULTI_ACTIONS_ID,
  SUBMISSIONS_LIST_MODAL_ID,
  SUBMISSIONS_LIST_ACTIONS_BENCHMARKING_010_TESTREPO4_ID,
  SUBMIT_BUTTON_ID,
  SUBMISSIONS_LIST_ACTIONS_REQUESTS_2191_TESTREPO8_ID,
  DOWNLOAD_SUBMISSION_FILENAME_REQUESTS_ID,
  SUBMISSIONS_LIST_ACTIONS_USL_200_TESTREPO2_ID,
  SUBMISSIONS_MULTI_DOWNLOAD_ID,
  DOWNLOAD_SUBMISSION_FILENAME_USL_ID
} from '../helpers/elementsIds'
import { restoreData } from '../helpers/restoreData'
import { login } from '../helpers/login'
import {
  clickOnButton,
  createDriver,
  goToPage,
  clearDownloadDirectory,
  clickOnMenuItemById,
  delay
} from '../helpers/helpers'
import fs from 'fs'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { By, until } = require('selenium-webdriver')

let driver: any
const pathToFileOrDir = './downloads/'

beforeAll(async () => {
  await restoreData()
})

beforeEach(async () => {
  driver = await createDriver()
})

afterEach(async () => {
  clearDownloadDirectory()
  await driver.quit()
})

describe('Submissions actions', () => {
  it('download waiting submission', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      SUBMISSIONS_SIDEBAR_ID,
      'RDepot - submissions'
    )
    await clickOnButton(driver, DOWNLOAD_SUBMISSION_ID)
    await delay(5000)

    expect(
      fs.existsSync(
        pathToFileOrDir + DOWNLOAD_SUBMISSION_FILENAME_ID
      )
    ).toBe(true)
  })

  it('download a few waiting submissions', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      SUBMISSIONS_SIDEBAR_ID,
      'RDepot - submissions'
    )
    await clickOnButton(
      driver,
      //submission already rejected - should not be downloaded
      SUBMISSIONS_LIST_ACTIONS_BENCHMARKING_010_TESTREPO4_ID
    )
    await clickOnButton(
      driver,
      SUBMISSIONS_LIST_ACTIONS_REQUESTS_2191_TESTREPO8_ID
    )

    await clickOnButton(
      driver,
      SUBMISSIONS_LIST_ACTIONS_USL_200_TESTREPO2_ID
    )
    await clickOnButton(
      driver,
      SUBMISSIONS_MULTI_ACTIONS_ID
    )

    await clickOnMenuItemById(
      driver,
      SUBMISSIONS_MULTI_DOWNLOAD_ID
    )

    const downloadSubmissionsModal = await driver.wait(
      until.elementLocated(
        By.id(SUBMISSIONS_LIST_MODAL_ID)
      ),
      8000
    )

    await driver.wait(
      until.elementLocated(
        By.className('v-list-item-title')
      ),
      8000
    )

    const submissionsToDownload =
      await downloadSubmissionsModal.findElements(
        By.className('v-list-item-title')
      )

    expect(submissionsToDownload.length).toEqual(3)

    await clickOnButton(driver, SUBMIT_BUTTON_ID)

    await driver.wait(
      until.elementLocated(
        By.xpath(
          `//a[@download="${DOWNLOAD_SUBMISSION_FILENAME_REQUESTS_ID}"]`
        )
      ),
      8000
    )

    await driver.wait(
      until.elementLocated(
        By.xpath(
          `//a[@download="${DOWNLOAD_SUBMISSION_FILENAME_USL_ID}"]`
        )
      ),
      8000
    )
  })

  it('accept submission', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      SUBMISSIONS_SIDEBAR_ID,
      'RDepot - submissions'
    )
    await clickOnButton(
      driver,
      WAITING_FOR_APPROVE_SUBMISSION_ID
    )
    await delay(2000)

    await driver.wait(
      until.elementLocated(
        By.id(SUBMISSIONS_FILTRATION_SEARCH_FIELD_ID)
      ),
      8000
    )

    driver
      .findElement(
        By.id(SUBMISSIONS_FILTRATION_SEARCH_FIELD_ID)
      )
      .sendKeys('visdat')
    await delay(2000)
    let exists = await driver
      .findElements(
        By.id(WAITING_FOR_APPROVE_SUBMISSION_ID)
      )
      .then((found: any) => !!found.length)

    expect(exists).toBe(false)
    exists = await driver
      .findElements(By.id(DOWNLOAD_SUBMISSION_ID))
      .then((found: any) => !!found.length)
    expect(exists).toBe(true)
  })

  it('download accepted submission', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      SUBMISSIONS_SIDEBAR_ID,
      'RDepot - submissions'
    )
    await driver.wait(
      until.elementLocated(
        By.id(SUBMISSIONS_FILTRATION_SEARCH_FIELD_ID)
      ),
      8000
    )

    driver
      .findElement(
        By.id(SUBMISSIONS_FILTRATION_SEARCH_FIELD_ID)
      )
      .sendKeys('visdat')
    await delay(2000)
    await clickOnButton(driver, DOWNLOAD_SUBMISSION_ID)
    await delay(2000)
    expect(
      fs.existsSync(
        pathToFileOrDir + DOWNLOAD_SUBMISSION_FILENAME_ID
      )
    ).toBe(true)
  })

  it('reject submission', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      SUBMISSIONS_SIDEBAR_ID,
      'RDepot - submissions'
    )
    await clickOnButton(
      driver,
      WAITING_FOR_REJECT_SUBMISSION_ID
    )
    await delay(2000)

    driver
      .findElement(
        By.id(SUBMISSIONS_FILTRATION_SEARCH_FIELD_ID)
      )
      .sendKeys('requests')
    await delay(2000)

    const exists = await driver
      .findElements(By.id(WAITING_FOR_REJECT_SUBMISSION_ID))
      .then((found: any) => !!found.length)

    expect(exists).toBe(false)
  })

  it('cancel submission', async () => {
    await login(driver, 'newton')
    await goToPage(
      driver,
      SUBMISSIONS_SIDEBAR_ID,
      'RDepot - submissions'
    )
    await clickOnButton(
      driver,
      WAITING_FOR_CANCEL_SUBMISSION_ID
    )
    await delay(2000)
    driver
      .findElement(
        By.id(SUBMISSIONS_FILTRATION_SEARCH_FIELD_ID)
      )
      .sendKeys('requests')
    await delay(2000)

    const exists = await driver
      .findElements(By.id(WAITING_FOR_CANCEL_SUBMISSION_ID))
      .then((found: any) => !!found.length)

    expect(exists).toBe(false)
  })
})
