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
      return z.NEVER
    }
  }
)

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
