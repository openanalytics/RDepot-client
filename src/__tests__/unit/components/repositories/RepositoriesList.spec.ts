/*
 * R Depot
 *
 * Copyright (C) 2012-2026 Open Analytics NV
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

import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { createPinia, setActivePinia } from 'pinia'
import RepositoriesList from '@/components/repositories/RepositoriesList.vue'
import { useRepositoryStore } from '@/store/options/repositories'

const repositories = [
  {
    id: 1,
    name: 'testrepo1',
    technology: 'R',
    publicationUri: 'http://localhost/repo/testrepo1',
    serverAddress: 'http://localhost/repo/testrepo1',
    published: true,
    permissions: [
      'repository.edit',
      'repository.republish',
      'repository.unpublish'
    ]
  },
  {
    id: 3,
    name: 'testrepo3',
    technology: 'R',
    publicationUri: 'http://localhost/repo/testrepo3',
    serverAddress: 'http://localhost/repo/testrepo3',
    published: false,
    permissions: ['repository.edit', 'repository.publish']
  }
]

async function mountList() {
  const repositoryStore = useRepositoryStore()
  repositoryStore.repositories = repositories as any
  repositoryStore.totalNumber = repositories.length
  const wrapper = mount(RepositoriesList as any, {
    global: { plugins: plugins }
  })
  await new Promise((resolve) => setTimeout(resolve, 50))
  return wrapper
}

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('RepositoriesList', () => {
  it('enables the published checkbox for published and unpublished repositories', async () => {
    const wrapper = await mountList()

    const checkboxes = wrapper.findAll(
      '.v-selection-control'
    )
    expect(checkboxes.length).toBe(repositories.length)
    checkboxes.forEach((checkbox) =>
      expect(
        checkbox.classes('v-selection-control--disabled')
      ).toBe(false)
    )
  })

  it('disables the published checkbox without the matching permission', async () => {
    const repositoryStore = useRepositoryStore()
    repositoryStore.repositories = [
      {
        ...repositories[0],
        permissions: ['repository.publish']
      },
      {
        ...repositories[1],
        permissions: ['repository.unpublish']
      }
    ] as any
    repositoryStore.totalNumber = 2
    const wrapper = mount(RepositoriesList as any, {
      global: { plugins: plugins }
    })
    await new Promise((resolve) => setTimeout(resolve, 50))

    wrapper
      .findAll('.v-selection-control')
      .forEach((checkbox) =>
        expect(
          checkbox.classes('v-selection-control--disabled')
        ).toBe(true)
      )
  })

  it('does not expand the row when the published checkbox is clicked', async () => {
    const wrapper = await mountList()

    await wrapper
      .findAll('.v-selection-control')[1]
      .trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 50))

    expect(wrapper.find('.additional-row').exists()).toBe(
      false
    )
  })
})
