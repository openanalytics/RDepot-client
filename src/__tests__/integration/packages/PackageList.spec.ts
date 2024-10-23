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
  checkIfDisabled,
  clickOnButton,
  clickOnElementByClass,
  clickOnMenuItemById,
  createDriver
} from '../helpers/helpers'
import { i18n } from '@/plugins/i18n'
import {
  CANCEL_BUTTON_ID,
  PACKAGES_LIST_CHECKBOX_ACTIONS_A3_091_TESTREPO3_ID,
  PACKAGES_LIST_CHECKBOX_ACTIONS_ACCELERATED_NUMPY_010_TESTREPO8_ID,
  PACKAGES_LIST_CHECKBOX_ACTIONS_ANACODA_0213_TESTREPO4_ID,
  PACKAGES_LIST_DELETE_A3_092_TESTREPO3_ID,
  PACKAGES_LIST_DELETE_MODAL,
  PACKAGES_LIST_SELECT_ALL_ID,
  PACKAGES_MULTI_ACTIONS_ID,
  PACKAGES_MULTI_DELETE_ID,
  SUBMIT_BUTTON_ID
} from '../helpers/elementsIds'
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

  it("delete single package with package's action button", async () => {
    await login(driver, 'einstein')
    await clickOnButton(
      driver,
      PACKAGES_LIST_DELETE_A3_092_TESTREPO3_ID
    )

    const deletePackagesModal = await driver.wait(
      until.elementLocated(
        By.id(PACKAGES_LIST_DELETE_MODAL)
      ),
      8000
    )

    await driver.wait(
      until.elementLocated(
        By.className('v-list-item-title')
      ),
      8000
    )

    const packagesToDelete =
      await deletePackagesModal.findElements(
        By.className('v-list-item-title')
      )

    expect(packagesToDelete.length).toEqual(1)
    await clickOnButton(driver, SUBMIT_BUTTON_ID)
    const packageA3 = await driver.findElements(
      By.className(PACKAGES_LIST_DELETE_A3_092_TESTREPO3_ID)
    )
    expect(packageA3.length).toEqual(0)
  })
  it('select and unselect packages works properly', async () => {
    await login(driver, 'einstein')

    await clickOnButton(
      driver,
      PACKAGES_LIST_CHECKBOX_ACTIONS_A3_091_TESTREPO3_ID
    )
    await clickOnButton(
      driver,
      PACKAGES_LIST_CHECKBOX_ACTIONS_ACCELERATED_NUMPY_010_TESTREPO8_ID
    )
    await clickOnButton(
      driver,
      PACKAGES_LIST_CHECKBOX_ACTIONS_ANACODA_0213_TESTREPO4_ID
    )
    await clickOnButton(
      driver,
      PACKAGES_LIST_CHECKBOX_ACTIONS_A3_091_TESTREPO3_ID
    ) //select and unselect this package
    await clickOnButton(driver, PACKAGES_MULTI_ACTIONS_ID)
    await clickOnMenuItemById(
      driver,
      PACKAGES_MULTI_DELETE_ID
    )
    let deletePackagesModal = await driver.wait(
      until.elementLocated(
        By.id(PACKAGES_LIST_DELETE_MODAL)
      ),
      8000
    )
    await driver.wait(
      until.elementLocated(
        By.className('v-list-item-title')
      ),
      8000
    )
    let packagesToDelete =
      await deletePackagesModal.findElements(
        By.className('v-list-item-title')
      )
    expect(packagesToDelete.length).toEqual(2) //only packages selected manually
    await clickOnButton(driver, CANCEL_BUTTON_ID)

    await clickOnElementByClass(driver, 'mdi-chevron-right')
    await clickOnButton(driver, PACKAGES_LIST_SELECT_ALL_ID)
    await clickOnElementByClass(driver, 'mdi-chevron-left')
    await clickOnButton(driver, PACKAGES_LIST_SELECT_ALL_ID)
    await clickOnButton(driver, PACKAGES_MULTI_ACTIONS_ID)
    await clickOnMenuItemById(
      driver,
      PACKAGES_MULTI_DELETE_ID
    )
    deletePackagesModal = await driver.wait(
      until.elementLocated(
        By.id(PACKAGES_LIST_DELETE_MODAL)
      ),
      8000
    )
    await driver.wait(
      until.elementLocated(
        By.className('v-list-item-title')
      ),
      8000
    )

    packagesToDelete =
      await deletePackagesModal.findElements(
        By.className('v-list-item-title')
      )
    expect(packagesToDelete.length).toEqual(22) //both pages selected
    await clickOnButton(driver, CANCEL_BUTTON_ID)

    await clickOnButton(driver, PACKAGES_LIST_SELECT_ALL_ID)
    await clickOnButton(driver, PACKAGES_MULTI_ACTIONS_ID)
    await clickOnMenuItemById(
      driver,
      PACKAGES_MULTI_DELETE_ID
    )
    deletePackagesModal = await driver.wait(
      until.elementLocated(
        By.id(PACKAGES_LIST_DELETE_MODAL)
      ),
      8000
    )
    await driver.wait(
      until.elementLocated(
        By.className('v-list-item-title')
      ),
      8000
    )
    packagesToDelete =
      await deletePackagesModal.findElements(
        By.className('v-list-item-title')
      )

    expect(packagesToDelete.length).toEqual(2) //only 2nd page selected
    await clickOnButton(driver, CANCEL_BUTTON_ID)

    await clickOnElementByClass(driver, 'mdi-chevron-right')
    await clickOnButton(driver, PACKAGES_LIST_SELECT_ALL_ID)
    await clickOnButton(driver, PACKAGES_MULTI_ACTIONS_ID)
    await checkIfDisabled(driver, PACKAGES_MULTI_DELETE_ID) //none package should be chosen
  })

  it('delete a few packages using speed dial', async () => {
    await login(driver, 'einstein')
    await clickOnButton(
      driver,
      PACKAGES_LIST_CHECKBOX_ACTIONS_ACCELERATED_NUMPY_010_TESTREPO8_ID
    )
    await clickOnButton(
      driver,
      PACKAGES_LIST_CHECKBOX_ACTIONS_ANACODA_0213_TESTREPO4_ID
    )
    await clickOnButton(driver, PACKAGES_MULTI_ACTIONS_ID)

    await clickOnMenuItemById(
      driver,
      PACKAGES_MULTI_DELETE_ID
    )
    const deletePackagesModal = await driver.wait(
      until.elementLocated(
        By.id(PACKAGES_LIST_DELETE_MODAL)
      ),
      8000
    )

    await driver.wait(
      until.elementLocated(
        By.className('v-list-item-title')
      ),
      8000
    )

    const packagesToDelete =
      await deletePackagesModal.findElements(
        By.className('v-list-item-title')
      )

    expect(packagesToDelete.length).toEqual(2)
    await clickOnButton(driver, SUBMIT_BUTTON_ID)
    const packageA3 = await driver.findElements(
      By.className(
        PACKAGES_LIST_CHECKBOX_ACTIONS_A3_091_TESTREPO3_ID
      )
    )
    expect(packageA3.length).toEqual(0)

    const packageNumpy = await driver.findElements(
      By.className(
        PACKAGES_LIST_CHECKBOX_ACTIONS_ACCELERATED_NUMPY_010_TESTREPO8_ID
      )
    )
    expect(packageNumpy.length).toEqual(0)
  })
  it('disable delete option when no package is chosen', async () => {
    await login(driver, 'einstein')

    await clickOnButton(driver, PACKAGES_MULTI_ACTIONS_ID)
    await checkIfDisabled(driver, PACKAGES_MULTI_DELETE_ID)
  })
})
