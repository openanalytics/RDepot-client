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
  delay
} from '../helpers/helpers'
import {
  NOTIFICATIONS_BADGE_ID,
  NOTIFICATIONS_BELL_ID,
  PACKAGES_LIST_ACTIVATE_BUTTON_ID
} from '../helpers/elementsIds'
import { createPinia, setActivePinia } from 'pinia'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { By, until } = require('selenium-webdriver')

let driver: any

beforeAll(async () => {
  setActivePinia(createPinia())
  await restoreData()
})

beforeEach(async () => {
  driver = await createDriver()
})

afterEach(async () => {
  await driver.quit()
})

describe('Notifications', () => {
  it('display notifications bell with a badge', async () => {
    await login(driver, 'einstein')

    await clickOnButton(
      driver,
      PACKAGES_LIST_ACTIVATE_BUTTON_ID
    )

    await clickOnButton(driver, NOTIFICATIONS_BELL_ID)
    await delay(500)
    await driver.wait(
      until.elementLocated(By.id(NOTIFICATIONS_BADGE_ID)),
      8000
    )

    let badgeText = await driver
      .findElement(By.id(NOTIFICATIONS_BADGE_ID))
      .getAttribute('innerText')

    expect(badgeText).toEqual('1')

    await clickOnButton(driver, NOTIFICATIONS_BELL_ID)
    await clickOnButton(driver, NOTIFICATIONS_BELL_ID)

    await driver.wait(
      until.elementLocated(By.id(NOTIFICATIONS_BADGE_ID)),
      8000
    )

    badgeText = await driver
      .findElement(By.id(NOTIFICATIONS_BADGE_ID))
      .getAttribute('innerText')

    expect(badgeText).toEqual('')
  })
})
