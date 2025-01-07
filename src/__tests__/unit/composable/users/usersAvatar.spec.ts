/*
 * R Depot
 *
 * Copyright (C) 2012-2025 Open Analytics NV
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
import { useUsersAvatar } from '@/composable/user/usersAvatar'

describe("user's avatar composable", () => {
  it('should always return the same hex color for the same login', () => {
    const { getAvatarColor } = useUsersAvatar()
    const EINSTEIN_COLOR = '#efcd91'
    const TESLA_COLOR = '#0bf0f1'
    let color = getAvatarColor('Albert Einstein')
    expect(color).toEqual(EINSTEIN_COLOR)
    color = getAvatarColor('Albert Einstein')
    expect(color).toEqual(EINSTEIN_COLOR)
    color = getAvatarColor('Nikola Tesla')
    expect(color).toEqual(TESLA_COLOR)
    color = getAvatarColor('Nikola Tesla')
    expect(color).toEqual(TESLA_COLOR)
  })

  it('should return grey color when username is not defined', () => {
    const { getAvatarColor } = useUsersAvatar()
    const UNDEFINED_COLOR = '#d3d3d3'
    const color = getAvatarColor('')
    expect(color).toEqual(UNDEFINED_COLOR)
  })

  it('should return uppercase initials for each username', () => {
    const { getInitials } = useUsersAvatar()
    expect(getInitials('Albert Einstein')).toEqual('AE')
    expect(getInitials('Nikola Tesla')).toEqual('NT')
    expect(getInitials('Galieleo')).toEqual('G')
    expect(getInitials('')).toEqual('')
    expect(
      getInitials('ALBERT SOMETHING EINSTEIN')
    ).toEqual('AE')
  })
})
