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

import { mount } from '@vue/test-utils'
import { plugins } from '@/__tests__/config/plugins'
import { mocks } from '@/__tests__/config/mocks'
import { createPinia, setActivePinia } from 'pinia'
import ReplaceOption from '@/components/addSubmission/ReplaceOption.vue'
import { useSubmissionStore } from '@/store/options/submission'

let wrapper: any
const globalConfig = {
  mocks: mocks,
  plugins: plugins
}

const localFile = new File(
  ['packageFile'],
  'A3_1.0.0.tar.gz'
)

beforeEach(async () => {
  setActivePinia(createPinia())
  wrapper = mount(ReplaceOption, {
    props: { file: localFile, disabled: false },
    global: globalConfig
  })
})

describe('Replace Option', () => {
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('replace button exists', () => {
    const button = wrapper.find('#replace-button')
    expect(button.exists()).toBeTruthy()
  })

  it('replace button has false value by default', async () => {
    wrapper.vm.valid = true
    const submissionsStore = useSubmissionStore()
    submissionsStore.replace = []
    const replaceIconOutline = wrapper.find(
      '.mdi-checkbox-blank-outline'
    )
    expect(replaceIconOutline.exists()).toBeTruthy()
  })

  it('replace button has changes store and value on click', async () => {
    const submissionsStore = useSubmissionStore()
    const fileReplace = '.mdi-checkbox-marked-outline'
    const fileReplaceOutline = '.mdi-checkbox-blank-outline'
    expect(
      wrapper.find(fileReplaceOutline).exists()
    ).toBeTruthy()
    expect(wrapper.find(fileReplace).exists()).toBeFalsy()
    expect(submissionsStore.replace.length).toEqual(0)
    await wrapper.find(fileReplaceOutline).trigger('click')
    expect(wrapper.find(fileReplace).exists()).toBeTruthy()
    expect(
      wrapper.find(fileReplaceOutline).exists()
    ).toBeFalsy()
    expect(submissionsStore.replace.length).toEqual(1)
  })
})
