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
import { SubmissionsFiltration } from '@/models/Filtration'
import FiltrationChips from '@/components/common/chips/FiltrationChips.vue'
import SubmissionsFiltrationChips from '@/components/submissions/SubmissionsFiltrationChips.vue'
import { useSubmissionStore } from '@/store/submission'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}
let submissions_store: any

const example_submission_filtration =
  SubmissionsFiltration.parse({
    state: 'ACCEPTED',
    package: 'accured',
    assignedToMe: true
  })

beforeAll(() => {
  global.ResizeObserver = ResizeObserver
})

beforeEach(async () => {
  setActivePinia(createPinia())
  submissions_store = useSubmissionStore()
  submissions_store.setFiltration(
    example_submission_filtration
  )
  wrapper = mount(SubmissionsFiltrationChips, {
    global: globalConfig
  })
})

describe('Submissions - chips', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('show chips', () => {
    expect(
      wrapper.findComponent(FiltrationChips).isVisible()
    ).toBe(true)
  })

  it('click on chip causes filtration update', async () => {
    const stateChip = wrapper.find('#state')
    const packageNameChip = wrapper.find('#package_name')
    const assignedToMeChip = wrapper.find('#assigned_to_me')

    expect(stateChip.isVisible()).toBeTruthy()
    expect(packageNameChip.isVisible()).toBeTruthy()
    expect(assignedToMeChip.isVisible()).toBeTruthy()

    await stateChip.trigger('click')
    await packageNameChip.trigger('click')
    await assignedToMeChip.trigger('click')

    expect(submissions_store.filtration.state).toBe(
      undefined
    )
    expect(submissions_store.filtration.package).toBe(
      undefined
    )
    expect(submissions_store.filtration.assignedToMe).toBe(
      false
    )
  })
})
