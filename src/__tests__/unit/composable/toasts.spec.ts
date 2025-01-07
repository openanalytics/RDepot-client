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
  describe,
  it,
  expect,
  beforeEach,
  vi
} from 'vitest'

import { createPinia, setActivePinia } from 'pinia'
import { useToast } from '@/composable/toasts'
import { AxiosError } from 'axios'
import { BackendError } from '@/models/errors/BackendError'
import error500Json from '@/__tests__/config/mockData/error500.json'

beforeEach(async () => {
  setActivePinia(createPinia())
})

describe('toasts composable', () => {
  it('should call success toast', async () => {
    const { success } = useToast()
    vi.mock('vue3-toastify')
    const notify = await import('vue3-toastify')
    success('message')
    expect(notify.toast.success).toBeCalled()
  })

  it('should call warn toast', async () => {
    const { warning } = useToast()
    vi.mock('vue3-toastify')
    const notify = await import('vue3-toastify')
    warning('message')
    expect(notify.toast.warn).toBeCalled()
  })

  it('should call info toast', async () => {
    const { info } = useToast()
    vi.mock('vue3-toastify')
    const notify = await import('vue3-toastify')
    info('message')
    expect(notify.toast.info).toBeCalled()
  })

  it('should call normal toast', async () => {
    const { normal } = useToast()
    vi.mock('vue3-toastify')
    const notify = await import('vue3-toastify')
    normal('message')
    expect(notify.toast).toBeCalled()
  })

  it('should call error toast', async () => {
    const { error } = useToast()
    vi.mock('vue3-toastify')
    const notify = await import('vue3-toastify')
    error('message')
    expect(notify.toast.error).toBeCalled()
  })

  it('should call error500 toast', async () => {
    const { error500 } = useToast()
    vi.mock('vue3-toastify')
    const notify = await import('vue3-toastify')
    error500(error500Json as AxiosError<BackendError>)
    expect(notify.toast.error).toBeCalled()
  })
})
