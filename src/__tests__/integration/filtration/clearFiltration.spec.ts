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
  beforeAll
} from 'vitest'
import {
  PACKAGE_MAINTAINERS_FILTRATION_SEARCH_FIELD_ID,
  PACKAGE_MAINTAINERS_SIDEBAR_ID,
  PACKAGES_FILTRATION_MAINTAINER_FIELD_GALILEO_ID,
  PACKAGES_FILTRATION_MAINTAINER_FIELD_ID,
  REPOSITORIES_FILTRATION_SEARCH_FIELD_ID,
  REPOSITORY_MAINTAINERS_FILTRATION_SEARCH_FIELD_ID,
  REPOSITORY_MAINTAINERS_SIDEBAR_ID,
  SUBMISSIONS_FILTRATION_REPOSITORY_FIELD_ID,
  SUBMISSIONS_FILTRATION_REPOSITORY_FIELD_TESTREPO1_ID,
  SUBMISSIONS_SIDEBAR_ID,
  UPLOAD_PACKAGES_SIDEBAR_ID,
  UPLOAD_SUBMISSION_CONTINUE_BUTTON_ID,
  UPLOAD_SUBMISSION_REPOSITORY_FIELD_ID,
  UPLOAD_SUBMISSION_REPOSITORY_TESTREPO3_ID
} from '../helpers/elementsIds'
import { restoreData } from '../helpers/restoreData'
import { login } from '../helpers/login'
import {
  clickOnButton,
  clickOnMenuItemById,
  createDriver,
  goToPage,
  goToPageURL,
  setInputValue
} from '../helpers/helpers'
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

describe('Clear filtration before enter', () => {
  it('repositories view', async () => {
    await login(driver, 'einstein')

    await goToPage(
      driver,
      UPLOAD_PACKAGES_SIDEBAR_ID,
      'RDepot - upload packages'
    )

    await clickOnButton(
      driver,
      UPLOAD_SUBMISSION_REPOSITORY_FIELD_ID
    )
    await clickOnMenuItemById(
      driver,
      UPLOAD_SUBMISSION_REPOSITORY_TESTREPO3_ID
    )
    await clickOnButton(
      driver,
      UPLOAD_SUBMISSION_CONTINUE_BUTTON_ID
    )

    await goToPageURL(
      driver,
      '/repositories',
      'RDepot - repositories'
    )

    const repositoryFiltrationField = await driver.wait(
      until.elementLocated(
        By.id(REPOSITORIES_FILTRATION_SEARCH_FIELD_ID)
      )
    )

    expect(
      await repositoryFiltrationField.getAttribute('value')
    ).toEqual('')
  })
  it('repositories view - after repository maintainers filtration', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      REPOSITORY_MAINTAINERS_SIDEBAR_ID,
      'RDepot - repository maintainers'
    )
    await setInputValue(
      driver,
      REPOSITORY_MAINTAINERS_FILTRATION_SEARCH_FIELD_ID,
      'testrepo1'
    )

    await goToPageURL(
      driver,
      '/repositories',
      'RDepot - repositories'
    )

    const repositoryFiltrationField = await driver.wait(
      until.elementLocated(
        By.id(REPOSITORIES_FILTRATION_SEARCH_FIELD_ID)
      )
    )

    expect(
      await repositoryFiltrationField.getAttribute('value')
    ).toEqual('')
  })
  it('packages view - after package maintainers filtration', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      PACKAGE_MAINTAINERS_SIDEBAR_ID,
      'RDepot - package maintainers'
    )
    await setInputValue(
      driver,
      PACKAGE_MAINTAINERS_FILTRATION_SEARCH_FIELD_ID,
      'Local Admin User'
    )

    await goToPageURL(
      driver,
      '/packages',
      'RDepot - packages'
    )

    await clickOnButton(
      driver,
      PACKAGES_FILTRATION_MAINTAINER_FIELD_ID
    )

    await clickOnMenuItemById(
      driver,
      PACKAGES_FILTRATION_MAINTAINER_FIELD_GALILEO_ID
    )
  })
  it('submissions view', async () => {
    await login(driver, 'einstein')

    await goToPage(
      driver,
      UPLOAD_PACKAGES_SIDEBAR_ID,
      'RDepot - upload packages'
    )

    await clickOnButton(
      driver,
      UPLOAD_SUBMISSION_REPOSITORY_FIELD_ID
    )
    await clickOnMenuItemById(
      driver,
      UPLOAD_SUBMISSION_REPOSITORY_TESTREPO3_ID
    )
    await clickOnButton(
      driver,
      UPLOAD_SUBMISSION_CONTINUE_BUTTON_ID
    )

    await goToPage(
      driver,
      SUBMISSIONS_SIDEBAR_ID,
      'RDepot - submissions'
    )

    await clickOnButton(
      driver,
      SUBMISSIONS_FILTRATION_REPOSITORY_FIELD_ID
    )
    await clickOnMenuItemById(
      driver,
      SUBMISSIONS_FILTRATION_REPOSITORY_FIELD_TESTREPO1_ID
    )
  })
})
