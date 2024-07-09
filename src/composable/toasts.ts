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

import { toast, type ToastOptions } from 'vue3-toastify'
import getEnv from '@/utils/env'
import vuetify from '@/plugins/vuetify'
import { AxiosError, AxiosResponse } from 'axios'
import { ResponseDtoObject } from '@/openapi'
import { i18n } from '@/plugins/i18n'
import Toast500Error from '@/components/common/toasts/Toast500Error.vue'
import { BackendError } from '@/models/errors/BackendError'

export function useToast() {
  function success(message: string, icon?: string): void {
    toast.success(message, {
      icon: icon
    } as ToastOptions)
  }

  function warning(message: string, icon?: string): void {
    toast.warn(message, {
      icon: icon
    } as ToastOptions)
  }

  function info(message: string, icon?: string): void {
    toast.info(message, {
      icon: icon
    } as ToastOptions)
  }

  function normal(message: string, icon?: string): void {
    toast(message, {
      icon: icon
    } as ToastOptions)
  }

  function error(message: string, icon?: string): void {
    toast.error(message, {
      icon: icon
    } as ToastOptions)
  }

  function error500(err: AxiosError<BackendError>): void {
    toast.error(Toast500Error, {
      icon: false,
      closeOnClick: false,
      autoClose: 8000,
      data: err
    })
  }

  function devToast(message: string, type: string): void {
    if (getEnv('VITE_DEV_MODE') == 'true') {
      switch (type) {
        case 'info':
          info(message, '🛠️')
          break
        case 'success':
          success(message, '🛠️')
          break
        case 'error':
          error(message, '🛠️')
          break
        case 'normal':
          normal(message, '🛠️')
          break
        case 'warning':
          warning(message, '🛠️')
          break
        default:
          success(message, '🛠️')
          break
      }
    }
  }

  function getToastTheme(): string {
    return vuetify.theme.global.current.value.dark
      ? 'dark'
      : 'light'
  }

  function notifyAPISuccess(
    result: AxiosResponse<ResponseDtoObject>
  ) {
    if (getEnv('VITE_DEV_MODE') == 'true') {
      devToast(i18n.t('success'), 'success')
    } else {
      if (
        result.config.method?.toLowerCase() == 'post' ||
        result.config.method?.toLowerCase() == 'put' ||
        result.config.method?.toLowerCase() == 'delete' ||
        result.config.method?.toLowerCase() == 'patch'
      ) {
        success(i18n.t('success'))
      }
    }
  }

  return {
    success,
    info,
    normal,
    error,
    warning,
    devToast,
    error500,
    getToastTheme,
    notifyAPISuccess
  }
}
