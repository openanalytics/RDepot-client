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
  ACCESS_TOKENS_SIDEBAR_ID,
  ADD_TOKEN_BUTTON_ID,
  CREATE_TOKEN_EXPIRATION_DATE_INPUT_ID,
  CREATE_TOKEN_NAME_INPUT_ID,
  CREATE_TOKEN_SUBMIT_BUTTON_ID,
  SETTINGS_LIST_SIDEBAR_ID
} from '../helpers/elementsIds'
import { restoreData } from '../helpers/restoreData'
import { login } from '../helpers/login'
import {
  clickOnButton,
  createDriver
} from '../helpers/helpers'
import { useConfigStore } from '@/store/options/config'
import { createPinia, setActivePinia } from 'pinia'
const { By, until } = require('selenium-webdriver')

let driver: any

beforeAll(async () => {
  await restoreData()
})

beforeEach(async () => {
  setActivePinia(createPinia())
  driver = await createDriver()
})

afterEach(async () => {
  await driver.quit()
})

describe('Create Token', () => {
  it('create token with the default lifetime value', async () => {
    await login(driver, 'einstein')
    await clickOnButton(driver, SETTINGS_LIST_SIDEBAR_ID)

    await driver
      .findElement(By.id(ACCESS_TOKENS_SIDEBAR_ID))
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
      until.titleIs('RDepot - access tokens'),
      8000
    )
    await clickOnButton(driver, ADD_TOKEN_BUTTON_ID)

    await driver.wait(
      until.elementLocated(
        By.id(CREATE_TOKEN_NAME_INPUT_ID)
      ),
      8000
    )

    await driver.wait(
      until.elementLocated(
        By.id(CREATE_TOKEN_EXPIRATION_DATE_INPUT_ID)
      ),
      8000
    )

    driver
      .findElement(By.id(CREATE_TOKEN_NAME_INPUT_ID))
      .sendKeys('test_token_name')

    const defaultExpirationDate = await driver
      .findElement(
        By.id(CREATE_TOKEN_EXPIRATION_DATE_INPUT_ID)
      )
      .getAttribute('value')

    const configStore = useConfigStore()

    expect(defaultExpirationDate).toEqual(
      configStore.accessTokenLifetimeDefault.toString()
    )

    await clickOnButton(
      driver,
      CREATE_TOKEN_SUBMIT_BUTTON_ID
    )
  })
})
