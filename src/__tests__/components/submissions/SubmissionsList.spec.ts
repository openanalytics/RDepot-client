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
import { ResizeObserver } from '@/__tests__/config/ResizeObserver'
import { createPinia, setActivePinia } from 'pinia'
import { useSubmissionStore } from '@/store/submission'
import SubmissionsListVue from '@/components/submissions/SubmissionList.vue'
import SubmissionRowVue from '@/components/submissions/SubmissionRow.vue'
import submissions from '@/__tests__/config/mockData/rSubmissions.json'

let wrapper: any
let submission_store: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
beforeAll(() => {
  global.ResizeObserver = ResizeObserver
  setActivePinia(createPinia())
  submission_store = useSubmissionStore()
})

beforeEach(async () => {
  wrapper = mount(SubmissionsListVue, {
    global: globalConfig
  })
  submission_store.submissions = submissions.data.content
})

describe('Submissions - list', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays one row for each submission + one for title', async () => {
    const packagesFromWrapper = wrapper.findAllComponents(
      SubmissionRowVue
    )

    expect(packagesFromWrapper.length).toEqual(
      submissions.data.content.length + 1
    )
  })
})
