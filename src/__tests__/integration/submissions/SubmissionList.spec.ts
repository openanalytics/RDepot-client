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
  DOWNLOAD_SUBMISSION_FILENAME,
  SUBMISSIONS_FILTRATION_SEARCH_FIELD_ID,
  WAITING_FOR_APPROVE_SUBMISSION_ID,
  WAITING_FOR_REJECT_SUBMISSION_ID,
  WAITING_FOR_CANCEL_SUBMISSION_ID
} from '../helpers/elementsIds'
import { restoreData } from '../helpers/restoreData'
import { login } from '../helpers/login'
import {
  clickOnButton,
  createDriver,
  goToPage
} from '../helpers/helpers'

const { By, until } = require('selenium-webdriver')

const fs = require('fs')
const path = require('path')

let driver: any
const pathToFileOrDir = './downloads/'

function clearDownloadDirectory() {
  fs.readdir(pathToFileOrDir, (err: any, files: any) => {
    if (err) throw err

    for (const file of files) {
      fs.unlink(
        path.join(pathToFileOrDir, file),
        (err: any) => {
          if (err) throw err
        }
      )
    }
  })
}

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

const delay = (delayInms: number) => {
  return new Promise((resolve) =>
    setTimeout(resolve, delayInms)
  )
}

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
        pathToFileOrDir + DOWNLOAD_SUBMISSION_FILENAME
      )
    ).toBe(true)
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
        pathToFileOrDir + DOWNLOAD_SUBMISSION_FILENAME
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
