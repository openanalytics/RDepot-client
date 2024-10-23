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

import { describe, it, beforeEach, afterEach } from 'vitest'
import {
  UPLOAD_PACKAGES_SIDEBAR_ID,
  PACKAGE_MAINTAINERS_SIDEBAR_ID,
  EVENTS_SIDEBAR_ID,
  REPOSITORIES_SIDEBAR_ID,
  REPOSITORY_MAINTAINERS_SIDEBAR_ID,
  USERS_SIDEBAR_ID,
  SUBMISSIONS_SIDEBAR_ID,
  SETTINGS_LIST_SIDEBAR_ID,
  OA_LOGO_ID
} from '../helpers/elementsIds'
import { login } from '../helpers/login'
import {
  goToPageURL,
  createDriver,
  goToPage,
  clickOnButton
} from '../helpers/helpers'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { By, until } = require('selenium-webdriver')

let driver: any

beforeEach(async () => {
  driver = await createDriver()
})

afterEach(async () => {
  await driver.quit()
})

describe('Unauthenticated access', () => {
  it('Login page', async () => {
    await goToPageURL(driver, '/login', 'RDepot - login')
    await driver.wait(
      until.elementLocated(By.id(OA_LOGO_ID)),
      8000
    )
    expect(
      await driver.wait(
        until.titleIs('RDepot - login'),
        8000
      )
    ).toBeTruthy()
  })

  it('Package page', async () => {
    await goToPageURL(driver, '/packages', 'RDepot - login')
    await driver.wait(
      until.elementLocated(By.id(OA_LOGO_ID)),
      8000
    )
    expect(
      await driver.wait(
        until.titleIs('RDepot - login'),
        8000
      )
    ).toBeTruthy()
  })

  it('Package maintainers page', async () => {
    await goToPageURL(
      driver,
      '/package-maintainers',
      'RDepot - login'
    )
    await driver.wait(
      until.elementLocated(By.id(OA_LOGO_ID)),
      8000
    )
    expect(
      await driver.wait(
        until.titleIs('RDepot - login'),
        8000
      )
    ).toBeTruthy()
  })

  it('Repositories page', async () => {
    await goToPageURL(
      driver,
      '/repositories',
      'RDepot - login'
    )
    await driver.wait(
      until.elementLocated(By.id(OA_LOGO_ID)),
      8000
    )
    expect(
      await driver.wait(
        until.titleIs('RDepot - login'),
        8000
      )
    ).toBeTruthy()
  })

  it('Repository maintainers page', async () => {
    await goToPageURL(
      driver,
      '/repository-maintainers',
      'RDepot - login'
    )
    await driver.wait(
      until.elementLocated(By.id(OA_LOGO_ID)),
      8000
    )
    expect(
      await driver.wait(
        until.titleIs('RDepot - login'),
        8000
      )
    ).toBeTruthy()
  })

  it('Users page', async () => {
    await goToPageURL(driver, '/users', 'RDepot - login')
    await driver.wait(
      until.elementLocated(By.id(OA_LOGO_ID)),
      8000
    )
    expect(
      await driver.wait(
        until.titleIs('RDepot - login'),
        8000
      )
    ).toBeTruthy()
  })

  it('Home page', async () => {
    await goToPageURL(driver, '/', 'RDepot - login')
    await driver.wait(
      until.elementLocated(By.id(OA_LOGO_ID)),
      8000
    )
    expect(
      await driver.wait(
        until.titleIs('RDepot - login'),
        8000
      )
    ).toBeTruthy()
  })

  it('Submissions page', async () => {
    await goToPageURL(
      driver,
      '/submissions',
      'RDepot - login'
    )
    await driver.wait(
      until.elementLocated(By.id(OA_LOGO_ID)),
      8000
    )
    expect(
      await driver.wait(
        until.titleIs('RDepot - login'),
        8000
      )
    ).toBeTruthy()
  })

  it('Upload package page', async () => {
    await goToPageURL(
      driver,
      '/upload-packages',
      'RDepot - login'
    )
    await driver.wait(
      until.elementLocated(By.id(OA_LOGO_ID)),
      8000
    )
    expect(
      await driver.wait(
        until.titleIs('RDepot - login'),
        8000
      )
    ).toBeTruthy()
  })

  it('Events page', async () => {
    await goToPageURL(driver, '/events', 'RDepot - login')
    await driver.wait(
      until.elementLocated(By.id(OA_LOGO_ID)),
      8000
    )
    expect(
      await driver.wait(
        until.titleIs('RDepot - login'),
        8000
      )
    ).toBeTruthy()
  })

  it('Access tokens page', async () => {
    await goToPageURL(
      driver,
      '/settings-tokens',
      'RDepot - login'
    )
    await driver.wait(
      until.elementLocated(By.id(OA_LOGO_ID)),
      8000
    )
    expect(
      await driver.wait(
        until.titleIs('RDepot - login'),
        8000
      )
    ).toBeTruthy()
  })

  it('Settings page', async () => {
    await goToPageURL(
      driver,
      '/settings-general',
      'RDepot - login'
    )
    await driver.wait(
      until.elementLocated(By.id(OA_LOGO_ID)),
      8000
    )
    expect(
      await driver.wait(
        until.titleIs('RDepot - login'),
        8000
      )
    ).toBeTruthy()
  })
})

describe('Admin access', () => {
  it('Upload packages page', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      UPLOAD_PACKAGES_SIDEBAR_ID,
      'RDepot - upload packages'
    )
  })
  it('Package maintainers page', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      PACKAGE_MAINTAINERS_SIDEBAR_ID,
      'RDepot - package maintainers'
    )
  })
  it('Events page', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      EVENTS_SIDEBAR_ID,
      'RDepot - events'
    )
  })
  it('Repositories page', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      REPOSITORIES_SIDEBAR_ID,
      'RDepot - repositories'
    )
  })
  it('Repository maintainers page', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      REPOSITORY_MAINTAINERS_SIDEBAR_ID,
      'RDepot - repository maintainers'
    )
  })
  it('Users page', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      USERS_SIDEBAR_ID,
      'RDepot - users'
    )
  })
  it('Home page', async () => {
    await login(driver, 'einstein')
    await driver.wait(
      until.titleIs('RDepot - packages'),
      8000
    )
  })
  it('Submissions page', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      SUBMISSIONS_SIDEBAR_ID,
      'RDepot - submissions'
    )
  })
  it('Access tokens page', async () => {
    await login(driver, 'einstein')
    await clickOnButton(driver, SETTINGS_LIST_SIDEBAR_ID)

    await driver
      .findElement(By.id('sidebar-settings-access-tokens'))
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
      until.titleIs('RDepot - access tokens'),
      8000
    )
    expect(await driver.getTitle()).toBe(
      'RDepot - access tokens'
    )
  })
  it('Settings page', async () => {
    await login(driver, 'einstein')

    await clickOnButton(driver, SETTINGS_LIST_SIDEBAR_ID)

    await driver
      .findElement(By.id('sidebar-settings-general'))
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
      until.titleIs('RDepot - settings'),
      8000
    )
    expect(await driver.getTitle()).toBe(
      'RDepot - settings'
    )
  })
})
