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

let wrapper: any
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
  const submission: EntityModelSubmissionDto = JSON.parse(
    JSON.stringify(submissions.data.content[4])
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
    expect(field.text()).toBe('DATE')
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
    const checkbox_active = wrapper.find(
      '#checkbox-accepted'
    )
    expect(checkbox_active.element.checked).toBe(
      submission.state == 'ACCEPTED'
    )
    expect(checkbox_active.element.disabled).toBe(true)
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
  const submission: EntityModelSubmissionDto = JSON.parse(
    JSON.stringify(submissions.data.content[2])
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
    const checkbox_active = wrapper.find(
      '#checkbox-accepted'
    )
    expect(checkbox_active.element.checked).toEqual(
      submission.state == 'ACCEPTED'
    )
    expect(checkbox_active.element.disabled).toBe(true)
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
    expect(field.text()).toBe('DATE')
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
    const checkbox_active = wrapper.find(
      '#checkbox-accepted'
    )
    expect(checkbox_active.exists()).toBe(false)
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
    expect(field.text()).toBe('Columns.date')
  })

  it('package title', () => {
    const field = wrapper.find('#submission-package')
    expect(field.text()).toBe('Columns.package')
  })

  it('repository title', () => {
    const field = wrapper.find('#submission-repository')
    expect(field.text()).toBe('Columns.repository')
  })

  it('submitter title', () => {
    const field = wrapper.find('#submission-submitter')
    expect(field.text()).toBe('Columns.submitter')
  })

  it('approver title', () => {
    const field = wrapper.find('#submission-approver')
    expect(field.text()).toBe('Columns.approver')
  })

  it('technology title', () => {
    const field = wrapper.find('#submission-technology')
    expect(field.text()).toBe('Columns.technology')
  })

  it('accepted title', () => {
    const field = wrapper.find('#submission-accepted')
    const checkbox = wrapper.find('#checkbox-accepted')
    expect(field.text()).toBe('Columns.accepted')
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
