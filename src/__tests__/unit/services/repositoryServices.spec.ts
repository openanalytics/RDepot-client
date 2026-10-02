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

import { createPinia, setActivePinia } from 'pinia'
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest'
import { Technologies } from '@/enum/Technologies'
import { useAuthorizationStore } from '@/store/options/authorization'
import { openApiRequest } from '@/services/openApiAccess'
import {
  deleteRepositoryService,
  publishRepositoryService,
  republishRepositoryService,
  unpublishRepositoryService,
  updateRRepositoryService
} from '@/services/repositoryServices'

vi.mock('@/services/openApiAccess', () => ({
  openApiRequest: vi.fn(() => Promise.resolve(true)),
  validateRequest: vi.fn()
}))

describe('republishRepositoryService', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('republishes an R repository', async () => {
    await republishRepositoryService(
      1,
      Technologies.enum.R,
      ['repository.republish']
    )

    expect(openApiRequest).toHaveBeenCalledOnce()
    const [callback, parameters] =
      vi.mocked(openApiRequest).mock.calls[0]
    expect(callback.name).toBe('republishRRepository')
    expect(parameters).toEqual([1])
  })

  it('republishes a Python repository', async () => {
    await republishRepositoryService(
      2,
      Technologies.enum.Python,
      ['repository.republish']
    )

    expect(openApiRequest).toHaveBeenCalledOnce()
    const [callback, parameters] =
      vi.mocked(openApiRequest).mock.calls[0]
    expect(callback.name).toBe('republishRRepository1')
    expect(parameters).toEqual([2])
  })

  it('does not need repository.create', async () => {
    useAuthorizationStore().me.permissions = []

    await republishRepositoryService(
      1,
      Technologies.enum.R,
      ['repository.republish']
    )

    expect(openApiRequest).toHaveBeenCalledOnce()
  })

  it.each([
    ['without repository.republish', ['repository.edit']],
    ['without permissions', undefined]
  ])('does not republish %s', async (_, permissions) => {
    useAuthorizationStore().me.permissions = [
      'repository.create',
      'repository.republish'
    ]

    republishRepositoryService(
      1,
      Technologies.enum.R,
      permissions
    )
    await new Promise((resolve) => setTimeout(resolve))

    expect(openApiRequest).not.toHaveBeenCalled()
  })
})

describe.each([
  {
    name: 'publishRepositoryService',
    service: publishRepositoryService,
    permission: 'repository.publish',
    opposite: 'repository.unpublish',
    published: true
  },
  {
    name: 'unpublishRepositoryService',
    service: unpublishRepositoryService,
    permission: 'repository.unpublish',
    opposite: 'repository.publish',
    published: false
  }
])(
  '$name',
  ({ service, permission, opposite, published }) => {
    beforeEach(() => {
      setActivePinia(createPinia())
    })

    afterEach(() => {
      vi.clearAllMocks()
    })

    it.each([
      [Technologies.enum.R, 'updateRRepository'],
      [Technologies.enum.Python, 'updatePythonRepository']
    ])(
      'patches only the published flag of %s repository',
      async (technology, endpoint) => {
        await service({
          id: 1,
          name: 'repo',
          technology,
          published: !published,
          permissions: [permission]
        })

        expect(openApiRequest).toHaveBeenCalledOnce()
        const [callback, parameters] =
          vi.mocked(openApiRequest).mock.calls[0]
        expect(callback.name).toBe(endpoint)
        expect(parameters).toEqual([
          1,
          [
            {
              op: 'replace',
              path: '/published',
              value: published
            }
          ]
        ])
      }
    )

    it.each([
      ['with only repository.edit', ['repository.edit']],
      [`with only ${opposite}`, [opposite]],
      ['without permissions', undefined]
    ])('does not change it %s', async (_, permissions) => {
      service({
        id: 1,
        technology: Technologies.enum.R,
        permissions
      })
      await new Promise((resolve) => setTimeout(resolve))

      expect(openApiRequest).not.toHaveBeenCalled()
    })
  }
)

describe('updateRRepositoryService', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('sends the edit form changes with repository.edit', async () => {
    await updateRRepositoryService(
      {
        id: 1,
        name: 'old',
        technology: Technologies.enum.R,
        permissions: ['repository.edit']
      },
      {
        id: 1,
        name: 'new',
        technology: Technologies.enum.R,
        permissions: ['repository.edit']
      }
    )

    expect(openApiRequest).toHaveBeenCalledOnce()
    const [callback, parameters] =
      vi.mocked(openApiRequest).mock.calls[0]
    expect(callback.name).toBe('updateRRepository')
    expect(parameters).toEqual([
      1,
      [{ op: 'replace', path: '/name', value: 'new' }]
    ])
  })

  it.each([
    [
      'with only repository.publish',
      ['repository.publish']
    ],
    [
      'with only repository.delete.soft',
      ['repository.delete.soft']
    ],
    ['without permissions', undefined]
  ])('does not call the API %s', async (_, permissions) => {
    updateRRepositoryService(
      {
        id: 1,
        name: 'old',
        technology: Technologies.enum.R,
        permissions
      },
      {
        id: 1,
        name: 'new',
        technology: Technologies.enum.R,
        permissions
      }
    )
    await new Promise((resolve) => setTimeout(resolve))

    expect(openApiRequest).not.toHaveBeenCalled()
  })
})

describe('deleteRepositoryService', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('soft-deletes with repository.delete.soft', async () => {
    await deleteRepositoryService({
      id: 1,
      technology: Technologies.enum.Python,
      permissions: ['repository.delete.soft']
    })

    expect(openApiRequest).toHaveBeenCalledOnce()
    const [callback, parameters] =
      vi.mocked(openApiRequest).mock.calls[0]
    expect(callback.name).toBe('updatePythonRepository')
    expect(parameters).toEqual([
      1,
      [{ op: 'replace', path: '/deleted', value: true }]
    ])
  })

  it.each([
    ['with only repository.edit', ['repository.edit']],
    ['without permissions', undefined]
  ])('does not call the API %s', async (_, permissions) => {
    deleteRepositoryService({
      id: 1,
      technology: Technologies.enum.R,
      permissions
    })
    await new Promise((resolve) => setTimeout(resolve))

    expect(openApiRequest).not.toHaveBeenCalled()
  })
})
