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
import { createDriver } from '../helpers/helpers'
import { i18n } from '@/plugins/i18n'
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

describe('Packages list', () => {
  it('displays information when package description is not provided', async () => {
    await login(driver, 'einstein')
    await driver.wait(
      until.elementLocated(
        By.css('.v-data-table__tr:nth-child(17)')
      ),
      8000
    )

    await driver
      .findElement(
        By.css('.v-data-table__tr:nth-child(17)')
      )
      .click()

    expect(
      await driver
        .findElement(By.className('additional-row'))
        .getAttribute('innerText')
    ).toContain(i18n.t('package.noDescriptionProvided'))
  })
})
