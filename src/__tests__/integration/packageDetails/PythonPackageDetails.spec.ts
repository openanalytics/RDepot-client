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
  PACKAGE_DETAILS_BUTTON_ID,
  PYTHON_PACKAGE_HASH_PROPERTY_ID,
  PYTHON_PACKAGE_LICENSE_PROPERTY_ID,
  PYTHON_PACKAGE_PLATFORM_PROPERTY_ID,
  PYTHON_PACKAGE_PROJECT_URL_PROPERTY_ID,
  PYTHON_PACKAGE_PROVIDES_EXTRA_PROPERTY_ID,
  PYTHON_PACKAGE_REQUIRES_DIST_PROPERTY_ID,
  PYTHON_PACKAGE_REQUIRES_EXTERNAL_PROPERTY_ID,
  PYTHON_PACKAGE_REQUIRES_PYTHON_PROPERTY_ID,
  PYTHON_PACKAGE_VERSION_PROPERTY_ID
} from '../helpers/elementsIds'
import { restoreData } from '../helpers/restoreData'
import { login } from '../helpers/login'
import { createDriver } from '../helpers/helpers'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { By, until } = require('selenium-webdriver')

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

describe('Python Package details', () => {
  it('displays all package properties', async () => {
    await login(driver, 'einstein')
    await driver.wait(
      until.elementLocated(
        By.css('.v-data-table__tr:nth-child(10)')
      ),
      8000
    )

    await driver
      .findElement(
        By.css('.v-data-table__tr:nth-child(10)')
      )
      .click()

    await driver
      .findElement(By.id(PACKAGE_DETAILS_BUTTON_ID))
      .then(async function (element: any) {
        await driver.wait(function () {
          return element.isDisplayed().then(function (
            displayed: any
          ) {
            if (!displayed) return false

            return element.isEnabled()
          })
        })
        await element.click()
      })

    await driver.wait(
      until.titleIs('RDepot - package details'),
      8000
    )

    await driver.wait(
      until.elementLocated(
        By.id(PYTHON_PACKAGE_VERSION_PROPERTY_ID)
      ),
      8000
    )

    await driver.wait(
      until.elementLocated(
        By.id(PYTHON_PACKAGE_PLATFORM_PROPERTY_ID)
      ),
      8000
    )

    await driver.wait(
      until.elementLocated(
        By.id(PYTHON_PACKAGE_PROJECT_URL_PROPERTY_ID)
      ),
      8000
    )

    await driver.wait(
      until.elementLocated(
        By.id(PYTHON_PACKAGE_PROVIDES_EXTRA_PROPERTY_ID)
      ),
      8000
    )

    await driver.wait(
      until.elementLocated(
        By.id(PYTHON_PACKAGE_REQUIRES_DIST_PROPERTY_ID)
      ),
      8000
    )

    await driver.wait(
      until.elementLocated(
        By.id(PYTHON_PACKAGE_REQUIRES_EXTERNAL_PROPERTY_ID)
      ),
      8000
    )

    await driver.wait(
      until.elementLocated(
        By.id(PYTHON_PACKAGE_REQUIRES_PYTHON_PROPERTY_ID)
      ),
      8000
    )

    await driver.wait(
      until.elementLocated(
        By.id(PYTHON_PACKAGE_LICENSE_PROPERTY_ID)
      ),
      8000
    )
    await driver.wait(
      until.elementLocated(
        By.id(PYTHON_PACKAGE_HASH_PROPERTY_ID)
      ),
      8000
    )
  })
})
