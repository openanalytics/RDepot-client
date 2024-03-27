/*
 * R Depot
 *
 * Copyright (C) 2012-2024 Open Analytics NV
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
import { useAuthorizationStore } from '@/store/authorization'
import { useToast } from '@/composable/toasts'
import { i18n } from '@/plugins/i18n'

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
  'events',
  'settings'
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
  'package',
  'repository',
  'submissions',
  'settings'
])

const Subject = z.enum([
  ...FrontendRoute.options,
  ...BackendRoute.options
])
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
      'repositories',
      'repositoryDetails',
      'package',
      'repository'
    ])

    can(['GET', 'PATCH', 'POST'], 'submissions')
    can(['GET', 'POST'], 'settings')
  }

  if (isAtLeastPackageMaintainer(role)) {
    can('PATCH', 'package')
    can('GET', 'addSubmission')
  }

  if (isAtLeastRepositoryMaintainer(role)) {
    can(['GET', 'POST', 'PATCH'], 'packageMaintainers')

    can('PATCH', 'repository')
  }

  if (isAtLeastAdmin(role)) {
    can(['GET', 'POST', 'PATCH', 'DELETE'], 'users')

    can(
      ['GET', 'POST', 'PATCH', 'DELETE'],
      'repositoryMaintainers'
    )

    can(['POST', 'DELETE'], 'repository')

    can('DELETE', [
      'packageMaintainers',
      'package',
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
  const authorizationStore = useAuthorizationStore()
  if (!authorizationStore.can(action, subject)) {
    return false
  }
  return true
}
