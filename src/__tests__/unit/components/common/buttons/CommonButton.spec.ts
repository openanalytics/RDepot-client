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

import { describe, it, expect, beforeEach } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import CommonButton from '@/components/common/buttons/CommonButton.vue'
import { useCommonStore } from '@/store/options/common'
import { createPinia, setActivePinia } from 'pinia'
import { i18n } from '@/plugins/i18n'

let wrapper: any
let commonStore: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

beforeEach(async () => {
  setActivePinia(createPinia())
  commonStore = useCommonStore()
  wrapper = shallowMount(CommonButton as any, {
    props: { component: 'Filtration' },
    slots: {
      default: 'Button'
    },
    global: globalConfig
  })
})

describe('CommonButton', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('set overaly values after click', async () => {
    const content = wrapper.find('#common-button')
    expect(content.exists()).toBeTruthy()
    await content.trigger('click')
    expect(commonStore.overlayText).toEqual(
      i18n.t('messages.filtration.makeSure')
    )
    expect(commonStore.overlay).toBe(true)
  })
})
