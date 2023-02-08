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
        path: '/repositories',
        name: 'repositories',
        component: () =>
          import('@/views/repositories/Repositories.vue'),
        meta: { title: 'RDepot - repositories' }
      },
      {
        path: '/packages',
        name: 'packages',
        component: () =>
          import('@/views/packages/Packages.vue'),
        meta: { title: 'RDepot - packages' }
      },
      {
        path: '/package-details/:name',
        name: 'packageDetails',
        component: () =>
          import('@/views/packages/PackageDetails.vue'),
        meta: { title: 'RDepot - package details' },
        props: true
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
