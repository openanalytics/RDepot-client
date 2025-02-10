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
import RepositoriesListVue from '@/components/repositories/RepositoriesList.vue'
import repositories from '@/__tests__/config/mockData/repositories.json'
import { useRepositoryStore } from '@/store/options/repositories'
import { useAuthorizationStore } from '@/store/options/authorization'
import me from '@/__tests__/config/mockData/me.json'
import { nextTick } from 'vue'
import { i18n } from '@/plugins/i18n'
import { DELETE_REPO_2_ICON_ID } from '@/__tests__/end-to-end/helpers/elementsIds'

let wrapper: any
let authorizationStore: any
let repositoriesStore: any

const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

beforeEach(async () => {
  setActivePinia(createPinia())
  authorizationStore = useAuthorizationStore()
  authorizationStore.me = me.data
  repositoriesStore = useRepositoryStore()
  await nextTick(() => {})
  wrapper = mount(RepositoriesListVue, {
    global: globalConfig
  })
  repositoriesStore.loading = false
  repositoriesStore.repositories = repositories.data.content
})

describe('Repositories - list', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays data-table', async () => {
    const dataTable = wrapper.findComponent('.v-data-table')
    expect(dataTable.exists()).toBeTruthy()
  })

  it('displays one row per each repository', async () => {
    const repositoriesRows = wrapper.findAllComponents('tr')
    expect(repositoriesRows.length).toEqual(
      repositories.data.content.length
    )
  })

  it('displays no data available text', async () => {
    repositoriesStore.repositories = []
    await nextTick()
    expect(wrapper.text()).toContain(
      'datatable.noDataAvailable'
    )
    expect(wrapper.findAllComponents('tr').length).toEqual(
      1
    )
  })
})

describe('Repositories - list headers', () => {
  let headers: any

  beforeAll(() => {
    headers = wrapper.findAllComponents('th')
  })

  it('displays all headers', () => {
    expect(headers.length).toEqual(8)
  })
  it('displays repository column', () => {
    const col = headers[0]
    expect(col.text()).toEqual(
      i18n.t('columns.repository.name')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })
  it('displays publication uri column', () => {
    const col = headers[2]
    expect(col.text()).toEqual(
      i18n.t('columns.repository.publicationUri')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })
  it('displays technology column', () => {
    const col = headers[3]
    expect(col.text()).toEqual(
      i18n.t('columns.repository.technology')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })
  it('displays version column', () => {
    const col = headers[4]
    expect(col.text()).toEqual(
      i18n.t('columns.repository.version')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })
  it('displays # packages column', () => {
    const col = headers[5]
    expect(col.text()).toEqual(
      i18n.t('columns.repository.packagesNo')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeFalsy()
  })
  it('displays published column', () => {
    const col = headers[6]
    expect(col.text()).toEqual(
      i18n.t('columns.repository.published')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })

  it('displays actions column', () => {
    const col = headers[7]
    expect(col.text()).toEqual(i18n.t('columns.actions'))
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeFalsy()
  })
})

describe('Repositories - cells', () => {
  let cells: any
  const repository = repositories.data.content[0]

  beforeAll(() => {
    cells = wrapper
      .findAllComponents('tr')[0]
      .findAllComponents('td')
  })

  it('displays repository name', () => {
    const cell = cells[0]
    expect(cell.text()).toBe(repository.name)
  })

  it('displays publication uri', () => {
    const cell = cells[2]
    expect(cell.text()).toBe(repository.publicationUri)
  })

  it('displays technology', () => {
    const cell = cells[3]
    const chip = cell.findComponent('.v-chip')
    expect(chip.exists()).toBeTruthy()
    expect(chip.text()).toBe(repository.technology)
  })

  it('displays version', () => {
    const cell = cells[4]
    expect(cell.text()).toBe(repository.version.toString())
  })

  it('displays # packages', () => {
    const cell = cells[5]
    expect(cell.text()).toBe(
      repository.numberOfPackages.toString()
    )
  })

  it('displays published', () => {
    const cell = cells[6]
    const checkboxPublished = cell.find(
      '#checkbox-published'
    )
    expect(checkboxPublished.element.checked).toEqual(
      repository.published
    )
  })

  it('displays an publication alert', async () => {
    const cell = cells[6]
    const alertIcon = cell.find(
      '#repository-description-publication-status'
    )
    expect(alertIcon.exists()).toBeTruthy()
  })

  it('displays actions', () => {
    const cell = cells[7]
    expect(
      cell.find(`#${DELETE_REPO_2_ICON_ID}`).exists()
    ).toBeTruthy()
    expect(
      cell.find('#delete-repository-icon-2').exists()
    ).toBe(true)
  })
})

describe('Repositories - role based cells', () => {
  let cells: any
  const repository = repositories.data.content[0]

  it('displays serverAddress (repo maintainer))', async () => {
    authorizationStore.userRole = 2
    await nextTick()
    cells = wrapper
      .findAllComponents('tr')[0]
      .findAllComponents('td')
    const cell = cells[3]
    expect(cell.text()).toBe(repository.serverAddress)
  })
  it('!displays serverAddress (package maintainer))', async () => {
    authorizationStore.userRole = 1
    await nextTick()
    cells = wrapper
      .findAllComponents('tr')[0]
      .findAllComponents('td')
    const cell = cells[3]
    expect(cell.text()).not.toBe(repository.serverAddress)
  })
})

describe('Repositories - filtration based cells', () => {
  let cells: any

  it('displays actions column', async () => {
    repositoriesStore.setFiltrationBy({ deleted: false })
    await nextTick()
    cells = wrapper
      .findAllComponents('tr')[0]
      .findAllComponents('td')
    const cell = cells[7]
    expect(
      cell.find(`#${DELETE_REPO_2_ICON_ID}`).exists()
    ).toBeTruthy()
    expect(cells.length).toEqual(8)
  })
  it('!displays action column', async () => {
    repositoriesStore.setFiltrationBy({ deleted: true })
    await nextTick()
    cells = wrapper
      .findAllComponents('tr')[0]
      .findAllComponents('td')
    expect(cells.length).toEqual(7)
  })
})
