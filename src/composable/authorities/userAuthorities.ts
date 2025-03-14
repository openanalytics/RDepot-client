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

import { Link } from '@/openapi'

type PatchOptions = {
  allowed: boolean
  fields: string[]
}

export function useUserAuthorities() {
  function canDelete(links?: Array<Link>): boolean {
    return canPerformAction('delete', links).allowed
  }

  function canPatch(
    links?: Array<Link>,
    field?: string
  ): boolean {
    const result: PatchOptions = canPerformAction(
      'patch',
      links
    )
    if (result.fields.length === 0) {
      return result.allowed
    } else {
      if (field) {
        return result.fields.includes(field)
      } else {
        console.error(
          'No field was specified in canPatch operation'
        )
        return false
      }
    }
  }

  function canPerformAction(
    action: string,
    links?: Array<Link>
  ) {
    const result: PatchOptions = {
      allowed: false,
      fields: []
    }

    links?.forEach((link) => {
      if (
        link.rel === 'self' &&
        link.type?.toLowerCase() === action.toLowerCase()
      ) {
        result.allowed = true
        result.fields = link.modifiableProperties || []
      }
    })
    return result
  }

  return {
    canDelete,
    canPatch
  }
}
