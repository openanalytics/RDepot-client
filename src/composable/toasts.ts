/*
 * R Depot
 *
 * Copyright (C) 2012-2023 Open Analytics NV
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
import { toast, type ToastOptions } from 'vue3-toastify'
import { i18n } from '@/plugins/i18n'
import getEnv from '@/utils/env'

export function useToast() {
  function success(message: string): void {
    toast.success(i18n.t(message), {
      autoClose: 3000,
      position: toast.POSITION.BOTTOM_LEFT
    } as ToastOptions)
  }

  function warning(message: string): void {
    toast.warn(i18n.t(message), {
      autoClose: 3000,
      position: toast.POSITION.BOTTOM_LEFT
    } as ToastOptions)
  }

  function info(message: string): void {
    toast.info(i18n.t(message), {
      autoClose: 3000,
      position: toast.POSITION.BOTTOM_LEFT
    } as ToastOptions)
  }

  function normal(message: string): void {
    toast(i18n.t(message), {
      autoClose: 3000,
      position: toast.POSITION.BOTTOM_LEFT
    } as ToastOptions)
  }

  function error(
    message: string,
    parameters?: Array<any>
  ): void {
    if (parameters) {
      toast.error(i18n.t(message, parameters), {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_LEFT
      } as ToastOptions)
    } else {
      toast.error(i18n.t(message), {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_LEFT
      } as ToastOptions)
    }
  }

  function devSuccess(message: string): void {
    if (getEnv('VITE_DEV_MODE') == 'true') {
      success(message)
    }
  }

  return {
    success,
    info,
    normal,
    error,
    warning,
    devSuccess
  }
}
