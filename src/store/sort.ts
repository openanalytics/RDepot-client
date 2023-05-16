/* 
 *  R Depot
 *  
 *  Copyright (C) 2012-2023 Open Analytics NV
 *  
 *  ===========================================================================
 *  
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the Apache License as published by
 *  The Apache Software Foundation, either version 2 of the License, or
 *  (at your option) any later version.
 *  
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  Apache License for more details.
 *  
 *  You should have received a copy of the Apache License
 *  along with this program. If not, see <http://www.apache.org/licenses/>
 *  
 */

import { defineStore } from 'pinia'
import { useCommonStore } from './common'

interface State {
  field: string
  direction: string
}

export const useSortStore = defineStore('sort_store', {
  state: (): State => {
    return {
      field: 'name',
      direction: 'asc'
    }
  },
  actions: {
    async setField(payload?: string) {
      if (payload) {
        if (this.field == payload) {
          this.direction =
            this.direction == 'asc' ? 'desc' : 'asc'
        } else {
          this.direction = 'asc'
        }
        this.field = payload
      }
      this.updateKey()
    },
    reset() {
      this.field = 'name'
      this.direction = 'asc'
    },
    updateKey() {
      const common_store = useCommonStore()
      common_store.updateKey()
    },
    getSortBy() {
      return [this.field + ',' + this.direction]
    }
  }
})
