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
  ALBERT_EINSTEIN_TESTREPO10_ID,
  EDIT_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID,
  EDIT_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_MESSAGES_ID,
  EDIT_REPOSITORY_MAINTAINER_SUBMIT_ID,
  EDIT_REPOSITORY_MAINTAINER_USER_INPUT_ID,
  NIKOLA_TESLA_TESTREPO1_ID,
  REPOSITORY_MAINTAINERS_SIDEBAR_ID,
  TEST_REPO_2_ID,
  TEST_REPO_3_ID
} from '../helpers/elementsIds'
import { i18n } from '@/plugins/i18n'
import { restoreData } from '../helpers/restoreData'
import {
  checkIfDisabled,
  clickOnButton,
  clickOnButtonByXpath,
  createDriver,
  goToPage
} from '../helpers/helpers'
import { login } from '../helpers/login'
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

describe('Edit Repository Maintainer', () => {
  it('has proper initial values', async () => {
    await login(driver, 'einstein')

    await goToPage(
      driver,
      REPOSITORY_MAINTAINERS_SIDEBAR_ID,
      'RDepot - repository maintainers'
    )

    await clickOnButton(
      driver,
      ALBERT_EINSTEIN_TESTREPO10_ID
    )

    await driver.wait(
      until.elementLocated(
        By.id(EDIT_REPOSITORY_MAINTAINER_USER_INPUT_ID)
      ),
      8000
    )

    await driver.wait(
      until.elementLocated(
        By.id(
          EDIT_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID
        )
      ),
      8000
    )

    await checkIfDisabled(
      driver,
      EDIT_REPOSITORY_MAINTAINER_USER_INPUT_ID
    )

    expect(
      await driver
        .findElement(
          By.id(EDIT_REPOSITORY_MAINTAINER_USER_INPUT_ID)
        )
        .getAttribute('value')
    ).toEqual('Albert Einstein')

    expect(
      await driver
        .findElement(
          By.xpath(
            '//span[contains(@class, "v-autocomplete__selection-text") and text()="testrepo10"]'
          )
        )
        .getAttribute('innerText')
    ).toEqual('testrepo10')
  })

  it('change repository', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      REPOSITORY_MAINTAINERS_SIDEBAR_ID,
      'RDepot - repository maintainers'
    )

    await clickOnButton(
      driver,
      ALBERT_EINSTEIN_TESTREPO10_ID
    )

    await driver.wait(
      until.elementLocated(
        By.id(EDIT_REPOSITORY_MAINTAINER_USER_INPUT_ID)
      ),
      8000
    )

    await clickOnButton(
      driver,
      EDIT_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID
    )

    await clickOnButton(driver, TEST_REPO_3_ID)

    await clickOnButton(
      driver,
      EDIT_REPOSITORY_MAINTAINER_SUBMIT_ID
    )
  })

  it('should display proper error messages', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      REPOSITORY_MAINTAINERS_SIDEBAR_ID,
      'RDepot - repository maintainers'
    )
    await clickOnButton(driver, NIKOLA_TESLA_TESTREPO1_ID)

    await driver.wait(
      until.elementLocated(
        By.id(
          EDIT_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID
        )
      ),
      8000
    )
    await clickOnButtonByXpath(
      driver,
      '//i[@aria-label="Clear Repository"]'
    )

    await driver.wait(
      until.elementLocated(
        By.id(
          EDIT_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_MESSAGES_ID
        )
      ),
      8000
    )

    expect(
      await driver
        .findElement(
          By.id(
            EDIT_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_MESSAGES_ID
          )
        )
        .getAttribute('innerText')
    ).toEqual(i18n.t('common.errors.required'))

    await clickOnButton(
      driver,
      EDIT_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID
    )
    await clickOnButton(driver, TEST_REPO_2_ID)

    await clickOnButton(
      driver,
      EDIT_REPOSITORY_MAINTAINER_SUBMIT_ID
    )
  })
})
