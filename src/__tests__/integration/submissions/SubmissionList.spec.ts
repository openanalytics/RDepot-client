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
  DOWNLOAD_SUBMISSION_FILENAME
} from '../helpers/elementsIds'
import { restoreData } from '../helpers/restoreData'
import { login } from '../helpers/login'
import {
  clickOnButton,
  createDriver,
  goToPage
} from '../helpers/helpers'
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

  // it('accept submission', async () => {
  //   await login(driver, 'einstein')
  //   await goToPage(
  //     driver,
  //     SUBMISSIONS_SIDEBAR_ID,
  //     'RDepot - submissions'
  //   )
  //   await delay(5000)
  //   await clickOnButton(
  //     driver,
  //     WAITING_FOR_APPROVE_SUBMISSION_ID
  //   )
  //   await delay(5000)

  //   await driver.wait(
  //     until.elementLocated(By.id(FILTRATION_SEARCH_ID)),
  //     8000
  //   )
  //   await delay(5000)

  //   driver
  //     .findElement(By.id(FILTRATION_SEARCH_ID))
  //     .sendKeys('visdat')
  //   await delay(5000)

  //   expect(
  //     driver.findElement(
  //       By.id(WAITING_FOR_APPROVE_SUBMISSION_ID)
  //     )
  //   ).toBe(false)
  //   expect(
  //     driver.findElement(By.id(DOWNLOAD_SUBMISSION_ID))
  //   ).toBe(true)
  // })

  // it('download accepted submission', async () => {
  //   await login(driver, 'einstein')
  //   await goToPage(
  //     driver,
  //     SUBMISSIONS_SIDEBAR_ID,
  //     'RDepot - submissions'
  //   )
  //   await clickOnButton(driver, DOWNLOAD_SUBMISSION_ID)
  //   await delay(20000)
  //   expect(
  //     fs.existsSync(
  //       pathToFileOrDir + DOWNLOAD_SUBMISSION_FILENAME
  //     )
  //   ).toBe(true)
  // })

  // it('reject submission', async () => {
  //   await login(driver, 'einstein')
  //   await goToPage(
  //     driver,
  //     SUBMISSIONS_SIDEBAR_ID,
  //     'RDepot - submissions'
  //   )
  //   await clickOnButton(
  //     driver,
  //     WAITING_FOR_REJECT_SUBMISSION_ID
  //   )
  //   //TODO move ids and package names to elementsIDs
  //   driver
  //     .findElement(By.id('filtration-search'))
  //     .sendKeys('abc')

  //   driver
  //     .findElement(By.id('filtration-repository'))
  //     .click()

  //   //TODO get id of repository4, check if action buttons visible
  //   // driver.findElement(By.id('input-168')).click()
  //   // await driver.wait(
  //   //   until.elementLocated(
  //   //     By.id(CREATE_PACKAGE_MAINTAINER_REPOSITORY_INPUT_ID)
  //   //   ),
  //   //   8000
  //   // )
  // })

  // it('cancel submission', async () => {
  //   await login(driver, 'newton')
  //   await goToPage(
  //     driver,
  //     SUBMISSIONS_SIDEBAR_ID,
  //     'RDepot - submissions'
  //   )
  //   await clickOnButton(
  //     driver,
  //     WAITING_FOR_CANCEL_SUBMISSION_ID
  //   )
  //   //TODO

  //   // await driver.wait(
  //   //   until.elementLocated(
  //   //     By.id(CREATE_PACKAGE_MAINTAINER_REPOSITORY_INPUT_ID)
  //   //   ),
  //   //   8000
  //   // )
  // })
})
