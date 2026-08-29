/*
 * R Depot
 *
 * Copyright (C) 2012-2026 Open Analytics NV
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
  afterEach,
  vi
} from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useCommonStore } from '@/store/options/common'

vi.mock('axios', () => ({
  default: { get: vi.fn() }
}))

vi.mock('@/utils/env', () => ({
  default: () => 'http://localhost'
}))

import axios from 'axios'
import { useHealthCheck } from '@/composable/healthCheck'

const mockedAxios = vi.mocked(axios.get)

beforeEach(() => {
  setActivePinia(createPinia())
  vi.useFakeTimers()
  mockedAxios.mockRejectedValue(new Error('network error'))
})

afterEach(() => {
  const { stopPolling } = useHealthCheck()
  stopPolling()
  vi.runOnlyPendingTimers()
  vi.useRealTimers()
  mockedAxios.mockReset()
})

describe('healthCheck composable', () => {
  it('should set connectionLost when starting health check', () => {
    const commonStore = useCommonStore()
    const { startConnectionHealthCheck } = useHealthCheck()

    startConnectionHealthCheck()

    expect(commonStore.connectionLost).toBe(true)
  })

  it('should start countdown at initial interval', () => {
    const { startConnectionHealthCheck, countdown } =
      useHealthCheck()

    startConnectionHealthCheck()

    expect(countdown.value).toBe(5)
  })

  it('should decrement countdown every second', () => {
    const { startConnectionHealthCheck, countdown } =
      useHealthCheck()

    startConnectionHealthCheck()

    vi.advanceTimersByTime(2000)
    expect(countdown.value).toBe(3)
  })

  it('should call health check endpoint after interval', () => {
    const { startConnectionHealthCheck } = useHealthCheck()

    startConnectionHealthCheck()
    vi.advanceTimersByTime(5000)

    expect(mockedAxios).toHaveBeenCalledWith(
      'http://localhost/actuator/health',
      expect.objectContaining({ timeout: 5000 })
    )
  })

  it('should double interval on failed health check', async () => {
    const { startConnectionHealthCheck, countdown } =
      useHealthCheck()

    startConnectionHealthCheck()
    await vi.advanceTimersByTimeAsync(5000)

    expect(countdown.value).toBe(10)
  })

  it('should restore connection on successful health check', async () => {
    const commonStore = useCommonStore()
    mockedAxios.mockResolvedValueOnce({
      data: { status: 'UP' }
    })

    const {
      startConnectionHealthCheck,
      connectionRestored
    } = useHealthCheck()

    startConnectionHealthCheck()
    await vi.advanceTimersByTimeAsync(5000)

    expect(commonStore.connectionLost).toBe(false)
    expect(connectionRestored.value).toBe(true)
  })

  it('should retry immediately when retryNow is called', async () => {
    mockedAxios.mockResolvedValueOnce({
      data: { status: 'UP' }
    })

    const { retryNow, connectionRestored } =
      useHealthCheck()

    await retryNow()

    expect(mockedAxios).toHaveBeenCalled()
    expect(connectionRestored.value).toBe(true)
  })

  it('should cap interval at 60 seconds', async () => {
    const { startConnectionHealthCheck, countdown } =
      useHealthCheck()

    startConnectionHealthCheck()

    // 5 -> 10 -> 20 -> 40 -> 80 (capped to 60)
    await vi.advanceTimersByTimeAsync(5000)
    await vi.advanceTimersByTimeAsync(10000)
    await vi.advanceTimersByTimeAsync(20000)
    await vi.advanceTimersByTimeAsync(40000)

    expect(countdown.value).toBe(60)
  })
})
