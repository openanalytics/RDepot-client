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

import { useTheme } from 'vuetify'
import { useAuthorizationStore } from '@/store/options/authorization'
import getEnv from '@/utils/env'

export function useThemeConfig() {
  function configureColorTheme() {
    const theme = useTheme()
    theme.global.name.value =
      useAuthorizationStore().me.userSettings?.theme ||
      'dark'
  }

  function configureBorderRadius() {
    const enabled = getEnv('VITE_BORDER_RADIUS') !== 'false'
    document.documentElement.style.setProperty(
      '--rdepot-border-radius',
      enabled ? '4px' : '0px'
    )
  }

  function applyTheme() {
    configureColorTheme()
    configureBorderRadius()
  }

  return { applyTheme }
}
