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

import { prepareAddPackageView } from './viewsPreperations'

export const routes = [
  {
    path: '/',
    component: () =>
      import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        redirect: () => {
          return 'packages'
        }
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/users/Login.vue'),
        meta: { title: 'RDepot - login' }
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('@/views/users/Users.vue'),
        meta: { title: 'RDepot - users', sidebar: 'users' }
      },
      {
        path: '/repositories',
        name: 'repositories',
        component: () =>
          import('@/views/repositories/Repositories.vue'),
        meta: { title: 'RDepot - repositories' }
      },
      {
        path: '/repository-maintainers',
        name: 'repositoryMaintainers',
        component: () =>
          import(
            '@/views/maintainers/RepositoryMaintainers.vue'
          ),
        meta: { title: 'RDepot - repository maintainers' }
      },
      {
        path: '/submissions',
        name: 'submissions',
        component: () =>
          import('@/views/submissions/Submissions.vue'),
        meta: { title: 'RDepot - submissions' }
      },
      {
        path: '/packages',
        name: 'packages',
        component: () =>
          import('@/views/packages/Packages.vue'),
        meta: { title: 'RDepot - packages' }
      },
      {
        path: '/packages/:technology/:id',
        name: 'packageDetails',
        component: () =>
          import('@/views/packages/PackageDetails.vue'),
        meta: { title: 'RDepot - package details' },
        props: true
      },
      {
        path: '/package-maintainers',
        name: 'packageMaintainers',
        component: () =>
          import(
            '@/views/maintainers/PackageMaintainers.vue'
          ),
        meta: { title: 'RDepot - package maintainers' }
      },
      {
        path: '/add-packages',
        name: 'addSubmission',
        component: () =>
          import('@/views/submissions/AddSubmission.vue'),
        meta: { title: 'RDepot - add packages' },
        beforeEnter: () => {
          prepareAddPackageView()
        }
      },
      {
        path: '/events',
        name: 'events',
        component: () =>
          import('@/views/events/Events.vue'),
        meta: { title: 'RDepot - events' }
      },
      {
        path: '/settings-general',
        name: 'settingsGeneral',
        component: () =>
          import('@/views/settings/General.vue'),
        meta: { title: 'RDepot - settings' }
      },
      {
        path: '/settings-tokens',
        name: 'settingsTokens',
        component: () =>
          import('@/views/settings/AccessTokens.vue'),
        meta: { title: 'RDepot - access tokens' }
      }
    ]
  }
]
