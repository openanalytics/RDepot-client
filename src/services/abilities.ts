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
import { RouteRecordName } from 'vue-router'

const FrontendRoute = z.enum([
  'Home',
  'login',
  'repositories',
  'repositoryDetails',
  'repositoryMaintainers',
  'submissions',
  'packages',
  'packageDetails',
  'packageMaintainers',
  'addSubmission',
  'events'
])

const BackendRoute = z.enum([
  'events',
  'login',
  'Home',
  'users',
  'packages',
  'packageMaintainers',
  'repositories',
  'repositoryMaintainers',
  'python repository',
  'r package',
  'r repository',
  'submissions'
])

const Subjects = z.union([FrontendRoute, BackendRoute])
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
      'packageDetails',
      'packageMaintainers',
      'repositories',
      'repositoryDetails',
      'python repository',
      'r package',
      'r repository'
    ])

    can(['GET', 'PATCH', 'POST'], 'submissions')
  }

  if (isAtLeastPackageMaintainer(role)) {
    can('PATCH', 'r package')
    can('GET', 'addSubmission')
  }

  if (isAtLeastRepositoryMaintainer(role)) {
    can(['POST', 'PATCH'], 'packageMaintainers')

    can('PATCH', ['python repository', 'r repository'])
  }

  if (isAtLeastAdmin(role)) {
    can(['GET', 'POST', 'PATCH', 'DELETE'], 'users')

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

export function nameToActionAndSubject(
  name: RouteRecordName | null | undefined
): [Actions, Subjects] {
  const parsedSubject = Subjects.safeParse(name)
  if (parsedSubject.success) {
    return ['GET', parsedSubject.data]
  } else {
    throw Error(parsedSubject.error.message)
  }
}
