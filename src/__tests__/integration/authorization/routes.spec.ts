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
  expect,
  beforeEach,
  afterEach
} from 'vitest'
// import me from '@/__tests__/config/mockData/me.json'
// import users from '@/__tests__/config/mockData/users.json'
// import { createPinia, setActivePinia } from 'pinia'
const {
  Builder,
  Browser,
  By,
  // Key,
  until
} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
// const repositoryMaintainer = users.data.content[1]
let driver: any
const url = 'http://192.168.49.20'
const PASSWORD = 'testpassword'
beforeEach(async () => {
  // setActivePinia(createPinia())
  driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .usingServer('http://192.168.49.12:4444/wd/hub')
    .setChromeOptions(
      new chrome.Options().addArguments(
        // '--headless',
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-extensions'
        // '--remote-debugging-port=9222'
      )
    )
    .build()
})

afterEach(async () => {
  await driver.quit()
})

describe('Unauthenticated access', () => {
  it('Login page', async () => {
    await driver.get(url + '/login')
    expect(
      await driver.findElement(By.id('logo-oa'))
    ).toBeTruthy()
    expect(
      await driver.wait(
        until.titleIs('RDepot - login'),
        8000
      )
    ).toBeTruthy()
  })

  it('Package page', async () => {
    await driver.get(url + '/packages')
    expect(
      await driver.findElement(By.id('logo-oa'))
    ).toBeTruthy()
    expect(
      await driver.wait(
        until.titleIs('RDepot - login'),
        8000
      )
    ).toBeTruthy()
  })

  it('Package maintainers page', async () => {
    await driver.get(url + '/package-maintainers')
    expect(
      await driver.findElement(By.id('logo-oa'))
    ).toBeTruthy()
    expect(
      await driver.wait(
        until.titleIs('RDepot - login'),
        8000
      )
    ).toBeTruthy()
  })

  it('Repositories page', async () => {
    await driver.get(url + '/repositories')
    expect(
      await driver.findElement(By.id('logo-oa'))
    ).toBeTruthy()
    expect(
      await driver.wait(
        until.titleIs('RDepot - login'),
        8000
      )
    ).toBeTruthy()
  })

  it('Repository maintainers page', async () => {
    await driver.get(url + '/repository-maintainers')
    expect(
      await driver.findElement(By.id('logo-oa'))
    ).toBeTruthy()
    expect(
      await driver.wait(
        until.titleIs('RDepot - login'),
        8000
      )
    ).toBeTruthy()
  })

  it('Users page', async () => {
    await driver.get(url + '/users')
    expect(
      await driver.findElement(By.id('logo-oa'))
    ).toBeTruthy()
    expect(
      await driver.wait(
        until.titleIs('RDepot - login'),
        8000
      )
    ).toBeTruthy()
  })

  it('Home page', async () => {
    await driver.get(url + '/')
    expect(
      await driver.findElement(By.id('logo-oa'))
    ).toBeTruthy()
    expect(
      await driver.wait(
        until.titleIs('RDepot - login'),
        8000
      )
    ).toBeTruthy()
  })

  it('Submissions page', async () => {
    await driver.get(url + '/submissions')
    expect(
      await driver.findElement(By.id('logo-oa'))
    ).toBeTruthy()
    expect(
      await driver.wait(
        until.titleIs('RDepot - login'),
        8000
      )
    ).toBeTruthy()
  })

  it('Upload package page', async () => {
    await driver.get(url + '/upload-packages')
    expect(
      await driver.findElement(By.id('logo-oa'))
    ).toBeTruthy()
    expect(
      await driver.wait(
        until.titleIs('RDepot - login'),
        8000
      )
    ).toBeTruthy()
  })

  it('Events page', async () => {
    await driver.get(url + '/events')
    expect(
      await driver.findElement(By.id('logo-oa'))
    ).toBeTruthy()
    expect(
      await driver.wait(
        until.titleIs('RDepot - login'),
        8000
      )
    ).toBeTruthy()
  })

  it('Access tokens page', async () => {
    await driver.get(url + '/settings-tokens')
    expect(
      await driver.findElement(By.id('logo-oa'))
    ).toBeTruthy()
    expect(
      await driver.wait(
        until.titleIs('RDepot - login'),
        8000
      )
    ).toBeTruthy()
  })

  it('Settings page', async () => {
    await driver.get(url + '/settings-general')
    expect(
      await driver.findElement(By.id('logo-oa'))
    ).toBeTruthy()
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
    await login('einstein', PASSWORD)
    await driver
      .findElement(By.id('sidebar-upload-packages'))
      .click()
    await driver.wait(
      until.titleIs('RDepot - upload packages'),
      8000
    )
    expect(await driver.getTitle()).toBe(
      'RDepot - upload packages'
    )
  })
  it('Package maintainers page', async () => {
    await login('einstein', PASSWORD)
    await driver
      .findElement(
        By.id('sidebar-package-maintainers-list')
      )
      .click()
    await driver.wait(
      until.titleIs('RDepot - package maintainers'),
      8000
    )
    expect(await driver.getTitle()).toBe(
      'RDepot - package maintainers'
    )
  })
  it('Events page', async () => {
    await login('einstein', PASSWORD)
    await driver
      .findElement(By.id('sidebar-events'))
      .click()
    await driver.wait(
      until.titleIs('RDepot - events'),
      8000
    )
    expect(await driver.getTitle()).toBe('RDepot - events')
  })
  it('Repositories page', async () => {
    await login('einstein', PASSWORD)
    await driver
      .findElement(By.id('sidebar-repositories-list'))
      .click()
    await driver.wait(
      until.titleIs('RDepot - repositories'),
      8000
    )
    expect(await driver.getTitle()).toBe(
      'RDepot - repositories'
    )
  })
  it('Repository maintainers page', async () => {
    await login('einstein', PASSWORD)
    await driver
      .findElement(
        By.id('sidebar-repository-maintainers-list')
      )
      .click()
    await driver.wait(
      until.titleIs('RDepot - repository maintainers'),
      8000
    )
    expect(await driver.getTitle()).toBe(
      'RDepot - repository maintainers'
    )
  })
  it('Users page', async () => {
    await login('einstein', PASSWORD)
    await driver.findElement(By.id('sidebar-users')).click()
    await driver.wait(until.titleIs('RDepot - users'), 8000)
    expect(await driver.getTitle()).toBe('RDepot - users')
  })
  it('Home page', async () => {
    await login('einstein', PASSWORD)
    expect(await driver.getTitle()).toBe(
      'RDepot - packages'
    )
  })
  it('Submissions page', async () => {
    await login('einstein', PASSWORD)
    await driver
      .findElement(By.id('sidebar-submissions'))
      .click()
    await driver.wait(
      until.titleIs('RDepot - submissions'),
      8000
    )
    expect(await driver.getTitle()).toBe(
      'RDepot - submissions'
    )
  })
  it('Access tokens page', async () => {
    await login('einstein', PASSWORD)
    await driver
      .findElement(By.id('v-list-group--id-Symbol(38)'))
      .click()
    await driver
      .findElement(By.id('sidebar-settings-access-tokens'))
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
    expect(await driver.getTitle()).toBe(
      'RDepot - access tokens'
    )
  })
  it('Settings page', async () => {
    await login('einstein', PASSWORD)
    await driver
      .findElement(By.id('v-list-group--id-Symbol(38)'))
      .click()

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
  })
})

async function login(username: string, password: string) {
  await driver.get(url + '/login')
  await driver.wait(
    until.elementLocated(By.id('username-input')),
    8000
  )
  driver
    .findElement(By.id('username-input'))
    .sendKeys(username)
  await driver.wait(
    until.elementLocated(By.id('password-input')),
    8000
  )
  driver
    .findElement(By.id('password-input'))
    .sendKeys(password)
  await driver.wait(
    until.elementLocated(By.id('login-simple-button')),
    8000
  )
  driver.findElement(By.id('login-simple-button')).click()
  await driver.wait(
    until.elementLocated(By.id('sidebar-upload-packages')),
    8000
  )
}
