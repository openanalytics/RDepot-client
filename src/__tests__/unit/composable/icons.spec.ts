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

import { EntityModelNewsfeedEventDtoResourceTypeEnum } from '@/openapi'
import { createPinia, setActivePinia } from 'pinia'
import { useIcons } from '@/composable/icons'

beforeEach(async () => {
  setActivePinia(createPinia())
})

describe('icons composable', () => {
  it('should return package icon', () => {
    const { getIcon } = useIcons()
    const icon: string = getIcon(
      EntityModelNewsfeedEventDtoResourceTypeEnum.PACKAGE
    )
    expect(icon).toEqual('mdi-package')
  })

  it('should return repository icon', () => {
    const { getIcon } = useIcons()
    const icon: string = getIcon(
      EntityModelNewsfeedEventDtoResourceTypeEnum.REPOSITORY
    )
    expect(icon).toEqual('mdi-folder-network')
  })

  it('should return user icon', () => {
    const { getIcon } = useIcons()
    const icon: string = getIcon(
      EntityModelNewsfeedEventDtoResourceTypeEnum.USER
    )
    expect(icon).toEqual('mdi-account-multiple')
  })

  it('should return package maintainer icon', () => {
    const { getIcon } = useIcons()
    const icon: string = getIcon(
      EntityModelNewsfeedEventDtoResourceTypeEnum.PACKAGEMAINTAINER
    )
    expect(icon).toEqual('mdi-account-multiple')
  })

  it('should return repository maintainer icon', () => {
    const { getIcon } = useIcons()
    const icon: string = getIcon(
      EntityModelNewsfeedEventDtoResourceTypeEnum.REPOSITORYMAINTAINER
    )
    expect(icon).toEqual('mdi-account-multiple')
  })

  it('should return submission icon', () => {
    const { getIcon } = useIcons()
    const icon: string = getIcon(
      EntityModelNewsfeedEventDtoResourceTypeEnum.SUBMISSION
    )
    expect(icon).toEqual('mdi-email')
  })

  it('should return access token icon', () => {
    const { getIcon } = useIcons()
    const icon: string = getIcon(
      EntityModelNewsfeedEventDtoResourceTypeEnum.ACCESSTOKEN
    )
    expect(icon).toEqual('mdi-key')
  })

  it('should return empty string when no parameter is used', () => {
    const { getIcon } = useIcons()
    const icon: string = getIcon()
    expect(icon).toEqual('')
  })
})
