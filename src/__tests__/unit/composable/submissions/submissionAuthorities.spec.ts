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

import { describe, it, expect, beforeEach } from 'vitest'

import { EntityModelSubmissionDto } from '@/openapi'
import { createPinia, setActivePinia } from 'pinia'
import { Technologies } from '@/enum/Technologies'
import { useAuthorizationStore } from '@/store/options/authorization'
import me from '@/__tests__/config/mockData/me.json'
import { useSubmissionAuthorizationCheck } from '@/composable/submissions/submissionAuthorities'
import { SubmissionEditOptions } from '@/enum/SubmissionEditOptions'

let authorizationStore: any

const authorizationLinks = [
  {
    rel: 'self',
    href: 'http://localhost:8017/api/v2/manager/submissions/1',
    type: 'PATCH'
  },
  {
    rel: 'self',
    href: 'http://localhost:8017/api/v2/manager/submissions/1',
    type: 'DELETE'
  }
]

beforeEach(async () => {
  setActivePinia(createPinia())
  authorizationStore = useAuthorizationStore()
  authorizationStore.me = me.data
})

describe('submission authorities', () => {
  it('should allow on state change (waiting -> accepted)', async () => {
    const { canChangeState } =
      useSubmissionAuthorizationCheck()
    const submission = {
      state: 'WAITING',
      technology: Technologies.Enum.Python,
      links: authorizationLinks
    } as EntityModelSubmissionDto
    const canEdit = canChangeState(
      submission,
      SubmissionEditOptions.Enum.accept
    )
    expect(canEdit).toBeTruthy()
  })

  it('should not allow on state change when not mutable(accepted -> rejected)', async () => {
    const { canChangeState } =
      useSubmissionAuthorizationCheck()
    const submission = {
      state: 'WAITING',
      technology: Technologies.Enum.Python
    } as EntityModelSubmissionDto
    const canEdit = canChangeState(
      submission,
      SubmissionEditOptions.Enum.accept
    )
    expect(canEdit).toBeFalsy()
  })

  it('should allow to cancel if user is a submitter', () => {
    const { canChangeState } =
      useSubmissionAuthorizationCheck()
    const submission = {
      state: 'WAITING',
      submitter: { id: 4 },
      links: authorizationLinks
    } as EntityModelSubmissionDto
    const canEdit = canChangeState(
      submission,
      SubmissionEditOptions.Enum.cancel
    )
    expect(canEdit).toBeTruthy()
  })
  it('should not allow to cancel if user is not a submitter', () => {
    const { canChangeState } =
      useSubmissionAuthorizationCheck()
    const submission = {
      state: 'WAITING',
      submitter: { id: 5 },
      links: authorizationLinks
    } as EntityModelSubmissionDto
    const canEdit = canChangeState(
      submission,
      SubmissionEditOptions.Enum.cancel
    )
    expect(canEdit).toBeFalsy()
  })

  it('should not allow to reject if user is a submitter', () => {
    const { canChangeState } =
      useSubmissionAuthorizationCheck()
    const submission = {
      state: 'WAITING',
      submitter: { id: 4 },
      links: authorizationLinks
    } as EntityModelSubmissionDto
    const canEdit = canChangeState(
      submission,
      SubmissionEditOptions.Enum.reject
    )
    expect(canEdit).toBeFalsy()
  })
  it('should allow to reject if user is not a submitter and is authorized to', () => {
    const { canChangeState } =
      useSubmissionAuthorizationCheck()
    const submission = {
      state: 'WAITING',
      submitter: { id: 5 },
      links: authorizationLinks
    } as EntityModelSubmissionDto
    const canEdit = canChangeState(
      submission,
      SubmissionEditOptions.Enum.reject
    )
    expect(canEdit).toBeTruthy()
  })
  it('should not allow to reject if user is not a submitter and is not authorized to', () => {
    const { canChangeState } =
      useSubmissionAuthorizationCheck()
    const submission = {
      state: 'WAITING',
      submitter: { id: 5 }
    } as EntityModelSubmissionDto
    const canEdit = canChangeState(
      submission,
      SubmissionEditOptions.Enum.reject
    )
    expect(canEdit).toBeFalsy()
  })

  it('should not allow to accept if user is a submitter', () => {
    const { canChangeState } =
      useSubmissionAuthorizationCheck()
    const submission = {
      state: 'WAITING',
      submitter: { id: 4 },
      links: authorizationLinks
    } as EntityModelSubmissionDto
    const canEdit = canChangeState(
      submission,
      SubmissionEditOptions.Enum.accept
    )
    expect(canEdit).toBeFalsy()
  })
  it('should allow to accept if user is not a submitter and is authorized to', () => {
    const { canChangeState } =
      useSubmissionAuthorizationCheck()
    const submission = {
      state: 'WAITING',
      submitter: { id: 5 },
      links: authorizationLinks
    } as EntityModelSubmissionDto
    const canEdit = canChangeState(
      submission,
      SubmissionEditOptions.Enum.accept
    )
    expect(canEdit).toBeTruthy()
  })
  it('should not allow to accept if user is not a submitter and is not authorized to', () => {
    const { canChangeState } =
      useSubmissionAuthorizationCheck()
    const submission = {
      state: 'WAITING',
      submitter: { id: 5 }
    } as EntityModelSubmissionDto
    const canEdit = canChangeState(
      submission,
      SubmissionEditOptions.Enum.accept
    )
    expect(canEdit).toBeFalsy()
  })
})
