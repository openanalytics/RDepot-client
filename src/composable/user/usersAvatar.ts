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

export function useUsersAvatar() {
  function getAvatarColor(userName?: string) {
    if (userName) {
      let hash = 0
      for (let i = 0; i < userName.length; i++) {
        hash = userName.charCodeAt(i) + ((hash << 5) - hash)
      }
      let color = '#'
      for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff
        color += ('00' + value.toString(16)).substr(-2)
      }
      return color
    }
    return '#d3d3d3'
  }

  function getInitials(userName?: string) {
    if (userName) {
      const initials = userName
        .split(' ')
        .map((n) => n[0].toUpperCase())

      return initials
        .map(
          (n, i) =>
            (i == 0 || i == initials.length - 1) && n[0]
        )
        .filter((n) => n)
        .join('')
    }
    return ''
  }

  return {
    getAvatarColor,
    getInitials
  }
}
