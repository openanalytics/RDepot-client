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
  clickOnButton,
  createDriver,
  goToPage
} from '../helpers/helpers'
import {
  COPY_PUBLICATION_URI_TESTREPO1_BUTTON_ID,
  COPY_SERVER_ADDRESS_TESTREPO2_BUTTON_ID,
  REPOSITORIES_FILTRATION_SEARCH_FIELD_ID,
  REPOSITORIES_LIST_PYTHON_REPO_ID,
  REPOSITORIES_LIST_R_REPO_ID,
  REPOSITORIES_SIDEBAR_ID,
  REPOSITORY_DESCRIPTION_HASH_METHOD_ID,
  REPOSITORY_DESCRIPTION_LAST_MODIFICATION_DATE_ID,
  REPOSITORY_DESCRIPTION_LAST_PUBLICATION_DATE_ID,
  REPOSITORY_DESCRIPTION_PUBLICATION_STATUS_ID
} from '../helpers/elementsIds'
import { platform } from 'os'
// eslint-disable-next-line @typescript-eslint/no-require-imports
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

describe('Repositories list', () => {
  it('expand Python repository', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      REPOSITORIES_SIDEBAR_ID,
      'RDepot - repositories'
    )
    await driver.wait(
      until.elementLocated(
        By.id(REPOSITORIES_LIST_PYTHON_REPO_ID)
      ),
      8000
    )

    await driver
      .findElement(By.id(REPOSITORIES_LIST_PYTHON_REPO_ID))
      .click()

    await driver.wait(
      until.elementLocated(
        By.id(
          REPOSITORY_DESCRIPTION_LAST_MODIFICATION_DATE_ID
        )
      ),
      8000
    )

    await driver.wait(
      until.elementLocated(
        By.id(REPOSITORY_DESCRIPTION_PUBLICATION_STATUS_ID)
      ),
      8000
    )

    await driver.wait(
      until.elementLocated(
        By.id(
          REPOSITORY_DESCRIPTION_LAST_PUBLICATION_DATE_ID
        )
      ),
      8000
    )

    await driver.wait(
      until.elementLocated(
        By.id(REPOSITORY_DESCRIPTION_HASH_METHOD_ID)
      ),
      8000
    )
  })

  it('expand R repository', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      REPOSITORIES_SIDEBAR_ID,
      'RDepot - repositories'
    )
    await driver.wait(
      until.elementLocated(
        By.id(REPOSITORIES_LIST_R_REPO_ID)
      ),
      8000
    )
    await driver
      .findElement(By.id(REPOSITORIES_LIST_R_REPO_ID))
      .click()

    await driver.wait(
      until.elementLocated(
        By.id(
          REPOSITORY_DESCRIPTION_LAST_MODIFICATION_DATE_ID
        )
      ),
      8000
    )

    await driver.wait(
      until.elementLocated(
        By.id(REPOSITORY_DESCRIPTION_PUBLICATION_STATUS_ID)
      ),
      8000
    )

    await driver.wait(
      until.elementLocated(
        By.id(
          REPOSITORY_DESCRIPTION_LAST_PUBLICATION_DATE_ID
        )
      ),
      8000
    )
    const hashMethodFields = await driver.findElements(
      By.id(REPOSITORY_DESCRIPTION_HASH_METHOD_ID)
    )

    expect(hashMethodFields.length).toEqual(0)
  })

  it('copy publication uri', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      REPOSITORIES_SIDEBAR_ID,
      'RDepot - repositories'
    )

    const textField = await driver.findElement(
      By.id(REPOSITORIES_FILTRATION_SEARCH_FIELD_ID)
    )

    const controlButton =
      platform() == 'darwin' ? Key.COMMAND : Key.CONTROL

    await clickOnButton(
      driver,
      COPY_PUBLICATION_URI_TESTREPO1_BUTTON_ID
    )

    await driver
      .actions()
      .click(textField)
      .keyDown(controlButton)
      .sendKeys('v')
      .keyUp(controlButton)
      .perform()

    expect(await textField.getAttribute('value')).toEqual(
      'http://localhost/repo/testrepo1'
    )
  })

  it('copy server address', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      REPOSITORIES_SIDEBAR_ID,
      'RDepot - repositories'
    )

    const textField = await driver.findElement(
      By.id(REPOSITORIES_FILTRATION_SEARCH_FIELD_ID)
    )

    const controlButton =
      platform() == 'darwin' ? Key.COMMAND : Key.CONTROL

    await clickOnButton(
      driver,
      COPY_SERVER_ADDRESS_TESTREPO2_BUTTON_ID
    )

    await driver
      .actions()
      .click(textField)
      .keyDown(controlButton)
      .sendKeys('v')
      .keyUp(controlButton)
      .perform()

    expect(await textField.getAttribute('value')).toEqual(
      'http://oa-rdepot-repo:8080/testrepo2'
    )
  })
})
