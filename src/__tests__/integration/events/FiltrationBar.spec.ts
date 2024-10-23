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
  EVENTS_SIDEBAR_ID,
  EVENTS_FILTRATION_FROM_DATE_FIELD_ID,
  EVENTS_FILTRATION_TO_DATE_FIELD_ID
} from '../helpers/elementsIds'
import { restoreData } from '../helpers/restoreData'
import { login } from '../helpers/login'
import {
  createDriver,
  goToPage,
  clickOnElementById,
  clickOnElementByCss,
  delay
} from '../helpers/helpers'
// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars
const { By, until, Builder } = require('selenium-webdriver')

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

describe('Filtration Bar events', () => {
  it('Select the same from and to date', async () => {
    await login(driver, 'einstein')

    await goToPage(
      driver,
      EVENTS_SIDEBAR_ID,
      'RDepot - events'
    )

    await datePickerFilter(
      driver,
      EVENTS_FILTRATION_TO_DATE_FIELD_ID
    )

    await delay(500)
    await datePickerFilter(
      driver,
      EVENTS_FILTRATION_FROM_DATE_FIELD_ID
    )

    await driver.wait(
      until.elementLocated(By.className('v-card-title'))
    )

    const events = await driver.findElements(
      By.className('v-card-title')
    )
    expect(events.length).toEqual(1)

    const chips = await driver.findElements(
      By.className('v-chip')
    )
    const dates = []
    for (const chip of chips) {
      const date = await chip.getAttribute('innerHTML')
      if (date.includes('2023.12.07')) {
        dates.push(date)
      }
    }
    expect(dates.length).toEqual(2)
  })
})

async function datePickerFilter(
  driver: typeof Builder,
  id: string
) {
  await clickOnElementById(driver, id)
  await delay(500)
  await clickOnElementByCss(
    driver,
    '.v-btn__content > .mdi-menu-down'
  )
  await delay(500)

  await clickOnElementByCss(
    driver,
    '.v-btn:nth-child(100) > .v-btn__content'
  )
  await delay(500)
  await clickOnElementByCss(driver, '.v-btn--rounded')
  await delay(500)
  await clickOnElementByCss(
    driver,
    '.v-btn:nth-child(12) > .v-btn__content'
  )
  await delay(500)
  await clickOnElementByCss(
    driver,
    '.v-date-picker-month__day:nth-child(19) .v-btn__content'
  )
}
