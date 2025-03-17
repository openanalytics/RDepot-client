/*
 * R Depot
 *
 * Copyright (C) 2012-2025 Open Analytics NV
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

import { test, expect } from '@playwright/test'
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
} from '@/__tests__/end-to-end/helpers/elementsIds'
import { login } from '@/__tests__/end-to-end/helpers/login'
import { restoreData } from '@/__tests__/end-to-end/helpers/restoreData'

const TITLE_SERIAL = 'language settings'
test.describe(TITLE_SERIAL, { tag: '@serial' }, () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeAll(async ({}, testInfo) => {
    await restoreData(testInfo.project.name)
  })

  test('change language on the packages site', async ({
    page
  }) => {
    await login(page, 'einstein')

    const englishHeaders =
      'NameMaintainerRepositoryTypeStatusActiveActions'
    const polishHeaders =
      'NazwaOpiekunRepozytoriumTypplikuStatusAktywnyAkcje'

    const plLanguageSelector = page.locator(
      `#${POLISH_LANGUAGE_ID}`
    )

    const enLanguageSelector = page.locator(
      `#${ENGLISH_LANGUAGE_ID}`
    )

    const tableHeadersSelector = page.locator('thead')
    await tableHeadersSelector.waitFor()
    expect(
      (await tableHeadersSelector.allInnerTexts())
        .join()
        .replaceAll(/\s+/g, '')
    ).toEqual(englishHeaders)

    await page
      .locator(`#${CHANGE_LANGUAGE_NAVBAR_ID}`)
      .click()

    await plLanguageSelector.waitFor()
    await plLanguageSelector.click()

    expect(
      (await tableHeadersSelector.allInnerTexts())
        .join()
        .replaceAll(/\s+/g, '')
    ).toEqual(polishHeaders)

    await page
      .locator(`#${CHANGE_LANGUAGE_NAVBAR_ID}`)
      .click()
    await enLanguageSelector.waitFor()
    await enLanguageSelector.click()

    expect(
      (await tableHeadersSelector.allInnerTexts())
        .join()
        .replaceAll(/\s+/g, '')
    ).toEqual(englishHeaders)
  })

  test('change language on the package maintainers site', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page
      .locator(`#${PACKAGE_MAINTAINERS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/package-maintainers')

    const englishHeaders =
      'MaintainerPackageRepositoryTechnologyActions'
    const polishHeaders =
      'OpiekunPakietRepozytoriumTechnologiaAkcje'

    const plLanguageSelector = page.locator(
      `#${POLISH_LANGUAGE_ID}`
    )

    const enLanguageSelector = page.locator(
      `#${ENGLISH_LANGUAGE_ID}`
    )

    const tableHeadersSelector = page.locator('thead')
    await tableHeadersSelector.waitFor()
    expect(
      (await tableHeadersSelector.allInnerTexts())
        .join()
        .replaceAll(/\s+/g, '')
    ).toEqual(englishHeaders)

    await page
      .locator(`#${CHANGE_LANGUAGE_NAVBAR_ID}`)
      .click()

    await plLanguageSelector.waitFor()
    await plLanguageSelector.click()

    expect(
      (await tableHeadersSelector.allInnerTexts())
        .join()
        .replaceAll(/\s+/g, '')
    ).toEqual(polishHeaders)

    await page
      .locator(`#${CHANGE_LANGUAGE_NAVBAR_ID}`)
      .click()
    await enLanguageSelector.waitFor()
    await enLanguageSelector.click()

    expect(
      (await tableHeadersSelector.allInnerTexts())
        .join()
        .replaceAll(/\s+/g, '')
    ).toEqual(englishHeaders)
  })

  test('change language on the repositories site', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page
      .locator(`#${REPOSITORIES_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repositories')

    const englishHeaders = 'NamePublishedActions'
    const polishHeaders = 'NazwaOpublikowanoAkcje'

    const plLanguageSelector = page.locator(
      `#${POLISH_LANGUAGE_ID}`
    )

    const enLanguageSelector = page.locator(
      `#${ENGLISH_LANGUAGE_ID}`
    )

    const tableHeadersSelector = page.locator('thead')
    await tableHeadersSelector.waitFor()
    expect(
      (await tableHeadersSelector.allInnerTexts())
        .join()
        .replaceAll(/\s+/g, '')
    ).toEqual(englishHeaders)

    await page
      .locator(`#${CHANGE_LANGUAGE_NAVBAR_ID}`)
      .click()

    await plLanguageSelector.waitFor()
    await plLanguageSelector.click()

    expect(
      (await tableHeadersSelector.allInnerTexts())
        .join()
        .replaceAll(/\s+/g, '')
    ).toEqual(polishHeaders)

    await page
      .locator(`#${CHANGE_LANGUAGE_NAVBAR_ID}`)
      .click()
    await enLanguageSelector.waitFor()
    await enLanguageSelector.click()

    expect(
      (await tableHeadersSelector.allInnerTexts())
        .join()
        .replaceAll(/\s+/g, '')
    ).toEqual(englishHeaders)
  })

  test('change language on the repository maintainers site', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page
      .locator(`#${REPOSITORY_MAINTAINERS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/repository-maintainers')

    const englishHeaders =
      'MaintainerRepositoryTechnologyActions'
    const polishHeaders =
      'OpiekunRepozytoriumTechnologiaAkcje'

    const plLanguageSelector = page.locator(
      `#${POLISH_LANGUAGE_ID}`
    )

    const enLanguageSelector = page.locator(
      `#${ENGLISH_LANGUAGE_ID}`
    )

    const tableHeadersSelector = page.locator('thead')
    await tableHeadersSelector.waitFor()
    expect(
      (await tableHeadersSelector.allInnerTexts())
        .join()
        .replaceAll(/\s+/g, '')
    ).toEqual(englishHeaders)

    await page
      .locator(`#${CHANGE_LANGUAGE_NAVBAR_ID}`)
      .click()

    await plLanguageSelector.waitFor()
    await plLanguageSelector.click()

    expect(
      (await tableHeadersSelector.allInnerTexts())
        .join()
        .replaceAll(/\s+/g, '')
    ).toEqual(polishHeaders)

    await page
      .locator(`#${CHANGE_LANGUAGE_NAVBAR_ID}`)
      .click()
    await enLanguageSelector.waitFor()
    await enLanguageSelector.click()

    expect(
      (await tableHeadersSelector.allInnerTexts())
        .join()
        .replaceAll(/\s+/g, '')
    ).toEqual(englishHeaders)
  })

  test('change language on the submissions site', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page.locator(`#${SUBMISSIONS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/submissions')

    const englishHeaders =
      'PackageRepositoryDateSubmitterApproverStatusActions'
    const polishHeaders =
      'PakietRepozytoriumDataZgłaszającyZatwierdzającyStatusAkcje'

    const plLanguageSelector = page.locator(
      `#${POLISH_LANGUAGE_ID}`
    )

    const enLanguageSelector = page.locator(
      `#${ENGLISH_LANGUAGE_ID}`
    )

    const tableHeadersSelector = page.locator('thead')
    await tableHeadersSelector.waitFor()
    expect(
      (await tableHeadersSelector.allInnerTexts())
        .join()
        .replaceAll(/\s+/g, '')
    ).toEqual(englishHeaders)

    await page
      .locator(`#${CHANGE_LANGUAGE_NAVBAR_ID}`)
      .click()

    await plLanguageSelector.waitFor()
    await plLanguageSelector.click()

    expect(
      (await tableHeadersSelector.allInnerTexts())
        .join()
        .replaceAll(/\s+/g, '')
    ).toEqual(polishHeaders)

    await page
      .locator(`#${CHANGE_LANGUAGE_NAVBAR_ID}`)
      .click()
    await enLanguageSelector.waitFor()
    await enLanguageSelector.click()

    expect(
      (await tableHeadersSelector.allInnerTexts())
        .join()
        .replaceAll(/\s+/g, '')
    ).toEqual(englishHeaders)
  })

  test('change language on the users site', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page.locator(`#${USERS_SIDEBAR_ID}`).click()
    await page.waitForURL('**/users')

    const englishHeaders =
      'UsernameDisplaynameEmailRoleActiveActions'
    const polishHeaders =
      'NazwaużytkownikaUżytkownikEmailRolaAktywnyAkcje'

    const plLanguageSelector = page.locator(
      `#${POLISH_LANGUAGE_ID}`
    )

    const enLanguageSelector = page.locator(
      `#${ENGLISH_LANGUAGE_ID}`
    )

    const tableHeadersSelector = page.locator('thead')
    await tableHeadersSelector.waitFor()
    expect(
      (await tableHeadersSelector.allInnerTexts())
        .join()
        .replaceAll(/\s+/g, '')
    ).toEqual(englishHeaders)

    await page
      .locator(`#${CHANGE_LANGUAGE_NAVBAR_ID}`)
      .click()

    await plLanguageSelector.waitFor()
    await plLanguageSelector.click()

    expect(
      (await tableHeadersSelector.allInnerTexts())
        .join()
        .replaceAll(/\s+/g, '')
    ).toEqual(polishHeaders)

    await page
      .locator(`#${CHANGE_LANGUAGE_NAVBAR_ID}`)
      .click()
    await enLanguageSelector.waitFor()
    await enLanguageSelector.click()

    expect(
      (await tableHeadersSelector.allInnerTexts())
        .join()
        .replaceAll(/\s+/g, '')
    ).toEqual(englishHeaders)
  })

  test('change language on the token s site', async ({
    page
  }) => {
    await login(page, 'einstein')
    await page
      .locator(`#${SETTINGS_LIST_SIDEBAR_ID}`)
      .click()
    await page
      .locator(`#${ACCESS_TOKENS_SIDEBAR_ID}`)
      .click()
    await page.waitForURL('**/settings-tokens')

    const englishHeaders =
      'NameUserLastusedCreationdateExpirationdateActiveActions'
    const polishHeaders =
      'NazwaUżytkownikOstatnioużytyDatautworzeniaDatawygaśnięciaAktywnyAkcje'

    const plLanguageSelector = page.locator(
      `#${POLISH_LANGUAGE_ID}`
    )

    const enLanguageSelector = page.locator(
      `#${ENGLISH_LANGUAGE_ID}`
    )

    const tableHeadersSelector = page.locator('thead')
    await tableHeadersSelector.waitFor()
    expect(
      (await tableHeadersSelector.allInnerTexts())
        .join()
        .replaceAll(/\s+/g, '')
    ).toEqual(englishHeaders)

    await page
      .locator(`#${CHANGE_LANGUAGE_NAVBAR_ID}`)
      .click()

    await plLanguageSelector.waitFor()
    await plLanguageSelector.click()

    expect(
      (await tableHeadersSelector.allInnerTexts())
        .join()
        .replaceAll(/\s+/g, '')
    ).toEqual(polishHeaders)

    await page
      .locator(`#${CHANGE_LANGUAGE_NAVBAR_ID}`)
      .click()
    await enLanguageSelector.waitFor()
    await enLanguageSelector.click()

    expect(
      (await tableHeadersSelector.allInnerTexts())
        .join()
        .replaceAll(/\s+/g, '')
    ).toEqual(englishHeaders)
  })
})
