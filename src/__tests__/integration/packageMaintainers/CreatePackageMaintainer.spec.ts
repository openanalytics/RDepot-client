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

import { i18n } from '@/plugins/i18n'
import {
  describe,
  it,
  beforeEach,
  afterEach,
  expect,
  beforeAll
} from 'vitest'
import {
  A3_TESTREPO3_ID,
  ADD_MAINTAINER_ID,
  ALBERT_EINSTEIN_ID,
  CREATE_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID,
  CREATE_PACKAGE_MAINTAINER_PACKAGE_INPUT_MESSAGES_ID,
  CREATE_PACKAGE_MAINTAINER_REPOSITORY_INPUT_ID,
  CREATE_PACKAGE_MAINTAINER_REPOSITORY_INPUT_MESSAGES_ID,
  CREATE_PACKAGE_MAINTAINER_SUBMIT_ID,
  CREATE_PACKAGE_MAINTAINER_USER_INPUT_ID,
  CREATE_PACKAGE_MAINTAINER_USER_INPUT_MESSAGES_ID,
  GALILEO_GALILEI_ID,
  NIKOLA_TESLA_ID,
  NUMPY_TESTREPO10_ID,
  PACKAGE_MAINTAINERS_SIDEBAR_ID,
  TEST_REPO_10_ID,
  TEST_REPO_3_ID
} from '../helpers/elementsIds'
import { restoreData } from '../helpers/restoreData'
import { login } from '../helpers/login'
import {
  checkIfDisabled,
  checkIfHasClass,
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

describe('Create Package Maintainer', () => {
  it('create package maintainer', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      PACKAGE_MAINTAINERS_SIDEBAR_ID,
      'RDepot - package maintainers'
    )
    await clickOnButton(driver, ADD_MAINTAINER_ID)

    await driver.wait(
      until.elementLocated(
        By.id(CREATE_PACKAGE_MAINTAINER_REPOSITORY_INPUT_ID)
      ),
      8000
    )

    await clickOnButton(
      driver,
      CREATE_PACKAGE_MAINTAINER_USER_INPUT_ID
    )

    await clickOnButton(driver, NIKOLA_TESLA_ID)

    await clickOnButton(
      driver,
      CREATE_PACKAGE_MAINTAINER_REPOSITORY_INPUT_ID
    )
    await clickOnButton(driver, TEST_REPO_10_ID)

    await checkIfDisabled(
      driver,
      CREATE_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID,
      false
    )
    await clickOnButton(
      driver,
      CREATE_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID
    )
    await clickOnButton(driver, NUMPY_TESTREPO10_ID)

    await clickOnButton(
      driver,
      CREATE_PACKAGE_MAINTAINER_SUBMIT_ID
    )
  })

  it('create package maintainer that already exist - should not allow', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      PACKAGE_MAINTAINERS_SIDEBAR_ID,
      'RDepot - package maintainers'
    )
    await clickOnButton(driver, ADD_MAINTAINER_ID)
    await driver.wait(
      until.elementLocated(
        By.id(CREATE_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID)
      ),
      8000
    )
    await checkIfDisabled(
      driver,
      CREATE_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID
    )

    await clickOnButton(
      driver,
      CREATE_PACKAGE_MAINTAINER_USER_INPUT_ID
    )

    await clickOnButton(driver, GALILEO_GALILEI_ID)

    await clickOnButton(
      driver,
      CREATE_PACKAGE_MAINTAINER_REPOSITORY_INPUT_ID
    )

    await clickOnButton(driver, TEST_REPO_3_ID)

    await checkIfDisabled(
      driver,
      CREATE_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID,
      false
    )

    await clickOnButton(
      driver,
      CREATE_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID
    )

    await checkIfHasClass(
      driver,
      A3_TESTREPO3_ID,
      'v-list-item--disabled'
    )

    const disabledPackageItem = await driver
      .findElement(By.id(A3_TESTREPO3_ID))
      .getAttribute('outerHTML')

    expect(disabledPackageItem).toContain('Galileo Galilei')

    await checkIfDisabled(
      driver,
      CREATE_PACKAGE_MAINTAINER_SUBMIT_ID
    )
  })

  it('should display proper error messages', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      PACKAGE_MAINTAINERS_SIDEBAR_ID,
      'RDepot - package maintainers'
    )

    await clickOnButton(driver, ADD_MAINTAINER_ID)
    await driver.wait(
      until.elementLocated(
        By.id(CREATE_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID)
      ),
      8000
    )
    expect(
      await driver
        .findElement(
          By.id(
            CREATE_PACKAGE_MAINTAINER_PACKAGE_INPUT_MESSAGES_ID
          )
        )
        .getAttribute('innerText')
    ).toEqual(
      i18n.t(
        'maintainers.createform.disabledPackageMessage'
      )
    )
    await checkIfDisabled(
      driver,
      CREATE_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID
    )

    await clickOnButton(
      driver,
      CREATE_PACKAGE_MAINTAINER_USER_INPUT_ID
    )
    await clickOnButton(driver, ALBERT_EINSTEIN_ID)

    await driver.wait(
      until.elementLocated(
        By.xpath('//i[@aria-label="Clear User"]')
      ),
      8000
    )

    await driver
      .findElement(
        By.xpath('//i[@aria-label="Clear User"]')
      )
      .click()

    await checkIfDisabled(
      driver,
      CREATE_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID
    )

    await clickOnButton(
      driver,
      CREATE_PACKAGE_MAINTAINER_USER_INPUT_ID
    )
    await clickOnButton(driver, ALBERT_EINSTEIN_ID)

    await clickOnButton(
      driver,
      CREATE_PACKAGE_MAINTAINER_REPOSITORY_INPUT_ID
    )
    await clickOnButton(driver, TEST_REPO_3_ID)

    await checkIfDisabled(
      driver,
      CREATE_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID,
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
          CREATE_PACKAGE_MAINTAINER_REPOSITORY_INPUT_MESSAGES_ID
        )
      ),
      8000
    )

    expect(
      await driver
        .findElement(
          By.id(
            CREATE_PACKAGE_MAINTAINER_REPOSITORY_INPUT_MESSAGES_ID
          )
        )
        .getAttribute('innerText')
    ).toEqual(i18n.t('common.errors.required'))

    await clickOnButton(
      driver,
      CREATE_PACKAGE_MAINTAINER_REPOSITORY_INPUT_ID
    )
    await clickOnButton(driver, TEST_REPO_3_ID)

    await checkIfDisabled(
      driver,
      CREATE_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID,
      false
    )

    await clickOnButton(
      driver,
      CREATE_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID
    )
    await clickOnButton(driver, A3_TESTREPO3_ID)

    await driver.wait(
      until.elementLocated(
        By.xpath('//i[@aria-label="Clear Package"]')
      ),
      8000
    )

    await driver
      .findElement(
        By.xpath('//i[@aria-label="Clear Package"]')
      )
      .click()

    await driver.wait(
      until.elementLocated(
        By.id(
          CREATE_PACKAGE_MAINTAINER_PACKAGE_INPUT_MESSAGES_ID
        )
      ),
      8000
    )

    expect(
      await driver
        .findElement(
          By.id(
            CREATE_PACKAGE_MAINTAINER_PACKAGE_INPUT_MESSAGES_ID
          )
        )
        .getAttribute('innerText')
    ).toEqual(i18n.t('common.errors.required'))

    await clickOnButton(
      driver,
      CREATE_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID
    )
    await clickOnButton(driver, A3_TESTREPO3_ID)

    await checkIfDisabled(
      driver,
      CREATE_PACKAGE_MAINTAINER_SUBMIT_ID,
      false
    )

    await driver
      .findElement(
        By.xpath('//i[@aria-label="Clear User"]')
      )
      .click()

    await checkIfDisabled(
      driver,
      'create-package-maintainer-package'
    )

    expect(
      await driver
        .findElement(
          By.id(
            CREATE_PACKAGE_MAINTAINER_USER_INPUT_MESSAGES_ID
          )
        )
        .getAttribute('innerText')
    ).toEqual(i18n.t('common.errors.required'))

    expect(
      await driver
        .findElement(
          By.id(CREATE_PACKAGE_MAINTAINER_PACKAGE_INPUT_ID)
        )
        .getAttribute('outerHTML')
    ).not.toContain('A3')
  })
})
