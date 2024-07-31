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
  SETTINGS_LIST_SIDEBAR_ID,
  PAGE_SIZE_ID
} from '../helpers/elementsIds'
import { restoreData } from '../helpers/restoreData'
import { login } from '../helpers/login'
import {
  clickOnButton,
  createDriver,
  goToPage,
  clickOnElementByCss,
  clickOnElementById,
  delay
} from '../helpers/helpers'

const { By, until, Key } = require('selenium-webdriver')

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

describe('Custom page size', () => {
  it('Show custom page size', async () => {
    await login(driver, 'einstein')
    await clickOnButton(driver, SETTINGS_LIST_SIDEBAR_ID)

    await driver
      .findElement(By.id('sidebar-settings-general'))
      .then(async function (element: any) {
        await driver.wait(function () {
          return element
            .isDisplayed()
            .then(function (displayed: any) {
              if (!displayed) return false

              return element.isEnabled()
            })
        })
        await element.click()
      })
    await driver.wait(
      until.titleIs('RDepot - settings'),
      8000
    )
    expect(await driver.getTitle()).toBe(
      'RDepot - settings'
    )
    await delay(500)
    await clickOnElementById(driver, PAGE_SIZE_ID)
    await driver
      .actions()
      .sendKeys(Key.BACK_SPACE, Key.BACK_SPACE, Key.NUMPAD2)
      .perform()
    await clickOnElementByCss(driver, '.v-main')
    await clickOnElementByCss(
      driver,
      '.bg-oablue > .v-btn__content'
    )

    await goToPage(
      driver,
      SUBMISSIONS_SIDEBAR_ID,
      'RDepot - submissions'
    )
    await delay(100)

    await clickOnElementByCss(
      driver,
      '.v-field__input:nth-child(2)'
    )
    await delay(500)
    await clickOnElementById(driver, 'page-items-15')
    await delay(100)
    let elements = await driver.findElements(
      By.className('v-data-table__tr')
    )
    expect(elements.length).toBe(15)

    await clickOnElementByCss(
      driver,
      '.v-field__input:nth-child(2)'
    )
    await delay(500)
    await clickOnElementById(driver, 'page-items-custom-2')
    await delay(100)
    elements = await driver.findElements(
      By.className('v-data-table__tr')
    )
    expect(elements.length).toBe(2)
  })

  it('Ignore duplicated custom page size', async () => {
    await login(driver, 'einstein')
    await clickOnButton(driver, SETTINGS_LIST_SIDEBAR_ID)

    await driver
      .findElement(By.id('sidebar-settings-general'))
      .then(async function (element: any) {
        await driver.wait(function () {
          return element
            .isDisplayed()
            .then(function (displayed: any) {
              if (!displayed) return false

              return element.isEnabled()
            })
        })
        await element.click()
      })
    await driver.wait(
      until.titleIs('RDepot - settings'),
      8000
    )
    expect(await driver.getTitle()).toBe(
      'RDepot - settings'
    )
    await delay(500)
    await clickOnElementById(driver, PAGE_SIZE_ID)
    await driver
      .actions()
      .sendKeys(
        Key.BACK_SPACE,
        Key.BACK_SPACE,
        Key.NUMPAD3,
        Key.NUMPAD0
      )
      .perform()
    await clickOnElementByCss(driver, '.v-main')
    await clickOnElementByCss(
      driver,
      '.bg-oablue > .v-btn__content'
    )

    await goToPage(
      driver,
      SUBMISSIONS_SIDEBAR_ID,
      'RDepot - submissions'
    )
    await delay(100)

    await clickOnElementByCss(
      driver,
      '.v-field__input:nth-child(2)'
    )
    await delay(500)
    await clickOnElementById(driver, 'page-items-15')
    await delay(100)
    const elements = await driver.findElements(
      By.className('v-data-table__tr')
    )
    expect(elements.length).toBe(15)

    await clickOnElementByCss(
      driver,
      '.v-field__input:nth-child(2)'
    )
    await delay(100)
    const exists = await driver
      .findElements(By.id('page-items-custom-30'))
      .then((found: any) => !!found.length)
    expect(exists).toBeFalsy()
  })
})
