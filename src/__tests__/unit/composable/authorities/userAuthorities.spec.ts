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

import { describe, it, expect } from 'vitest'

import { useUserAuthorities } from '@/composable/authorities/userAuthorities'

const CAN_PATCH_DELETE_LINK = [
  {
    rel: 'self',
    href: 'http://localhost:8017/api/v2/manager/r/submissions/19'
  },
  {
    rel: 'submissionList',
    href: 'http://localhost:8017/api/v2/manager/submissions'
  },
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

const CANT_PATCH_DELETE_LINK = [
  {
    rel: 'self',
    href: 'http://localhost:8017/api/v2/manager/r/packages/31'
  },
  {
    rel: 'packageList',
    href: 'http://localhost:8017/api/v2/manager/packages'
  }
]
const CAN_PATCH_ONLY_GIVEN_PROPERTIES = [
  {
    rel: 'self',
    href: 'http://localhost:8017/api/v2/manager/r/submissions/19'
  },
  {
    rel: 'submissionList',
    href: 'http://localhost:8017/api/v2/manager/submissions'
  },
  {
    rel: 'self',
    href: 'http://localhost:8017/api/v2/manager/r/submissions/19',
    type: 'PATCH',
    modifiableProperties: ['state']
  }
]

describe('user authorities composable', () => {
  it('should return true for links with PATCH option', () => {
    const { canPatch } = useUserAuthorities()
    expect(
      canPatch(CAN_PATCH_DELETE_LINK, 'deleted')
    ).toBeTruthy()
  })

  it('should return true for links with DELETE option', () => {
    const { canDelete } = useUserAuthorities()
    expect(canDelete(CAN_PATCH_DELETE_LINK)).toBeTruthy()
  })

  it('should return false for links with PATCH option', () => {
    const { canPatch } = useUserAuthorities()
    expect(
      canPatch(CANT_PATCH_DELETE_LINK, 'deleted')
    ).toBeFalsy()
  })

  it('should return true for links with DELETE option', () => {
    const { canDelete } = useUserAuthorities()
    expect(canDelete(CANT_PATCH_DELETE_LINK)).toBeFalsy()
  })

  it('should return true for property in links with PATCH with modifiable properties option', () => {
    const { canPatch } = useUserAuthorities()
    expect(
      canPatch(CAN_PATCH_ONLY_GIVEN_PROPERTIES, 'state')
    ).toBeTruthy()
  })

  it('should return false for property that is not in links with PATCH with modifiable properties option', () => {
    const { canPatch } = useUserAuthorities()
    expect(
      canPatch(CAN_PATCH_ONLY_GIVEN_PROPERTIES, 'deleted')
    ).toBeFalsy()
  })

  it('should return false if no links were given', () => {
    const { canPatch } = useUserAuthorities()
    expect(canPatch()).toBeFalsy()
  })

  it('should return false if no property were given', () => {
    const { canPatch } = useUserAuthorities()
    expect(canPatch(CANT_PATCH_DELETE_LINK)).toBeFalsy()
  })
})
