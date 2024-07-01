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
  PASSWORD_INPUT_ID,
  SUBMIT_LOGIN_BUTTON_ID,
  USERNAME_INPUT_ID
} from './elementsIds'

const { Builder, By, until } = require('selenium-webdriver')
const url = 'http://192.168.49.20'
const PASSWORD = 'testpassword'

export async function login(
  driver: typeof Builder,
  login: string
) {
  driver.manage().window().maximize()
  await driver.get(url + '/login')

  await driver.wait(
    until.elementLocated(By.id(USERNAME_INPUT_ID)),
    8000
  )

  driver
    .findElement(By.id(USERNAME_INPUT_ID))
    .sendKeys(login)

  await driver.wait(
    until.elementLocated(By.id(PASSWORD_INPUT_ID)),
    8000
  )

  driver
    .findElement(By.id(PASSWORD_INPUT_ID))
    .sendKeys(PASSWORD)

  await driver.wait(
    until.elementLocated(By.id(SUBMIT_LOGIN_BUTTON_ID)),
    8000
  )

  await driver
    .findElement(By.id(SUBMIT_LOGIN_BUTTON_ID))
    .click()
}
