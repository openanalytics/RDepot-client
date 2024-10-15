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
  expect,
  beforeAll
} from 'vitest'
import {
  DELETE_REPO_2_ICON_ID,
  DELETE_REPOSITORY_CANCEL_ID,
  DELETE_REPOSITORY_SUBMIT_ID,
  REPOSITORIES_SIDEBAR_ID
} from '../helpers/elementsIds'
import { restoreData } from '../helpers/restoreData'
import { login } from '../helpers/login'
import {
  clickOnButton,
  createDriver,
  goToPage,
  delay
} from '../helpers/helpers'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { By } = require('selenium-webdriver')

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

describe('Soft delete repository', () => {
  it('cancel delete repository action', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      REPOSITORIES_SIDEBAR_ID,
      'RDepot - repositories'
    )

    await clickOnButton(driver, DELETE_REPO_2_ICON_ID)

    await clickOnButton(driver, DELETE_REPOSITORY_CANCEL_ID)

    const elements = await driver.findElements(
      By.id(DELETE_REPO_2_ICON_ID)
    )

    expect(elements.length).toEqual(1)
  })

  it('properly delete repository', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      REPOSITORIES_SIDEBAR_ID,
      'RDepot - repositories'
    )

    await clickOnButton(driver, DELETE_REPO_2_ICON_ID)

    await clickOnButton(driver, DELETE_REPOSITORY_SUBMIT_ID)
    await delay(500)
    const elements = await driver.findElements(
      By.id(DELETE_REPO_2_ICON_ID)
    )

    expect(elements.length).toEqual(0)
  })
})
