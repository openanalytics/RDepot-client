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
import RepositoryMaintainerVue from '@/components/repositoryMaintainers/RepositoryMaintainerRow.vue'
import maintainers from '@/__tests__/config/mockData/repositoryMaintainers.json'
import { EntityModelRepositoryMaintainerDto } from '@/openapi'
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

describe('Repository Maintainers - maintainers row (maintainer)', () => {
  const maintainer: EntityModelRepositoryMaintainerDto =
    JSON.parse(JSON.stringify(maintainers.data.content[0]))
  beforeEach(async () => {
    wrapper = mount(RepositoryMaintainerVue, {
      global: globalConfig,
      props: {
        title: false,
        repositoryMaintainer: maintainer
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('name field', () => {
    const field = wrapper.find(
      '#repository-maintainer-name'
    )
    expect(field.text()).toBe(maintainer.user?.name)
  })

  it('repository field', () => {
    const field = wrapper.find(
      '#repository-maintainer-repository'
    )
    expect(field.text()).toBe(maintainer.repository?.name)
  })

  it('delete button is visiable', () => {
    expect(wrapper.find('#delete-icon').isVisible()).toBe(
      true
    )
  })

  it('edit button is visible', () => {
    expect(wrapper.find('#pencil-icon').isVisible()).toBe(
      true
    )
  })
})

describe('Repository Maintainers - maintainers row (empty)', () => {
  beforeEach(async () => {
    wrapper = mount(RepositoryMaintainerVue, {
      global: globalConfig,
      props: {
        title: false
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('name field', () => {
    const field = wrapper.find(
      '#repository-maintainer-name'
    )
    expect(field.text()).toBe('')
  })

  it('repository field', () => {
    const field = wrapper.find(
      '#repository-maintainer-repository'
    )
    expect(field.text()).toBe('')
  })

  it('delete button not exists', () => {
    expect(wrapper.find('#delete-icon').exists()).toBe(
      false
    )
  })

  it('edit button not exists', () => {
    expect(wrapper.find('#pencil-icon').exists()).toBe(
      false
    )
  })
})

describe('Repository Maintainers - maintainers row (title)', () => {
  beforeEach(async () => {
    wrapper = mount(RepositoryMaintainerVue, {
      global: globalConfig,
      props: {
        title: true
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('name title', () => {
    const field = wrapper.find(
      '#repository-maintainer-name'
    )
    expect(field.text()).toBe('Columns.name')
  })

  it('repository field', () => {
    const field = wrapper.find(
      '#repository-maintainer-repository'
    )
    expect(field.text()).toBe('Columns.repository')
  })

  it('technology field', () => {
    const field = wrapper.find(
      '#repository-maintainer-technology'
    )
    expect(field.text()).toBe('Columns.technology')
  })

  it('actions field', () => {
    const field = wrapper.find(
      '#repository-maintainer-actions'
    )
    expect(field.text()).toBe('Columns.actions')
  })

  it('delete button not exists', () => {
    expect(wrapper.find('#delete-icon').exists()).toBe(
      false
    )
  })

  it('edit button not exists', () => {
    expect(wrapper.find('#pencil-icon').exists()).toBe(
      false
    )
  })
})
