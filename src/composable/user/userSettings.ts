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

import { useCommonStore } from '@/store/options/common'
import { useOATable } from '@/store/setup/oatable'
import { useAuthorizationStore } from '@/store/options/authorization'

export function useUserSettings() {
  async function getUserSettings() {
    setTheme()
    setPageSize()
  }

  function setTheme() {
    const commonStore = useCommonStore()
    commonStore.updateThemeKey()
  }

  function setPageSize() {
    const { setPageSize } = useOATable()
    const authorizationStore = useAuthorizationStore()
    if (authorizationStore.me.userSettings?.pageSize) {
      setPageSize(
        authorizationStore.me.userSettings.pageSize
      )
    }
  }

  return {
    getUserSettings
  }
}
