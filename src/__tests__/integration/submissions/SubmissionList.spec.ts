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
  DOWNLOAD_WAITING_SUBMISSION_ID,
  DOWNLOAD_ACCEPTED_SUBMISSION_ID,
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

let driver: any

beforeAll(async () => {
  await restoreData()
})

beforeEach(async () => {
  driver = await createDriver()
})

afterEach(async () => {
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
    await clickOnButton(
      driver,
      DOWNLOAD_WAITING_SUBMISSION_ID
    )

    // await driver.wait(
    //   until.elementLocated(
    //     By.id(CREATE_PACKAGE_MAINTAINER_REPOSITORY_INPUT_ID)
    //   ),
    //   8000
    // )
  })

  it('download accepted submission', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      SUBMISSIONS_SIDEBAR_ID,
      'RDepot - submissions'
    )
    await clickOnButton(
      driver,
      DOWNLOAD_ACCEPTED_SUBMISSION_ID
    )

    // await driver.wait(
    //   until.elementLocated(
    //     By.id(CREATE_PACKAGE_MAINTAINER_REPOSITORY_INPUT_ID)
    //   ),
    //   8000
    // )
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

    // await driver.wait(
    //   until.elementLocated(
    //     By.id(CREATE_PACKAGE_MAINTAINER_REPOSITORY_INPUT_ID)
    //   ),
    //   8000
    // )
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

    // await driver.wait(
    //   until.elementLocated(
    //     By.id(CREATE_PACKAGE_MAINTAINER_REPOSITORY_INPUT_ID)
    //   ),
    //   8000
    // )
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

    // await driver.wait(
    //   until.elementLocated(
    //     By.id(CREATE_PACKAGE_MAINTAINER_REPOSITORY_INPUT_ID)
    //   ),
    //   8000
    // )
  })
})
