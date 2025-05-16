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

import {
  prepareUploadPackagesView,
  preparePackagesView,
  prepareSubmissionsView,
  prepareRepositoriesView,
  preparePackageMaintainersView,
  prepareEventsView
} from './viewsPreparations'

export const routes = [
  {
    path: '/',
    component: () =>
      import('@/layouts/default/DefaultView.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        redirect: () => {
          return 'packages'
        }
      },

      {
        path: '/users',
        name: 'users',
        component: () =>
          import('@/views/users/UsersView.vue'),
        meta: { title: 'RDepot - users', sidebar: 'users' }
      },
      {
        path: '/repositories',
        name: 'repositories',
        component: () =>
          import(
            '@/views/repositories/RepositoriesView.vue'
          ),
        meta: { title: 'RDepot - repositories' },
        beforeEnter: () => {
          prepareRepositoriesView()
        }
      },
      {
        path: '/repository-maintainers',
        name: 'repositoryMaintainers',
        component: () =>
          import(
            '@/views/maintainers/RepositoryMaintainersView.vue'
          ),
        meta: { title: 'RDepot - repository maintainers' }
      },
      {
        path: '/submissions',
        name: 'submissions',
        component: () =>
          import('@/views/submissions/SubmissionsView.vue'),
        meta: { title: 'RDepot - submissions' },
        beforeEnter: () => {
          prepareSubmissionsView()
        }
      },
      {
        path: '/packages',
        name: 'packages',
        component: () =>
          import('@/views/packages/PackagesView.vue'),
        meta: { title: 'RDepot - packages' },
        beforeEnter: () => {
          preparePackagesView()
        }
      },
      {
        path: '/packages/:technology/:id',
        name: 'packageDetails',
        component: () =>
          import('@/views/packages/PackageDetailsView.vue'),
        meta: { title: 'RDepot - package details' },
        props: true
      },
      {
        path: '/package-maintainers',
        name: 'packageMaintainers',
        component: () =>
          import(
            '@/views/maintainers/PackageMaintainersView.vue'
          ),
        meta: { title: 'RDepot - package maintainers' },
        beforeEnter: () => {
          preparePackageMaintainersView()
        }
      },
      {
        path: '/upload-packages',
        name: 'addSubmission',
        component: () =>
          import(
            '@/views/submissions/AddSubmissionView.vue'
          ),
        meta: { title: 'RDepot - upload packages' },
        beforeEnter: () => {
          prepareUploadPackagesView()
        },
        props: true
      },
      {
        path: '/events',
        name: 'events',
        component: () =>
          import('@/views/events/EventsView.vue'),
        meta: { title: 'RDepot - events' },
        beforeEnter: () => {
          prepareEventsView()
        }
      },
      {
        path: '/settings-general',
        name: 'settingsGeneral',
        component: () =>
          import(
            '@/views/settings/GeneralSettingsView.vue'
          ),
        meta: { title: 'RDepot - settings' }
      },
      {
        path: '/settings-tokens',
        name: 'settingsTokens',
        component: () =>
          import('@/views/settings/AccessTokensView.vue'),
        meta: { title: 'RDepot - access tokens' }
      }
    ]
  },
  {
    path: '/login',
    component: () =>
      import('@/layouts/default/ContentView.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () =>
          import('@/views/users/LoginView.vue'),
        meta: { title: 'RDepot - login' }
      }
    ]
  }
]
