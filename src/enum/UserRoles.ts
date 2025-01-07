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

import { z } from 'zod'

const userRoles = {
  user: 0,
  packageMaintainer: 1,
  repositoryMaintainer: 2,
  admin: 3
} as const

export const Role = z.nativeEnum(userRoles)
export type Role = z.infer<typeof Role>

const StringUserRoles = z.enum([
  'user',
  'package maintainer',
  'repository maintainer',
  'admin'
])
export type StringUserRoles = z.infer<
  typeof StringUserRoles
>

const StringUserRolesBackend = z.enum([
  'user',
  'packagemaintainer',
  'repositorymaintainer',
  'admin'
])
export type StringUserRolesBackend = z.infer<
  typeof StringUserRolesBackend
>

export const roleToString = Role.transform(
  (arg): StringUserRoles => {
    if (arg === 0) {
      return 'user'
    } else if (arg === 1) {
      return 'package maintainer'
    } else if (arg === 2) {
      return 'repository maintainer'
    } else if (arg === 3) {
      return 'admin'
    } else {
      throw Error('Undefined role: ' + arg)
    }
  }
)

export const stringToRole = (arg: string): Role => {
  switch (arg) {
    case 'user':
      return 0
    case 'packagemaintainer':
      return 1
    case 'repositorymaintainer':
      return 2
    case 'admin':
      return 3
    default:
      throw Error('Undefined role: ' + arg)
  }
}

export const roleToStringBackend = (
  arg: Role
): StringUserRolesBackend => {
  switch (arg) {
    case 0:
      return StringUserRolesBackend.enum.user
    case 1:
      return StringUserRolesBackend.enum.packagemaintainer
    case 2:
      return StringUserRolesBackend.enum
        .repositorymaintainer
    case 3:
      return StringUserRolesBackend.enum.admin
    default:
      throw Error('Undefined role: ' + arg)
  }
}

export function isAtLeastUser(role: Role) {
  return role >= Role.enum.user
}
export function isAtLeastPackageMaintainer(role: Role) {
  return role >= Role.enum.packageMaintainer
}
export function isAtLeastRepositoryMaintainer(role: Role) {
  return role >= Role.enum.repositoryMaintainer
}
export function isAtLeastAdmin(role: Role) {
  return role >= Role.enum.admin
}
