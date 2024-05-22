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

import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import { plugins } from '@/__tests__/unit/config/plugins'
import { mocks } from '@/__tests__/unit/config/mocks'
import EditIcon from '@/components/common/action_icons/EditIcon.vue'
import { useCommonStore } from '@/store/common'
import { createPinia, setActivePinia } from 'pinia'
import { OverlayEnum } from '@/enum/Overlay'

const ICON_TEXT = 'Edit entity'

let wrapper: any
let commonStore: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

beforeEach(async () => {
  setActivePinia(createPinia())
  commonStore = useCommonStore()
  wrapper = mount(EditIcon, {
    global: globalConfig,
    props: {
      text: ICON_TEXT
    }
  })
})

describe('Edit icon', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('emits setEntity when clicked', async () => {
    const icon = wrapper.find('#pencil-icon')
    expect(icon.exists()).toBeTruthy()
    await icon.trigger('click')
    expect(wrapper.emitted().setEntity).toBeTruthy()
  })

  it('set variables in common store when clicked', async () => {
    const icon = wrapper.find('#pencil-icon')
    expect(icon.exists()).toBeTruthy()
    await icon.trigger('click')
    expect(commonStore.overlayText).toEqual(ICON_TEXT)
    expect(commonStore.overlayModel).toBeTruthy()
    expect(commonStore.overlayOpacity).toEqual(0.8)
    expect(commonStore.overlayComponent).toEqual(
      OverlayEnum.Enum.Edit
    )
  })
})
