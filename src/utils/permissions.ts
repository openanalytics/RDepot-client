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

const setCache = new WeakMap<string[], Set<string>>()

function cachedSet(permissions: string[]): Set<string> {
  let set = setCache.get(permissions)
  if (!set) {
    set = new Set(permissions)
    setCache.set(permissions, set)
  }
  return set
}

export function hasPermission(
  permissions: string[] | undefined | null,
  permission: string
): boolean {
  if (!permissions) return false
  return cachedSet(permissions).has(permission)
}
