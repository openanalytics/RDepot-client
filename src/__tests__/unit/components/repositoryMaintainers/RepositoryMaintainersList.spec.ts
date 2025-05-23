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
import { useRepositoryMaintainersStore } from '@/store/options/repositoryMaintainers'
import RepositoryMaintainersListVue from '@/components/repositoryMaintainers/RepositoryMaintainersList.vue'
import maintainers from '@/__tests__/config/mockData/repositoryMaintainers.json'
import { useAuthorizationStore } from '@/store/options/authorization'
import me from '@/__tests__/config/mockData/me.json'
import { nextTick } from 'vue'
import { i18n } from '@/plugins/i18n'

let wrapper: any
let repositoryMaintainersStore: any
let authorizationStore: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

beforeEach(async () => {
  setActivePinia(createPinia())
  repositoryMaintainersStore =
    useRepositoryMaintainersStore()
  authorizationStore = useAuthorizationStore()
  authorizationStore.me = me.data
  await nextTick(() => {})
  wrapper = mount(RepositoryMaintainersListVue, {
    global: globalConfig
  })

  repositoryMaintainersStore.maintainers =
    maintainers.data.content
  repositoryMaintainersStore.loading = false
})

describe('Repository Maintainers - list', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays data-table', async () => {
    const dataTable = wrapper.findComponent('.v-data-table')
    expect(dataTable.exists()).toBeTruthy()
  })

  it('displays one row per each maintainer', async () => {
    const maintainersRow = wrapper.findAllComponents('tr')
    expect(maintainersRow.length).toEqual(
      maintainers.data.content.length
    )
  })

  it('displays no data available text', async () => {
    repositoryMaintainersStore.maintainers = []
    await nextTick()
    expect(wrapper.text()).toContain(
      'datatable.noDataAvailable'
    )
    expect(wrapper.findAllComponents('tr').length).toEqual(
      1
    )
  })
})

describe('Repository  maintainers - list headers', () => {
  let headers: any
  beforeAll(() => {
    headers = wrapper.findAllComponents('th')
  })

  it('displays all headers', () => {
    expect(headers.length).toEqual(4)
  })

  it('displays maintainer column', () => {
    const col = headers[0]
    expect(col.text()).toEqual(
      i18n.t('columns.repositoryMaintainer.name')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })

  it('displays repository column', () => {
    const col = headers[1]
    expect(col.text()).toEqual(
      i18n.t('columns.repositoryMaintainer.repository')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })

  it('displays technology column', () => {
    const col = headers[2]
    expect(col.text()).toEqual(
      i18n.t('columns.repositoryMaintainer.technology')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })

  it('displays actions column', () => {
    const col = headers[3]
    expect(col.text()).toEqual(i18n.t('columns.actions'))
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeFalsy()
  })
})

describe('Repository Maintainers - cells', () => {
  let cells: any
  const maintainer = maintainers.data.content[0]

  beforeAll(() => {
    cells = wrapper
      .findAllComponents('tr')[0]
      .findAllComponents('td')
  })

  it('displays maintainer name', () => {
    const cell = cells[0]
    expect(cell.text()).toBe(maintainer.user.name)
  })

  it('displays repository name', () => {
    const cell = cells[1]
    expect(cell.text()).toBe(maintainer.repository.name)
  })

  it('displays technology', () => {
    const cell = cells[2]
    const chip = cell.findComponent('.v-chip')
    expect(chip.exists()).toBeTruthy()
    expect(chip.text()).toBe(
      maintainer.repository.technology
    )
  })

  it('display delete action', () => {
    const cell = cells[3]
    expect(cell.find('#delete-icon').exists()).toBeTruthy()
  })

  it('display edit action', () => {
    const cell = cells[3]
    expect(
      cell
        .find(
          '#edit-repository-maintainer-Albert-Einstein-testrepo10'
        )
        .exists()
    ).toBeTruthy()
  })
})
