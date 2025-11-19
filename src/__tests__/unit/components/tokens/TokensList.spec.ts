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

import {
  describe,
  it,
  expect,
  beforeEach,
  beforeAll
} from 'vitest'

import { mount } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import { createPinia, setActivePinia } from 'pinia'
import tokens from '@/__tests__/config/mockData/tokens.json'
import { useAuthorizationStore } from '@/store/options/authorization'
import me from '@/__tests__/config/mockData/me.json'
import { i18n } from '@/plugins/i18n'
import TokensList from '@/components/accessTokens/TokensList.vue'
import { useAccessTokensStore } from '@/store/options/accessTokens'
import { useDates } from '@/composable/date'

const { formatDate } = useDates()
let wrapper: any
let authorizationStore: any
let accessTokensStore: any
let headers: any

const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

beforeAll(() => {
  setActivePinia(createPinia())
  accessTokensStore = useAccessTokensStore()
  authorizationStore = useAuthorizationStore()
  authorizationStore.me = me.data
})

beforeEach(async () => {
  wrapper = mount(TokensList, {
    global: globalConfig
  })
  accessTokensStore.tokens = tokens.data.content
  accessTokensStore.loading = false
  headers = wrapper.findAllComponents('th')
})

describe('Tokens - list headers', () => {
  it('displays all headers', () => {
    expect(headers.length).toEqual(6)
  })
  it('displays name columns', () => {
    const col = headers[0]
    expect(col.text()).toEqual(i18n.t('forms.general.name'))
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })
  it('displays creation date column', () => {
    const col = headers[2]
    expect(col.text()).toEqual(
      i18n.t('fields.general.createdOn')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })
  it('displays expiration date column', () => {
    const col = headers[3]
    expect(col.text()).toEqual(
      i18n.t('fields.tokens.expirationDate')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })
  it('displays active column', () => {
    const col = headers[4]
    expect(col.text()).toEqual(
      i18n.t('properties.general.active')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })
  it('displays actions column', () => {
    const col = headers[5]
    expect(col.text()).toEqual(
      i18n.t('fields.general.actions')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeFalsy()
  })
})

describe('Tokens - cells', () => {
  let cells: any
  const token = tokens.data.content[0]

  beforeAll(() => {
    cells = wrapper
      .findAllComponents('tr')[0]
      .findAllComponents('td')
  })

  it('displays token name', () => {
    const cell = cells[0]
    expect(cell.text()).toBe(token.name)
  })

  it('displays creation date', () => {
    const cell = cells[2]
    const chip = cell.findComponent('.v-chip')
    expect(chip.exists()).toBeTruthy()
    expect(chip.text()).toBe(
      formatDate(new Date(token.creationDate))
    )
  })

  it('displays expiration date', () => {
    const cell = cells[3]
    const chip = cell.findComponent('.v-chip')
    expect(chip.exists()).toBeTruthy()
    expect(chip.text()).toBe(
      formatDate(new Date(token.expirationDate))
    )
  })

  it('displays active', () => {
    const cell = cells[4]
    const activeIcon = cell.find(
      '.mdi-check-circle-outline'
    )
    expect(activeIcon.exists()).toBeTruthy()
  })

  it('displays edit icon', () => {
    const cell = cells[5]
    expect(cell.find('#pencil-icon').exists()).toBe(true)
  })

  it('displays delete icon', () => {
    const cell = cells[5]
    expect(cell.find('#delete-icon').exists()).toBe(true)
  })
})
