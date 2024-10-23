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
  ACCESS_TOKENS_SIDEBAR_ID,
  CHANGE_LANGUAGE_NAVBAR_ID,
  ENGLISH_LANGUAGE_ID,
  PACKAGE_MAINTAINERS_SIDEBAR_ID,
  POLISH_LANGUAGE_ID,
  REPOSITORIES_SIDEBAR_ID,
  REPOSITORY_MAINTAINERS_SIDEBAR_ID,
  SETTINGS_LIST_SIDEBAR_ID,
  SUBMISSIONS_SIDEBAR_ID,
  USERS_SIDEBAR_ID
} from '../helpers/elementsIds'
import { restoreData } from '../helpers/restoreData'
import {
  clickOnButton,
  clickOnMenuItemById,
  createDriver,
  goToPage
} from '../helpers/helpers'
import { login } from '../helpers/login'
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

describe('Change language with navbar button', () => {
  it('change language on the packages site', async () => {
    await login(driver, 'einstein')

    const englishHeaders =
      'PackageVersionTitleMaintainerRepositoryTechnologyStatusActiveActions'
    const polishHeaders =
      'PakietWersjaTytułOpiekunRepozytoriumTechnologiaStatusAktywnyAkcje'

    let appHeaders = await driver
      .findElement(By.xpath('//thead'))
      .getText()

    expect(appHeaders.replaceAll(/\s+/g, '')).toEqual(
      englishHeaders
    )

    await clickOnButton(driver, CHANGE_LANGUAGE_NAVBAR_ID)
    await clickOnMenuItemById(driver, POLISH_LANGUAGE_ID)

    appHeaders = await driver
      .findElement(By.xpath('//thead'))
      .getText()

    expect(appHeaders.replaceAll(/\s+/g, '')).toEqual(
      polishHeaders
    )

    await clickOnButton(driver, CHANGE_LANGUAGE_NAVBAR_ID)
    await clickOnMenuItemById(driver, ENGLISH_LANGUAGE_ID)

    appHeaders = await driver
      .findElement(By.xpath('//thead'))
      .getText()

    expect(appHeaders.replaceAll(/\s+/g, '')).toEqual(
      englishHeaders
    )
  })

  it('change language on the package maintainers site', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      PACKAGE_MAINTAINERS_SIDEBAR_ID,
      'RDepot - package maintainers'
    )

    const englishHeaders =
      'MaintainerPackageRepositoryTechnologyActions'
    const polishHeaders =
      'OpiekunPakietRepozytoriumTechnologiaAkcje'

    let appHeaders = await driver
      .findElement(By.xpath('//thead'))
      .getText()

    expect(appHeaders.replaceAll(/\s+/g, '')).toEqual(
      englishHeaders
    )

    await clickOnButton(driver, CHANGE_LANGUAGE_NAVBAR_ID)
    await clickOnMenuItemById(driver, POLISH_LANGUAGE_ID)

    appHeaders = await driver
      .findElement(By.xpath('//thead'))
      .getText()

    expect(appHeaders.replaceAll(/\s+/g, '')).toEqual(
      polishHeaders
    )

    await clickOnButton(driver, CHANGE_LANGUAGE_NAVBAR_ID)
    await clickOnMenuItemById(driver, ENGLISH_LANGUAGE_ID)

    appHeaders = await driver
      .findElement(By.xpath('//thead'))
      .getText()

    expect(appHeaders.replaceAll(/\s+/g, '')).toEqual(
      englishHeaders
    )
  })

  it('change language on the repositories site', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      REPOSITORIES_SIDEBAR_ID,
      'RDepot - repositories'
    )

    const englishHeaders =
      'RepositoryPublicationURIServeraddressTechnologyVersion#packagesPublishedActions'
    const polishHeaders =
      'RepozytoriumURIpublikacjiAdresserweraTechnologiaWersja#pakietuOpublikowanoAkcje'

    let appHeaders = await driver
      .findElement(By.xpath('//thead'))
      .getText()

    expect(appHeaders.replaceAll(/\s+/g, '')).toEqual(
      englishHeaders
    )

    await clickOnButton(driver, CHANGE_LANGUAGE_NAVBAR_ID)
    await clickOnMenuItemById(driver, POLISH_LANGUAGE_ID)

    appHeaders = await driver
      .findElement(By.xpath('//thead'))
      .getText()

    expect(appHeaders.replaceAll(/\s+/g, '')).toEqual(
      polishHeaders
    )

    await clickOnButton(driver, CHANGE_LANGUAGE_NAVBAR_ID)
    await clickOnMenuItemById(driver, ENGLISH_LANGUAGE_ID)

    appHeaders = await driver
      .findElement(By.xpath('//thead'))
      .getText()

    expect(appHeaders.replaceAll(/\s+/g, '')).toEqual(
      englishHeaders
    )
  })

  it('change language on the repository maintainers site', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      REPOSITORY_MAINTAINERS_SIDEBAR_ID,
      'RDepot - repository maintainers'
    )

    const englishHeaders =
      'MaintainerRepositoryTechnologyActions'
    const polishHeaders =
      'OpiekunRepozytoriumTechnologiaAkcje'

    let appHeaders = await driver
      .findElement(By.xpath('//thead'))
      .getText()

    expect(appHeaders.replaceAll(/\s+/g, '')).toEqual(
      englishHeaders
    )

    await clickOnButton(driver, CHANGE_LANGUAGE_NAVBAR_ID)
    await clickOnMenuItemById(driver, POLISH_LANGUAGE_ID)

    appHeaders = await driver
      .findElement(By.xpath('//thead'))
      .getText()

    expect(appHeaders.replaceAll(/\s+/g, '')).toEqual(
      polishHeaders
    )

    await clickOnButton(driver, CHANGE_LANGUAGE_NAVBAR_ID)
    await clickOnMenuItemById(driver, ENGLISH_LANGUAGE_ID)

    appHeaders = await driver
      .findElement(By.xpath('//thead'))
      .getText()

    expect(appHeaders.replaceAll(/\s+/g, '')).toEqual(
      englishHeaders
    )
  })

  it('change language on the submissions site', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      SUBMISSIONS_SIDEBAR_ID,
      'RDepot - submissions'
    )

    const englishHeaders =
      'DatePackageVersionRepositorySubmitterApproverTechnologyStatusActions'
    const polishHeaders =
      'DataPakietWersjaRepozytoriumZgłaszającyZatwierdzającyTechnologiaStatusAkcje'

    let appHeaders = await driver
      .findElement(By.xpath('//thead'))
      .getText()

    expect(appHeaders.replaceAll(/\s+/g, '')).toEqual(
      englishHeaders
    )

    await clickOnButton(driver, CHANGE_LANGUAGE_NAVBAR_ID)
    await clickOnMenuItemById(driver, POLISH_LANGUAGE_ID)

    appHeaders = await driver
      .findElement(By.xpath('//thead'))
      .getText()

    expect(appHeaders.replaceAll(/\s+/g, '')).toEqual(
      polishHeaders
    )

    await clickOnButton(driver, CHANGE_LANGUAGE_NAVBAR_ID)
    await clickOnMenuItemById(driver, ENGLISH_LANGUAGE_ID)

    appHeaders = await driver
      .findElement(By.xpath('//thead'))
      .getText()

    expect(appHeaders.replaceAll(/\s+/g, '')).toEqual(
      englishHeaders
    )
  })

  it('change language on the users site', async () => {
    await login(driver, 'einstein')
    await goToPage(
      driver,
      USERS_SIDEBAR_ID,
      'RDepot - users'
    )

    const englishHeaders =
      'UsernameUserEmailRoleActiveActions'
    const polishHeaders =
      'NazwaużytkownikaUżytkownikEmailRolaAktywnyAkcje'

    let appHeaders = await driver
      .findElement(By.xpath('//thead'))
      .getText()

    expect(appHeaders.replaceAll(/\s+/g, '')).toEqual(
      englishHeaders
    )

    await clickOnButton(driver, CHANGE_LANGUAGE_NAVBAR_ID)
    await clickOnMenuItemById(driver, POLISH_LANGUAGE_ID)

    appHeaders = await driver
      .findElement(By.xpath('//thead'))
      .getText()

    expect(appHeaders.replaceAll(/\s+/g, '')).toEqual(
      polishHeaders
    )

    await clickOnButton(driver, CHANGE_LANGUAGE_NAVBAR_ID)
    await clickOnMenuItemById(driver, ENGLISH_LANGUAGE_ID)

    appHeaders = await driver
      .findElement(By.xpath('//thead'))
      .getText()

    expect(appHeaders.replaceAll(/\s+/g, '')).toEqual(
      englishHeaders
    )
  })

  it('change language on the tokens site', async () => {
    await login(driver, 'einstein')
    await clickOnButton(driver, SETTINGS_LIST_SIDEBAR_ID)
    await clickOnMenuItemById(
      driver,
      ACCESS_TOKENS_SIDEBAR_ID
    )

    await driver.wait(
      until.titleIs('RDepot - access tokens'),
      8000
    )
    const englishHeaders =
      'NameUserCreationdateExpirationdateActiveActions'
    const polishHeaders =
      'NazwaUżytkownikDatautworzeniaDatawygaśnięciaAktywnyAkcje'

    let appHeaders = await driver
      .findElement(By.xpath('//thead'))
      .getText()

    expect(appHeaders.replaceAll(/\s+/g, '')).toEqual(
      englishHeaders
    )

    await clickOnButton(driver, CHANGE_LANGUAGE_NAVBAR_ID)
    await clickOnMenuItemById(driver, POLISH_LANGUAGE_ID)

    appHeaders = await driver
      .findElement(By.xpath('//thead'))
      .getText()

    expect(appHeaders.replaceAll(/\s+/g, '')).toEqual(
      polishHeaders
    )

    await clickOnButton(driver, CHANGE_LANGUAGE_NAVBAR_ID)
    await clickOnMenuItemById(driver, ENGLISH_LANGUAGE_ID)

    appHeaders = await driver
      .findElement(By.xpath('//thead'))
      .getText()

    expect(appHeaders.replaceAll(/\s+/g, '')).toEqual(
      englishHeaders
    )
  })
})
