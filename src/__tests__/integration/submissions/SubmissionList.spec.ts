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
  SUBMISSIONS_MULTI_ACCEPT_ID,
  SUBMISSIONS_LIST_MODAL_ID,
  SUBMISSIONS_LIST_SELECT_ALL_ID,
  CANCEL_BUTTON_ID,
  SUBMISSIONS_LIST_ACTIONS_BENCHMARKING_010_TESTREPO4_ID,
  SUBMISSIONS_LIST_ACTIONS_VISDAT_010_TESTREPO2_ID,
  SUBMISSIONS_LIST_ACTIONS_REQUESTS_2281_TESTREPO8_ID,
  SUBMISSIONS_MULTI_REJECT_ID,
  SUBMIT_BUTTON_ID,
  SUBMISSIONS_LIST_ACTIONS_A3_091_TESTREPO4_ID,
  SUBMISSIONS_LIST_ACTIONS_ABC_10_TESTREPO4_ID,
  SUBMISSIONS_LIST_ACTIONS_REQUESTS_2191_TESTREPO8_ID,
  SUBMISSIONS_MULTI_CANCEL_ID,
  SUBMISSIONS_LIST_ACTIONS_WHEEL_0380_TESTREPO10_ID,
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
  clickOnElementByClass,
  checkIfDisabled,
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

describe('submissions list - multi actions', async () => {
  beforeAll(async () => {
    await restoreData()
  })

  it('select and unselect submissions works properly', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      SUBMISSIONS_SIDEBAR_ID,
      'RDepot - submissions'
    )
    await clickOnButton(
      driver,
      SUBMISSIONS_LIST_SELECT_ALL_ID
    )

    await clickOnButton(
      driver,
      SUBMISSIONS_MULTI_ACTIONS_ID
    )
    await clickOnMenuItemById(
      driver,
      SUBMISSIONS_MULTI_ACCEPT_ID
    )

    let acceptSubmissionsModal = await driver.wait(
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

    let submissionsToAccept =
      await acceptSubmissionsModal.findElements(
        By.className('v-list-item-title')
      )

    expect(submissionsToAccept.length).toEqual(20)

    await clickOnButton(driver, CANCEL_BUTTON_ID)

    await clickOnButton(
      driver,
      SUBMISSIONS_LIST_ACTIONS_BENCHMARKING_010_TESTREPO4_ID
    )

    await clickOnButton(
      driver,
      SUBMISSIONS_MULTI_ACTIONS_ID
    )
    await clickOnMenuItemById(
      driver,
      SUBMISSIONS_MULTI_ACCEPT_ID
    )

    acceptSubmissionsModal = await driver.wait(
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

    submissionsToAccept =
      await acceptSubmissionsModal.findElements(
        By.className('v-list-item-title')
      )

    expect(submissionsToAccept.length).toEqual(19)

    await clickOnButton(driver, CANCEL_BUTTON_ID)

    await clickOnButton(
      driver,
      SUBMISSIONS_LIST_SELECT_ALL_ID
    )

    await clickOnButton(
      driver,
      SUBMISSIONS_LIST_SELECT_ALL_ID
    )

    await clickOnElementByClass(driver, 'mdi-chevron-right')
    await clickOnElementByClass(driver, 'mdi-chevron-right')

    await clickOnButton(
      driver,
      SUBMISSIONS_LIST_SELECT_ALL_ID
    )

    await clickOnButton(
      driver,
      SUBMISSIONS_MULTI_ACTIONS_ID
    )
    await clickOnMenuItemById(
      driver,
      SUBMISSIONS_MULTI_ACCEPT_ID
    )

    acceptSubmissionsModal = await driver.wait(
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

    submissionsToAccept =
      await acceptSubmissionsModal.findElements(
        By.className('v-list-item-title')
      )

    expect(submissionsToAccept.length).toEqual(1)

    await clickOnButton(driver, CANCEL_BUTTON_ID)
  })

  it('reject a few submissions using speed dial', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      SUBMISSIONS_SIDEBAR_ID,
      'RDepot - submissions'
    )
    await clickOnButton(
      driver,
      SUBMISSIONS_LIST_ACTIONS_VISDAT_010_TESTREPO2_ID
    )
    await clickOnButton(
      driver,
      SUBMISSIONS_LIST_ACTIONS_REQUESTS_2191_TESTREPO8_ID
    )
    await clickOnButton(
      driver,
      SUBMISSIONS_MULTI_ACTIONS_ID
    )
    await clickOnButton(driver, SUBMISSIONS_MULTI_REJECT_ID)

    await driver.wait(
      until.elementLocated(
        By.id(SUBMISSIONS_LIST_MODAL_ID)
      ),
      8000
    )
    await clickOnButton(driver, SUBMIT_BUTTON_ID)
  })

  it('cancel a few submissions using speed dial', async () => {
    await login(driver, 'galieleo')
    await goToPage(
      driver,
      SUBMISSIONS_SIDEBAR_ID,
      'RDepot - submissions'
    )
    await clickOnButton(
      driver,
      SUBMISSIONS_LIST_ACTIONS_A3_091_TESTREPO4_ID
    )
    await clickOnButton(
      driver,
      SUBMISSIONS_LIST_ACTIONS_ABC_10_TESTREPO4_ID
    )
    await clickOnButton(
      driver,
      SUBMISSIONS_MULTI_ACTIONS_ID
    )
    await clickOnButton(driver, SUBMISSIONS_MULTI_CANCEL_ID)

    await driver.wait(
      until.elementLocated(
        By.id(SUBMISSIONS_LIST_MODAL_ID)
      ),
      8000
    )
    await clickOnButton(driver, SUBMIT_BUTTON_ID)
  })
  it('disable all speed dial options when no submission is chosen', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      SUBMISSIONS_SIDEBAR_ID,
      'RDepot - submissions'
    )
    await clickOnButton(
      driver,
      SUBMISSIONS_MULTI_ACTIONS_ID
    )
    await checkIfDisabled(
      driver,
      SUBMISSIONS_MULTI_ACCEPT_ID
    )
    await checkIfDisabled(
      driver,
      SUBMISSIONS_MULTI_CANCEL_ID
    )
    await checkIfDisabled(
      driver,
      SUBMISSIONS_MULTI_REJECT_ID
    )
  })

  it('accept a few submissions using speed dial', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      SUBMISSIONS_SIDEBAR_ID,
      'RDepot - submissions'
    )
    await clickOnButton(
      driver,
      SUBMISSIONS_LIST_ACTIONS_REQUESTS_2281_TESTREPO8_ID
    )
    await clickOnButton(
      driver,
      SUBMISSIONS_LIST_ACTIONS_BENCHMARKING_010_TESTREPO4_ID
    )
    await clickOnButton(
      driver,
      SUBMISSIONS_MULTI_ACTIONS_ID
    )
    await clickOnButton(driver, SUBMISSIONS_MULTI_ACCEPT_ID)

    await driver.wait(
      until.elementLocated(
        By.id(SUBMISSIONS_LIST_MODAL_ID)
      ),
      8000
    )
    await clickOnButton(driver, SUBMIT_BUTTON_ID)
  })

  it('do not allow to click on submit button when none of chosen submissions is proper', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      SUBMISSIONS_SIDEBAR_ID,
      'RDepot - submissions'
    )
    await clickOnButton(
      driver,
      SUBMISSIONS_LIST_ACTIONS_WHEEL_0380_TESTREPO10_ID
    )
    await clickOnButton(
      driver,
      SUBMISSIONS_MULTI_ACTIONS_ID
    )
    await clickOnButton(driver, SUBMISSIONS_MULTI_ACCEPT_ID)
    await driver.wait(
      until.elementLocated(
        By.id(SUBMISSIONS_LIST_MODAL_ID)
      ),
      8000
    )
    await driver.wait(
      until.elementLocated(By.className('v-alert')),
      8000
    )
    await driver.wait(
      until.elementLocated(By.className('v-empty-state')),
      8000
    )
    await checkIfDisabled(driver, SUBMIT_BUTTON_ID)
  })
})
