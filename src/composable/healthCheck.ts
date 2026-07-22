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

import axios from 'axios'
import { ref } from 'vue'
import { useCommonStore } from '@/store/options/common'
import getEnv from '@/utils/env'

const HEALTH_CHECK_TIMEOUT = 5000
const INITIAL_INTERVAL = 5
const MAX_INTERVAL = 60

const countdown = ref(0)
const connectionRestored = ref(false)

let reconnectTimeoutId: ReturnType<
  typeof setTimeout
> | null = null
let countdownIntervalId: ReturnType<
  typeof setInterval
> | null = null
let currentInterval = INITIAL_INTERVAL

export function useHealthCheck() {
  const commonStore = useCommonStore()

  async function checkHealth(): Promise<boolean> {
    try {
      const serverAddress = getEnv('VITE_SERVER_ADDRESS')
      await axios.get(`${serverAddress}/actuator/health`, {
        timeout: HEALTH_CHECK_TIMEOUT,
        headers: { Accept: 'application/json' }
      })
      return true
    } catch {
      return false
    }
  }

  function stopPolling() {
    if (reconnectTimeoutId !== null) {
      clearTimeout(reconnectTimeoutId)
      reconnectTimeoutId = null
    }
    if (countdownIntervalId !== null) {
      clearInterval(countdownIntervalId)
      countdownIntervalId = null
    }
    countdown.value = 0
    currentInterval = INITIAL_INTERVAL
  }

  function onConnectionRestored() {
    commonStore.connectionLost = false
    connectionRestored.value = true
    stopPolling()
  }

  function startCountdown(seconds: number) {
    countdown.value = seconds
    if (countdownIntervalId !== null) {
      clearInterval(countdownIntervalId)
    }
    countdownIntervalId = setInterval(() => {
      if (countdown.value > 0) {
        countdown.value--
      }
    }, 1000)
  }

  function scheduleNextCheck() {
    startCountdown(currentInterval)

    reconnectTimeoutId = setTimeout(async () => {
      const healthy = await checkHealth()
      if (healthy) {
        onConnectionRestored()
      } else {
        currentInterval = Math.min(
          currentInterval * 2,
          MAX_INTERVAL
        )
        scheduleNextCheck()
      }
    }, currentInterval * 1000)
  }

  async function retryNow() {
    if (reconnectTimeoutId !== null) {
      clearTimeout(reconnectTimeoutId)
      reconnectTimeoutId = null
    }
    if (countdownIntervalId !== null) {
      clearInterval(countdownIntervalId)
      countdownIntervalId = null
    }
    countdown.value = 0

    const healthy = await checkHealth()
    if (healthy) {
      onConnectionRestored()
    } else {
      currentInterval = INITIAL_INTERVAL
      scheduleNextCheck()
    }
  }

  function startConnectionHealthCheck() {
    if (reconnectTimeoutId !== null) return

    commonStore.connectionLost = true
    currentInterval = INITIAL_INTERVAL
    scheduleNextCheck()
  }

  return {
    countdown,
    connectionRestored,
    retryNow,
    startConnectionHealthCheck,
    stopPolling
  }
}
