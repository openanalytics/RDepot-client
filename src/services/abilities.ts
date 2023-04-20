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
import { InjectionKey } from 'vue'
import { ABILITY_TOKEN } from '@casl/vue'

const Subjects = z.enum([
  'events',
  'user',
  'packages',
  'package maintainers',
  'repository',
  'repository maintainers',
  'python repository',
  'r package',
  'r repository',
  'r submissions'
])
type Subjects = z.infer<typeof Subjects>

const Actions = z.enum(['GET', 'POST', 'PATCH', 'DELETE'])
type Actions = z.infer<typeof Actions>

export type Ability = PureAbility<
  [Actions, Subjects],
  MongoQuery
>
export const Ability = PureAbility as AbilityClass<Ability>

export default function defineAbilityFor(role: Role) {
  const { can, build } = new AbilityBuilder(Ability)

  if (isAtLeastUser(role)) {
    can('GET', [
      'events',
      'packages',
      'package maintainers',
      'repository',
      'python repository',
      'r package',
      'r repository'
    ])

    can(['GET', 'PATCH', 'POST'], 'r submissions')
  }

  if (isAtLeastPackageMaintainer(role)) {
    can('PATCH', 'r package')
  }

  if (isAtLeastRepositoryMaintainer(role)) {
    can(['POST', 'PATCH'], 'package maintainers')

    can('PATCH', ['python repository', 'r repository'])
  }

  if (isAtLeastAdmin(role)) {
    can(['GET', 'POST', 'PATCH', 'DELETE'], 'user')

    can(
      ['GET', 'POST', 'PATCH', 'DELETE'],
      'repository maintainers'
    )

    can(
      ['POST', 'DELETE'],
      ['python repository', 'r repository']
    )

    can('DELETE', [
      'package maintainers',
      'r package',
      'r submissions'
    ])
  }

  return build()
}

export const TOKEN = ABILITY_TOKEN as InjectionKey<Ability>
