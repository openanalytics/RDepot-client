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

import { mount, config } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import { ResizeObserver } from '@/__tests__/config/ResizeObserver'
import SubmissionRowVue from '@/components/submissions/SubmissionRow.vue'
import submissions from '@/__tests__/config/mockData/rSubmissions.json'
import { EntityModelSubmissionDto } from '@/openapi'
import { createPinia, setActivePinia } from 'pinia'
import { useUtilities } from '@/composable/utilities'

let wrapper: any
const { deepCopyAny } = useUtilities()
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
beforeAll(() => {
  global.ResizeObserver = ResizeObserver
  config.global.renderStubDefaultSlot = true
  setActivePinia(createPinia())
})

describe('Submissions - submission row (ACCEPTED)', () => {
  const submission: EntityModelSubmissionDto = deepCopyAny(
    submissions.data.content[4]
  )
  beforeEach(async () => {
    wrapper = mount(SubmissionRowVue, {
      global: globalConfig,
      props: {
        title: false,
        submission: submission
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('date field', () => {
    const field = wrapper.find('#submission-date')
    expect(field.text()).toEqual('2023-07-23')
  })

  it('package field', () => {
    const field = wrapper.find('#submission-package')
    expect(field.text()).toBe(submission.packageBag?.name)
  })

  it('repository field', () => {
    const field = wrapper.find('#submission-repository')
    expect(field.text()).toBe(
      submission.packageBag?.repository?.name
    )
  })

  it('submitter field', () => {
    const field = wrapper.find('#submission-submitter')
    expect(field.text()).toBe(submission.submitter?.name)
  })

  it('approver field', () => {
    const field = wrapper.find('#submission-approver')
    expect(field.text()).toBe(submission.approver?.name)
  })

  it('accepted field', () => {
    const iconActive = wrapper
      .find('#tooltip-activator')
      .find('i')
    expect(
      iconActive.classes('mdi-check-circle-outline')
    ).toBe(true)
  })

  it('accept button not exists', () => {
    expect(wrapper.find('#accept-button').exists()).toBe(
      false
    )
  })

  it('cancel button not exists', () => {
    expect(wrapper.find('#cancel-button').exists()).toBe(
      false
    )
  })
})

describe('Submissions - submission row (WAITING)', () => {
  const submission: EntityModelSubmissionDto = deepCopyAny(
    submissions.data.content[2]
  )
  beforeEach(async () => {
    wrapper = mount(SubmissionRowVue, {
      global: globalConfig,
      props: {
        title: false,
        submission: submission
      }
    })
  })

  it('accepted field', () => {
    const iconActive = wrapper
      .find('#tooltip-activator')
      .find('i')
    expect(
      iconActive.classes('mdi-progress-question')
    ).toBe(true)
  })

  it('accept button is visible', () => {
    expect(wrapper.find('#accept-button').isVisible()).toBe(
      true
    )
  })

  it('cancel button is visible', () => {
    expect(wrapper.find('#reject-button').isVisible()).toBe(
      true
    )
  })
})

describe('Submissions - submission row (empty)', () => {
  beforeEach(async () => {
    wrapper = mount(SubmissionRowVue, {
      global: globalConfig,
      props: {
        title: false
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('date field', () => {
    const field = wrapper.find('#submission-date')
    expect(field.text().length).toEqual(0)
  })

  it('package field', () => {
    const field = wrapper.find('#submission-package')
    expect(field.text()).toBe('')
  })

  it('repository field', () => {
    const field = wrapper.find('#submission-repository')
    expect(field.text()).toBe('')
  })

  it('submitter field', () => {
    const field = wrapper.find('#submission-submitter')
    expect(field.text()).toBe('')
  })

  it('approver field', () => {
    const field = wrapper.find('#submission-approver')
    expect(field.text()).toBe('')
  })

  it('accepted field (checkbox)', () => {
    const checkboxActive = wrapper.find(
      '#checkbox-accepted'
    )
    expect(checkboxActive.exists()).toBe(false)
  })

  it('accept button not exists', () => {
    expect(wrapper.find('#accept-button').exists()).toBe(
      false
    )
  })

  it('cancel button not exists', () => {
    expect(wrapper.find('#cancel-button').exists()).toBe(
      false
    )
  })
})

describe('Submissions - submission row (title)', () => {
  beforeEach(async () => {
    wrapper = mount(SubmissionRowVue, {
      global: globalConfig,
      props: {
        title: true
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('date title', () => {
    const field = wrapper.find('#submission-date')
    expect(field.text()).toBe('Columns.submissions.date')
  })

  it('package title', () => {
    const field = wrapper.find('#submission-package')
    expect(field.text()).toBe('Columns.submissions.package')
  })

  it('repository title', () => {
    const field = wrapper.find('#submission-repository')
    expect(field.text()).toBe(
      'Columns.submissions.repository'
    )
  })

  it('submitter title', () => {
    const field = wrapper.find('#submission-submitter')
    expect(field.text()).toBe(
      'Columns.submissions.submitter'
    )
  })

  it('approver title', () => {
    const field = wrapper.find('#submission-approver')
    expect(field.text()).toBe(
      'Columns.submissions.approver'
    )
  })

  it('technology title', () => {
    const field = wrapper.find('#submission-technology')
    expect(field.text()).toBe(
      'Columns.submissions.technology'
    )
  })

  it('accepted title', () => {
    const field = wrapper.find('#submission-accepted')
    const checkbox = wrapper.find('#checkbox-accepted')
    expect(field.text()).toBe(
      'Columns.submissions.accepted'
    )
    expect(checkbox.exists()).toBe(false)
  })

  it('actions title', () => {
    const field = wrapper.find('#submission-actions')
    expect(field.text()).toBe('Columns.actions')
  })

  it('accept button not exists', () => {
    expect(wrapper.find('#accept-button').exists()).toBe(
      false
    )
  })

  it('cancel button not exists', () => {
    expect(wrapper.find('#cancel-button').exists()).toBe(
      false
    )
  })
})
