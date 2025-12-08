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
  DUTCH_LANGUAGE_ID,
  ENGLISH_LANGUAGE_ID,
  GERMAN_LANGUAGE_ID,
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

  test('change language to polish', async ({ page }) => {
    await login(page, 'einstein')

    const plLanguageSelector = page.locator(
      `#${POLISH_LANGUAGE_ID}`
    )

    await page
      .locator(`#${CHANGE_LANGUAGE_NAVBAR_ID}`)
      .click()

    await plLanguageSelector.waitFor()
    await plLanguageSelector.click()
    await expect(
      page.locator('.Toastify__toast--success')
    ).toHaveCount(1)
  })

  test('change language to deutsch', async ({ page }) => {
    await login(page, 'einstein')

    const deLanguageSelector = page.locator(
      `#${GERMAN_LANGUAGE_ID}`
    )
    await page
      .locator(`#${CHANGE_LANGUAGE_NAVBAR_ID}`)
      .click()

    await deLanguageSelector.waitFor()
    await deLanguageSelector.click()
    await expect(
      page.locator('.Toastify__toast--success')
    ).toHaveCount(1)
  })

  test('change language to dutch', async ({ page }) => {
    await login(page, 'einstein')

    const nlLanguageSelector = page.locator(
      `#${DUTCH_LANGUAGE_ID}`
    )

    await page
      .locator(`#${CHANGE_LANGUAGE_NAVBAR_ID}`)
      .click()

    await nlLanguageSelector.waitFor()
    await nlLanguageSelector.click()
    await expect(
      page.locator('.Toastify__toast--success')
    ).toHaveCount(1)
  })

  test('change language to english', async ({ page }) => {
    await login(page, 'einstein')
    const enLanguageSelector = page.locator(
      `#${ENGLISH_LANGUAGE_ID}`
    )

    await page
      .locator(`#${CHANGE_LANGUAGE_NAVBAR_ID}`)
      .click()

    await enLanguageSelector.waitFor()
    await enLanguageSelector.click()
    await expect(
      page.locator('.Toastify__toast--success')
    ).toHaveCount(1)
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
      'NamePackageRepositoryTechnologyActions'
    const polishHeaders =
      'NazwaPakietRepozytoriumTechnologiaAkcje'

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
    const polishHeaders = 'NazwaOpublikowaneAkcje'

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

    const englishHeaders = 'NameRepositoryTechnologyActions'
    const polishHeaders =
      'NazwaRepozytoriumTechnologiaAkcje'

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
      'PackageTypeRepositoryDateSubmitterApproverStatusActions'
    const polishHeaders =
      'PakietTypplikuRepozytoriumDataZgłaszającyZatwierdzającyStatusAkcje'

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

  test('change language on the tokens site', async ({
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
      'NameUserLastusedCreatedonExpirationdateActiveActions'
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
