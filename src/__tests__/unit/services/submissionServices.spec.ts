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
import { openApiRequest } from '@/services/openApiAccess'
import {
  acceptSubmissionService,
  cancelSubmissionService,
  rejectSubmissionService
} from '@/services/submissionServices'

vi.mock('@/services/openApiAccess', () => ({
  openApiRequest: vi.fn(() => Promise.resolve(true)),
  validateRequest: vi.fn()
}))

describe.each([
  {
    name: 'acceptSubmissionService',
    service: acceptSubmissionService,
    permission: 'submission.accept',
    others: ['submission.reject', 'submission.cancel'],
    state: 'ACCEPTED'
  },
  {
    name: 'rejectSubmissionService',
    service: rejectSubmissionService,
    permission: 'submission.reject',
    others: ['submission.accept', 'submission.cancel'],
    state: 'REJECTED'
  },
  {
    name: 'cancelSubmissionService',
    service: cancelSubmissionService,
    permission: 'submission.cancel',
    others: ['submission.accept', 'submission.reject'],
    state: 'CANCELLED'
  }
])('$name', ({ service, permission, others, state }) => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it.each([
    [Technologies.enum.R, 'updateRSubmission'],
    [Technologies.enum.Python, 'updatePythonSubmission']
  ])(
    'sends only the new state of %s submission',
    async (technology, endpoint) => {
      await service({
        id: 1,
        technology,
        permissions: [permission]
      })

      expect(openApiRequest).toHaveBeenCalledOnce()
      const [callback, parameters] =
        vi.mocked(openApiRequest).mock.calls[0]
      expect(callback.name).toBe(endpoint)
      expect(parameters).toEqual([
        1,
        [{ op: 'replace', path: '/state', value: state }]
      ])
    }
  )

  it.each([
    ['with only the other permissions', others],
    ['without permissions', undefined]
  ])('does not call the API %s', async (_, permissions) => {
    service({
      id: 1,
      technology: Technologies.enum.R,
      permissions
    })
    await new Promise((resolve) => setTimeout(resolve))

    expect(openApiRequest).not.toHaveBeenCalled()
  })
})
