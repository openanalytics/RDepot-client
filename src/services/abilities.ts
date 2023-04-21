import {
  AbilityBuilder,
  PureAbility,
  AbilityClass,
  MongoQuery
} from '@casl/ability'
import {
  Role,
  isAtLeastAdmin,
  isAtLeastPackageMaintainer,
  isAtLeastRepositoryMaintainer,
  isAtLeastUser
} from '@/enum/UserRoles'
import { z } from 'zod'

const Subjects = z.enum([
  'events',
  'login',
  'Home',
  'user',
  'packages',
  'packageMaintainers',
  'repositories',
  'repositoryMaintainers',
  'python repository',
  'r package',
  'r repository',
  'submissions'
])
type Subjects = z.infer<typeof Subjects>

const Actions = z.enum(['GET', 'POST', 'PATCH', 'DELETE'])
type Actions = z.infer<typeof Actions>

export type Ability = PureAbility<
  [Actions, Subjects],
  MongoQuery
>
export const Ability = PureAbility as AbilityClass<Ability>

export function defineAbilityFor(role: Role) {
  const { can, build } = new AbilityBuilder(Ability)

  if (isAtLeastUser(role)) {
    can('GET', [
      'events',
      'login',
      'Home',
      'packages',
      'packageMaintainers',
      'repositories',
      'python repository',
      'r package',
      'r repository'
    ])

    can(['GET', 'PATCH', 'POST'], 'submissions')
  }

  if (isAtLeastPackageMaintainer(role)) {
    can('PATCH', 'r package')
  }

  if (isAtLeastRepositoryMaintainer(role)) {
    can(['POST', 'PATCH'], 'packageMaintainers')

    can('PATCH', ['python repository', 'r repository'])
  }

  if (isAtLeastAdmin(role)) {
    can(['GET', 'POST', 'PATCH', 'DELETE'], 'user')

    can(
      ['GET', 'POST', 'PATCH', 'DELETE'],
      'repositoryMaintainers'
    )

    can(
      ['POST', 'DELETE'],
      ['python repository', 'r repository']
    )

    can('DELETE', [
      'packageMaintainers',
      'r package',
      'submissions'
    ])
  }

  return build()
}
