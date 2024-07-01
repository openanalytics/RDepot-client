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
  ADD_REPOSITORY_MAINTAINER_ID,
  ALBERT_EINSTEIN_ID,
  CREATE_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID,
  CREATE_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_MESSAGES_ID,
  CREATE_REPOSITORY_MAINTAINER_SUBMIT_ID,
  CREATE_REPOSITORY_MAINTAINER_USER_INPUT_ID,
  CREATE_REPOSITORY_MAINTAINER_USER_INPUT_MESSAGES_ID,
  NIKOLA_TESLA_ID,
  REPOSITORY_MAINTAINERS_SIDEBAR_ID,
  TEST_REPO_10_ID,
  TEST_REPO_3_ID
} from '../helpers/elementsIds'
import { restoreData } from '../helpers/restoreData'
import {
  checkIfDisabled,
  checkIfHasClass,
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

describe('Create Repository Maintainer', () => {
  it('create repository maintainer', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      REPOSITORY_MAINTAINERS_SIDEBAR_ID,
      'RDepot - repository maintainers'
    )

    await clickOnButton(
      driver,
      ADD_REPOSITORY_MAINTAINER_ID
    )

    await checkIfDisabled(
      driver,
      CREATE_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID
    )

    await clickOnButton(
      driver,
      CREATE_REPOSITORY_MAINTAINER_USER_INPUT_ID
    )

    await clickOnButton(
      driver,
      CREATE_REPOSITORY_MAINTAINER_USER_INPUT_ID
    )

    await clickOnButton(
      driver,
      CREATE_REPOSITORY_MAINTAINER_USER_INPUT_ID
    )

    await clickOnButton(driver, NIKOLA_TESLA_ID)

    await checkIfDisabled(
      driver,
      CREATE_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID,
      false
    )
    await clickOnButton(
      driver,
      CREATE_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID
    )
    await clickOnButton(driver, TEST_REPO_10_ID)

    await clickOnButton(
      driver,
      CREATE_REPOSITORY_MAINTAINER_SUBMIT_ID
    )
  })

  it('create repository maintainer that already exist - should not allow', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      REPOSITORY_MAINTAINERS_SIDEBAR_ID,
      'RDepot - repository maintainers'
    )
    await clickOnButton(
      driver,
      ADD_REPOSITORY_MAINTAINER_ID
    )
    await checkIfDisabled(
      driver,
      CREATE_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID
    )

    await clickOnButton(
      driver,
      CREATE_REPOSITORY_MAINTAINER_USER_INPUT_ID
    )

    await clickOnButton(driver, ALBERT_EINSTEIN_ID)

    await checkIfDisabled(
      driver,
      CREATE_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID,
      false
    )

    await clickOnButton(
      driver,
      CREATE_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID
    )

    await checkIfHasClass(
      driver,
      TEST_REPO_10_ID,
      'v-list-item--disabled'
    )

    await checkIfHasClass(
      driver,
      TEST_REPO_3_ID,
      'v-list-item--disabled',
      false
    )

    const disabledRepoItem = await driver
      .findElement(
        By.id('select-input-repository-testrepo10')
      )
      .getAttribute('outerHTML')

    expect(disabledRepoItem).toContain('Albert Einstein')

    await checkIfDisabled(
      driver,
      CREATE_REPOSITORY_MAINTAINER_SUBMIT_ID
    )
  })

  it('should display proper error messages', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      REPOSITORY_MAINTAINERS_SIDEBAR_ID,
      'RDepot - repository maintainers'
    )
    await clickOnButton(
      driver,
      ADD_REPOSITORY_MAINTAINER_ID
    )
    await driver.wait(
      until.elementLocated(
        By.id(ADD_REPOSITORY_MAINTAINER_ID)
      ),
      8000
    )
    expect(
      await driver
        .findElement(
          By.id(
            CREATE_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_MESSAGES_ID
          )
        )
        .getText()
    ).toEqual(
      i18n.t(
        'maintainers.createform.disabledRepositoryMessage'
      )
    )
    await checkIfDisabled(
      driver,
      CREATE_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID
    )

    await clickOnButton(
      driver,
      CREATE_REPOSITORY_MAINTAINER_USER_INPUT_ID
    )
    await clickOnButton(driver, ALBERT_EINSTEIN_ID)

    await clickOnButtonByXpath(
      driver,
      '//i[@aria-label="Clear User"]'
    )

    await driver.wait(
      until.elementLocated(
        By.id(
          CREATE_REPOSITORY_MAINTAINER_USER_INPUT_MESSAGES_ID
        )
      ),
      8000
    )

    expect(
      await driver
        .findElement(
          By.id(
            CREATE_REPOSITORY_MAINTAINER_USER_INPUT_MESSAGES_ID
          )
        )
        .getAttribute('innerText')
    ).toEqual(i18n.t('common.errors.required'))

    await checkIfDisabled(
      driver,
      CREATE_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID
    )

    await clickOnButton(
      driver,
      CREATE_REPOSITORY_MAINTAINER_USER_INPUT_ID
    )
    await clickOnButton(driver, ALBERT_EINSTEIN_ID)

    await clickOnButton(
      driver,
      CREATE_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID
    )
    await clickOnButton(driver, TEST_REPO_3_ID)

    await clickOnButtonByXpath(
      driver,
      '//i[@aria-label="Clear Repository"]'
    )

    await driver.wait(
      until.elementLocated(
        By.id(
          CREATE_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_MESSAGES_ID
        )
      ),
      8000
    )
    expect(
      await driver
        .findElement(
          By.id(
            CREATE_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_MESSAGES_ID
          )
        )
        .getAttribute('innerText')
    ).toEqual(i18n.t('common.errors.required'))

    await driver
      .findElement(
        By.id(
          CREATE_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_MESSAGES_ID
        )
      )
      .click()
    await clickOnButton(
      driver,
      CREATE_REPOSITORY_MAINTAINER_REPOSITORY_INPUT_ID
    )
    await clickOnButton(driver, TEST_REPO_3_ID)

    await checkIfDisabled(
      driver,
      CREATE_REPOSITORY_MAINTAINER_SUBMIT_ID,
      false
    )
  })
})
