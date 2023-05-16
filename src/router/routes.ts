/* 
 *  R Depot
 *  
 *  Copyright (C) 2012-2023 Open Analytics NV
 *  
 *  ===========================================================================
 *  
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the Apache License as published by
 *  The Apache Software Foundation, either version 2 of the License, or
 *  (at your option) any later version.
 *  
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  Apache License for more details.
 *  
 *  You should have received a copy of the Apache License
 *  along with this program. If not, see <http://www.apache.org/licenses/>
 *  
 */

export const routes = [
  {
    path: '/',
    component: () =>
      import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/users/Login.vue')
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
        meta: { title: 'RDepot - users' }
      },
      {
        path: '/repositories',
        name: 'repositories',
        component: () =>
          import('@/views/repositories/Repositories.vue'),
        meta: { title: 'RDepot - repositories' }
      },
      {
        path: '/repositories/:name',
        name: 'repositoryDetails',
        component: () =>
          import(
            '@/views/repositories/RepositoryDetails.vue'
          ),
        meta: { title: 'RDepot - repository details' },
        props: true
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
        path: '/packages/:id',
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
        meta: { title: 'RDepot - add packages' }
      },
      {
        path: '/events',
        name: 'events',
        component: () =>
          import('@/views/events/Events.vue'),
        meta: { title: 'RDepot - events' }
      }
    ]
  }
]
