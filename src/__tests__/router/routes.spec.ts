import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { beforeAll, beforeEach } from 'vitest'
import AppVue from '@/App.vue'
import {
  createRouter,
  createWebHistory,
  Router
} from 'vue-router'
import { routes } from '@/router/routes'
import { createPinia, setActivePinia } from 'pinia'
import { mocks } from '@/__tests__/config/mocks'
import { plugins } from '@/__tests__/config/plugins'
import { ResizeObserver } from '@/__tests__/config/ResizeObserver'

let router: Router
let globalSettigns: any
let wrapper: any

beforeAll(() => {
  setActivePinia(createPinia())
  global.ResizeObserver = ResizeObserver
})

beforeEach(async () => {
  router = createRouter({
    history: createWebHistory(),
    routes: routes
  })
  globalSettigns = {
    mocks: mocks,
    plugins: [...plugins, router]
  }
  wrapper = mount(AppVue, {
    global: globalSettigns
  })
})

describe('App router', () => {
  it('renders package details list via router', async () => {
    await getRouterPath('/package-details/some-package')
    findComponentInWrapper(wrapper, 'packageDetails')
  })

  it('renders packages list via router', async () => {
    await getRouterPath('/packages')
    findComponentInWrapper(wrapper, 'packages')
  })

  it('renders repositories list via router', async () => {
    await getRouterPath('/repositories')
    findComponentInWrapper(wrapper, 'repositories')
  })

  it('renders add package view list via router', async () => {
    await getRouterPath('/add-packages')
    findComponentInWrapper(wrapper, 'addSubmission')
  })
})

async function getRouterPath(path: string) {
  router.push(path)
  await router.isReady()
}

function findComponentInWrapper(
  wrapper: any,
  name: string
) {
  expect(
    wrapper.findComponent({ name: name }).exists()
  ).toBe(true)
}
