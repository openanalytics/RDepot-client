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

import { expect } from 'vitest'

const {
  Builder,
  By,
  until,
  Browser
} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const BASE_URL = 'http://192.168.49.20'

export async function createDriver() {
  return await new Builder()
    .forBrowser(Browser.CHROME)
    .usingServer('http://192.168.49.12:4444/wd/hub')
    .setChromeOptions(
      new chrome.Options().addArguments(
        '--headless',
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-extensions'
        // '--remote-debugging-port=9222'
      )
    )
    .build()
}

export async function goToPage(
  driver: typeof Builder,
  pageId: string,
  pageTitle: string
) {
  await driver.wait(
    until.elementLocated(By.id(pageId)),
    8000
  )
  await driver.findElement(By.id(pageId)).click()
  await driver.wait(until.titleIs(pageTitle), 8000)
}

export async function goToPageURL(
  driver: typeof Builder,
  url: string,
  pageTitle: string
) {
  await driver.get(BASE_URL + url)
  await driver.wait(until.titleIs(pageTitle), 8000)
}

export async function clickOnButton(
  driver: typeof Builder,
  buttonId: string
) {
  await driver.wait(
    until.elementLocated(By.id(buttonId)),
    8000
  )

  await driver.findElement(By.id(buttonId)).click()
}

export async function clickOnElementByClass(
  driver: typeof Builder,
  className: string
) {
  await driver.wait(
    until.elementLocated(By.className(className)),
    8000
  )

  await driver.findElement(By.className(className)).click()
}

export async function clickOnElementByXpath(
  driver: typeof Builder,
  xpath: string
) {
  await driver.wait(
    until.elementLocated(By.xpath(xpath)),
    8000
  )
  await driver.findElement(By.xpath(xpath)).click()
}

export async function clickOnButtonByXpath(
  driver: typeof Builder,
  buttonXpath: string
) {
  await driver.wait(
    until.elementLocated(By.xpath(buttonXpath)),
    8000
  )

  await driver.findElement(By.xpath(buttonXpath)).click()
}

export async function checkIfDisabled(
  driver: typeof Builder,
  id: string,
  shouldBeDisabled = true
) {
  await driver.wait(until.elementLocated(By.id(id)), 8000)

  const isEnabled: boolean = await driver
    .findElement(By.id(id))
    .isEnabled()

  expect(isEnabled).toEqual(!shouldBeDisabled)
}

export async function checkIfHasClass(
  driver: typeof Builder,
  id: string,
  className: string,
  shouldHaveClass = true
) {
  await driver.wait(until.elementLocated(By.id(id)), 8000)

  const elementsClass: boolean = await driver
    .findElement(By.id(id))
    .getAttribute('class')

  if (shouldHaveClass) {
    expect(elementsClass).contains(className)
  } else {
    expect(elementsClass).not.contains(className)
  }
}

export async function clickOnMenuItemById(
  driver: typeof Builder,
  id: string
) {
  await driver
    .findElement(By.id(id))
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
}
