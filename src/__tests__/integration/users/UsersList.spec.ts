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
  beforeAll,
  expect
} from 'vitest'
import { restoreData } from '../helpers/restoreData'
import { login } from '../helpers/login'
import {
  clickOnButton,
  createDriver,
  goToPage
} from '../helpers/helpers'
import {
  COPY_GALIELEO_EMAIL_BUTTON_ID,
  USERS_FILTRATION_SEARCH_FIELD_ID,
  USERS_SIDEBAR_ID
} from '../helpers/elementsIds'
import { platform } from 'os'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { By, Key } = require('selenium-webdriver')

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

describe('Users list', () => {
  it("copy user's email", async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      USERS_SIDEBAR_ID,
      'RDepot - users'
    )

    const textField = await driver.findElement(
      By.id(USERS_FILTRATION_SEARCH_FIELD_ID)
    )

    const controlButton =
      platform() == 'darwin' ? Key.COMMAND : Key.CONTROL

    await clickOnButton(
      driver,
      COPY_GALIELEO_EMAIL_BUTTON_ID
    )

    await driver
      .actions()
      .click(textField)
      .keyDown(controlButton)
      .sendKeys('v')
      .keyUp(controlButton)
      .perform()

    expect(await textField.getAttribute('value')).toEqual(
      'galieleo@ldap.forumsys.com'
    )
  })
})
