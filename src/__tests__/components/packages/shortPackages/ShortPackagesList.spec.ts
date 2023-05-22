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

import {
  describe,
  it,
  expect,
  beforeEach,
  beforeAll,
  afterAll
} from 'vitest'

import { mount } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import { ResizeObserver } from '@/__tests__/config/ResizeObserver'
import { createPinia, setActivePinia } from 'pinia'
import ShortPackagesListVue from '@/components/packages/shortPackages/ShortPackagesList.vue'
import ShortPackageRowVue from '@/components/packages/shortPackages/ShortPackageRow.vue'
import packages from '@/__tests__/config/mockData/packages.json'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

let wrapper: any
let repository_store: any

const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

const server = setupServer(
  rest.get(
    'http://localhost:8017/api/v2/manager/packages',
    (_, res, ctx) => {
      return res(ctx.json(packages))
    }
  )
)

beforeAll(() => {
  global.ResizeObserver = ResizeObserver
  setActivePinia(createPinia())
  server.listen()
})

beforeEach(async () => {
  wrapper = mount(ShortPackagesListVue, {
    global: globalConfig
  })
})

afterAll(() => {
  server.close()
})

describe('Short Packages - list', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays one row for each package + one for title', async () => {
    const packagesFromWrapper = wrapper.findAllComponents(
      ShortPackageRowVue
    )

    expect(packagesFromWrapper.length).toEqual(
      packages.data.content.length + 1
    )
  })
})