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
  EDIT_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID,
  EDIT_PACKAGE_MAINTAINER_PACKAGE_INPUT_MESSAGES_ID,
  EDIT_PACKAGE_MAINTAINER_REPOSITORY_INPUT_ID,
  EDIT_PACKAGE_MAINTAINER_REPOSITORY_INPUT_MESSAGES_ID,
  EDIT_PACKAGE_MAINTAINER_SUBMIT_ID,
  EDIT_PACKAGE_MAINTAINER_USER_INPUT_ID,
  GALILEO_GALILEI_ABC_TESTREPO3_ID,
  GALILEO_GALILEI_ACCRUED_TESTREPO1_ID,
  GALILEO_GALILEI_USL_TESTREPO1_ID,
  NUMPY_TESTREPO10_ID,
  PACKAGE_MAINTAINERS_SIDEBAR_ID,
  TEST_REPO_10_ID,
  USL_TESTREPO1_ID,
  WHEEL_TESTREPO10_ID
} from '../helpers/elementsIds'
import { i18n } from '@/plugins/i18n'
import { restoreData } from '../helpers/restoreData'
import { login } from '../helpers/login'
import {
  checkIfDisabled,
  clickOnButton,
  createDriver,
  goToPage
} from '../helpers/helpers'
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

describe('Edit Package Maintainer', () => {
  it('has proper initial values', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      PACKAGE_MAINTAINERS_SIDEBAR_ID,
      'RDepot - package maintainers'
    )

    await clickOnButton(
      driver,
      GALILEO_GALILEI_ACCRUED_TESTREPO1_ID
    )

    await driver.wait(
      until.elementLocated(
        By.id(EDIT_PACKAGE_MAINTAINER_USER_INPUT_ID)
      ),
      8000
    )

    await driver.wait(
      until.elementLocated(
        By.id(EDIT_PACKAGE_MAINTAINER_REPOSITORY_INPUT_ID)
      ),
      8000
    )

    await driver.wait(
      until.elementLocated(
        By.id(EDIT_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID)
      ),
      8000
    )

    await checkIfDisabled(
      driver,
      EDIT_PACKAGE_MAINTAINER_USER_INPUT_ID
    )

    expect(
      await driver
        .findElement(
          By.id(EDIT_PACKAGE_MAINTAINER_USER_INPUT_ID)
        )
        .getAttribute('value')
    ).toEqual('Galileo Galilei')

    expect(
      await driver
        .findElement(
          By.xpath(
            '//span[contains(@class, "v-autocomplete__selection-text") and text()="testrepo1"]'
          )
        )
        .getAttribute('innerText')
    ).toEqual('testrepo1')

    expect(
      await driver
        .findElement(
          By.id(EDIT_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID)
        )
        .getAttribute('value')
    ).toEqual('accrued')
  })

  it('change package', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      PACKAGE_MAINTAINERS_SIDEBAR_ID,
      'RDepot - package maintainers'
    )

    await driver.wait(
      until.elementLocated(
        By.id(GALILEO_GALILEI_ACCRUED_TESTREPO1_ID)
      ),
      8000
    )
    await clickOnButton(
      driver,
      GALILEO_GALILEI_ACCRUED_TESTREPO1_ID
    )

    await driver.wait(
      until.elementLocated(
        By.id(EDIT_PACKAGE_MAINTAINER_USER_INPUT_ID)
      ),
      8000
    )

    await driver.wait(
      until.elementLocated(
        By.id(EDIT_PACKAGE_MAINTAINER_REPOSITORY_INPUT_ID)
      ),
      8000
    )

    await driver.wait(
      until.elementLocated(
        By.id(EDIT_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID)
      ),
      8000
    )

    await checkIfDisabled(
      driver,
      EDIT_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID,
      false
    )

    await clickOnButton(
      driver,
      EDIT_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID
    )

    await clickOnButton(driver, USL_TESTREPO1_ID)

    await clickOnButton(
      driver,
      EDIT_PACKAGE_MAINTAINER_SUBMIT_ID
    )
  })

  it('change repository', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      PACKAGE_MAINTAINERS_SIDEBAR_ID,
      'RDepot - package maintainers'
    )

    await clickOnButton(
      driver,
      GALILEO_GALILEI_ABC_TESTREPO3_ID
    )

    await driver.wait(
      until.elementLocated(
        By.id(EDIT_PACKAGE_MAINTAINER_USER_INPUT_ID)
      ),
      8000
    )

    await driver.wait(
      until.elementLocated(
        By.id(EDIT_PACKAGE_MAINTAINER_REPOSITORY_INPUT_ID)
      ),
      8000
    )

    await driver.wait(
      until.elementLocated(
        By.id(EDIT_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID)
      ),
      8000
    )

    await clickOnButton(
      driver,
      EDIT_PACKAGE_MAINTAINER_REPOSITORY_INPUT_ID
    )

    await clickOnButton(driver, TEST_REPO_10_ID)

    expect(
      await driver
        .findElement(
          By.id(EDIT_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID)
        )
        .getAttribute('value')
    ).toEqual('')

    await clickOnButton(
      driver,
      EDIT_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID
    )
    await clickOnButton(driver, NUMPY_TESTREPO10_ID)

    await clickOnButton(
      driver,
      EDIT_PACKAGE_MAINTAINER_SUBMIT_ID
    )
  })

  it('should display proper error messages', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      PACKAGE_MAINTAINERS_SIDEBAR_ID,
      'RDepot - package maintainers'
    )

    await driver.wait(
      until.elementLocated(
        By.id(GALILEO_GALILEI_USL_TESTREPO1_ID)
      ),
      8000
    )
    await clickOnButton(
      driver,
      GALILEO_GALILEI_USL_TESTREPO1_ID
    )

    await driver.wait(
      until.elementLocated(
        By.id(EDIT_PACKAGE_MAINTAINER_REPOSITORY_INPUT_ID)
      ),
      8000
    )

    await driver.wait(
      until.elementLocated(
        By.id(EDIT_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID)
      ),
      8000
    )

    await checkIfDisabled(
      driver,
      EDIT_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID,
      false
    )

    await driver.wait(
      until.elementLocated(
        By.xpath('//i[@aria-label="Clear Repository"]')
      ),
      8000
    )

    const clearRepositoryButtons =
      await driver.findElements(
        By.xpath('//i[@aria-label="Clear Repository"]')
      )

    await clearRepositoryButtons[1].click()

    await driver.wait(
      until.elementLocated(
        By.id(
          EDIT_PACKAGE_MAINTAINER_REPOSITORY_INPUT_MESSAGES_ID
        )
      ),
      8000
    )

    expect(
      await driver
        .findElement(
          By.id(
            EDIT_PACKAGE_MAINTAINER_REPOSITORY_INPUT_MESSAGES_ID
          )
        )
        .getAttribute('innerText')
    ).toEqual(i18n.t('common.errors.required'))

    await driver.wait(
      until.elementLocated(
        By.id(
          EDIT_PACKAGE_MAINTAINER_PACKAGE_INPUT_MESSAGES_ID
        )
      ),
      8000
    )

    expect(
      await driver
        .findElement(
          By.id(
            EDIT_PACKAGE_MAINTAINER_PACKAGE_INPUT_MESSAGES_ID
          )
        )
        .getAttribute('innerText')
    ).toContain('Required')

    await checkIfDisabled(
      driver,
      EDIT_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID
    )

    await clickOnButton(
      driver,
      EDIT_PACKAGE_MAINTAINER_REPOSITORY_INPUT_ID
    )

    await clickOnButton(driver, TEST_REPO_10_ID)

    expect(
      await driver
        .findElement(
          By.id(EDIT_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID)
        )
        .getAttribute('value')
    ).toEqual('')

    await checkIfDisabled(
      driver,
      EDIT_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID,
      false
    )

    await clickOnButton(
      driver,
      EDIT_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID
    )

    await clickOnButton(driver, WHEEL_TESTREPO10_ID)

    await clickOnButton(
      driver,
      EDIT_PACKAGE_MAINTAINER_SUBMIT_ID
    )
  })
})
