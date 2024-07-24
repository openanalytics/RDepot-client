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
  expect,
  beforeEach,
  beforeAll
} from 'vitest'

import { mount } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import { createPinia, setActivePinia } from 'pinia'
import { useSubmissionStore } from '@/store/submission'
import SubmissionsListVue from '@/components/submissions/SubmissionsList.vue'
import submissions from '@/__tests__/config/mockData/rSubmissions.json'
import { useAuthorizationStore } from '@/store/authorization'
import me from '@/__tests__/config/mockData/me.json'
import { nextTick } from 'vue'
import { i18n } from '@/plugins/i18n'
import { useDates } from '@/composable/date'

const { formatDate } = useDates()
let wrapper: any
let submissionStore: any
let authorizationStore: any

const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
beforeAll(() => {
  setActivePinia(createPinia())
  submissionStore = useSubmissionStore()
  authorizationStore = useAuthorizationStore()
  authorizationStore.me = me.data
})

beforeEach(async () => {
  wrapper = mount(SubmissionsListVue, {
    global: globalConfig
  })
  submissionStore.submissions = submissions.data.content
  submissionStore.loading = false
})

describe('Submissions - list', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays data-table', async () => {
    const dataTable = wrapper.findComponent('.v-data-table')
    expect(dataTable.exists()).toBeTruthy()
  })

  it('displays one row per each repository', async () => {
    const submissionsRows = wrapper.findAllComponents('tr')
    expect(submissionsRows.length).toEqual(
      submissions.data.content.length
    )
  })

  it('displays no data available text', async () => {
    submissionStore.submissions = []
    await nextTick()
    expect(wrapper.text()).toContain('No data available')
    expect(wrapper.findAllComponents('tr').length).toEqual(
      1
    )
  })
})

describe('Submissions - list headers', () => {
  let headers: any
  beforeAll(() => {
    headers = wrapper.findAllComponents('th')
  })

  it('displays all headers', () => {
    expect(headers.length).toEqual(9)
  })
  it('displays date column', () => {
    const col = headers[0]
    expect(col.text()).toEqual(
      i18n.t('columns.submissions.date')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })

  it('displays package column', () => {
    const col = headers[1]
    expect(col.text()).toEqual(
      i18n.t('columns.submissions.package')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })

  it('displays version column', () => {
    const col = headers[2]
    expect(col.text()).toEqual(
      i18n.t('columns.submissions.packageVersion')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })

  it('displays repository column', () => {
    const col = headers[3]
    expect(col.text()).toEqual(
      i18n.t('columns.submissions.repository')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })

  it('displays submitter column', () => {
    const col = headers[4]
    expect(col.text()).toEqual(
      i18n.t('columns.submissions.submitter')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })

  it('displays approver column', () => {
    const col = headers[5]
    expect(col.text()).toEqual(
      i18n.t('columns.submissions.approver')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })

  it('displays technology column', () => {
    const col = headers[6]
    expect(col.text()).toEqual(
      i18n.t('columns.submissions.technology')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })

  it('displays status column', () => {
    const col = headers[7]
    expect(col.text()).toEqual(
      i18n.t('columns.submissions.status')
    )
    const sortIcon = col.findComponent(
      '.mdi-sort-descending'
    )
    expect(sortIcon.exists()).toBeTruthy()
  })

  it('displays date column', () => {
    const col = headers[8]
    expect(col.text()).toEqual(i18n.t('columns.actions'))
    const sortIcon = col.findComponent(
      '.mdi-sort-ascending'
    )
    expect(sortIcon.exists()).toBeFalsy()
  })
})

describe('Submissions - cells', () => {
  let cells: any
  const submission = submissions.data.content[0]

  beforeAll(() => {
    cells = wrapper
      .findAllComponents('tr')[0]
      .findAllComponents('td')
  })

  it('displays date', () => {
    const cell = cells[0]
    const chip = cell.findComponent('.v-chip')
    expect(chip.exists()).toBeTruthy()
    expect(chip.text()).toBe(
      formatDate(new Date(submission.created))
    )
  })

  it('displays package', () => {
    const cell = cells[1]
    expect(cell.text()).toBe(submission.packageBag.name)
  })

  it('displays version', () => {
    const cell = cells[2]
    expect(cell.text()).toBe(submission.packageBag.version)
  })

  it('displays repository', () => {
    const cell = cells[3]
    expect(cell.text()).toBe(
      submission.packageBag.repository.name
    )
  })

  it('displays submitter', () => {
    const cell = cells[4]
    expect(cell.text()).toBe(submission.submitter.name)
  })

  it('displays approver', () => {
    const cell = cells[5]
    expect(cell.text()).toBe(
      submission.approver?.name || ''
    )
  })

  it('displays technology', () => {
    const cell = cells[6]
    const chip = cell.findComponent('.v-chip')
    expect(chip.exists()).toBeTruthy()
    expect(chip.text()).toBe(
      submission.packageBag.technology
    )
  })

  it('displays status', () => {
    const cell = cells[7]
    const icon = cell.findComponent(
      '.mdi-progress-question'
    )
    expect(icon.exists()).toBeTruthy()
  })

  // it('displays status', () => {
  //   const cell = cells[7]
  //   const icon = cell.findComponent(
  //     '.mdi-progress-question'
  //   )
  //   expect(icon.exists()).toBeTruthy()
  // })

  // it('displays status', () => {
  //   const cell = cells[6]
  //   const icon = cell.findComponent(
  //     '.mdi-progress-question'
  //   )
  //   expect(icon.exists()).toBeTruthy()
  // })

  // it('displays status', () => {
  //   const cell = cells[6]
  //   const icon = cell.findComponent(
  //     '.mdi-progress-question'
  //   )
  //   expect(icon.exists()).toBeTruthy()
  // })

  // it('displays status', () => {
  //   const cell = cells[6]
  //   const icon = cell.findComponent(
  //     '.mdi-progress-question'
  //   )
  //   expect(icon.exists()).toBeTruthy()
  // })

  it('displays accept action', () => {
    const cell = cells[8]
    const button = cell.findComponent('#accept-button-19')
    expect(button.exists()).toBeTruthy()
  })
  it('displays reject action', () => {
    const cell = cells[8]
    const button = cell.findComponent('#reject-button-19')
    expect(button.exists()).toBeTruthy()
  })
})
