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
import { useLoggedUserStore } from '@/store/logged_user'
import { notify } from '@kyvg/vue3-notification'
import { i18n } from './i18n'

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

const Subject = z.union([FrontendRoute, BackendRoute])
export type Subject = z.infer<typeof Subject>

const Action = z.enum(['GET', 'POST', 'PATCH', 'DELETE'])
export type Action = z.infer<typeof Action>

export type Ability = PureAbility<
  [Action, Subject],
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
): [Action, Subject] {
  const parsedSubject = Subject.safeParse(name)
  if (parsedSubject.success) {
    return ['GET', parsedSubject.data]
  } else {
    throw Error(parsedSubject.error.message)
  }
}

export const caslAbility = defineAbilityFor(Role.enum.user)

export function isAuthorized(
  action: Action,
  subject: Subject
): boolean {
  const logged_user_store = useLoggedUserStore()
  if (!logged_user_store.can('GET', 'packages')) {
    notify({
      type: 'error',
      text: i18n.t('common.errors.unauthorized')
    })
    return false
  }
  return true
}
