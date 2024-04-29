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

import { fetchConfiguration } from '@/services/config_services'
import { defineStore } from 'pinia'

interface State {
  declarativeMode: boolean
  deletingPackages: boolean
  deletingRepositories: boolean
  replacingPackages: boolean
}

export const useConfigStore = defineStore('configStore', {
  state: (): State => {
    return {
      declarativeMode: false,
      deletingPackages: true,
      deletingRepositories: true,
      replacingPackages: true
    }
  },
  actions: {
    async fetchConfiguration() {
      const [config] = await fetchConfiguration()
      this.declarativeMode =
        config.declarativeModeEnabled || false
      this.deletingPackages =
        config.deletingPackagesEnabled || true
      this.deletingRepositories =
        config.deletingRepositoriesEnabled || true
      this.replacingPackages =
        config.replacingPackagesEnabled || true
    }
  }
})
