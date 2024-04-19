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

import { defineStore } from 'pinia'
import { useCommonStore } from './common'

interface State {
  field: string
  direction: string
  defaultSort: {
    field: string
    direction: string
  }
  counter: number
}

export const useSortStore = defineStore('sortStore', {
  state: (): State => {
    return {
      field: 'name',
      direction: 'asc',
      defaultSort: {
        field: 'name',
        direction: 'asc'
      },
      counter: 0
    }
  },
  actions: {
    setDefaultFields(field: string, direction: string) {
      this.defaultSort.field = field
      this.defaultSort.direction = direction
    },
    async setField(payload?: string, direction?: string) {
      if (payload && payload !== this.field) {
        this.resetSort()
        if (direction) {
          this.direction = direction
        }
      }
      this.counter += 1
      if (this.counter % 3 === 0) {
        this.resetSort()
      } else {
        if (payload) {
          if (this.field == payload) {
            if (
              this.counter === 2 &&
              this.defaultSort.field === payload
            ) {
              this.resetSort()
            } else {
              this.direction =
                this.direction == 'asc' ? 'desc' : 'asc'
            }
          } else {
            this.direction = direction ? direction : 'asc'
          }
          this.field = payload
        }
      }
      this.updateKey()
    },
    resetSort() {
      this.field = this.defaultSort.field
      this.direction = this.defaultSort.direction
      this.counter = 0
    },
    reset() {
      this.field = 'name'
      this.direction = 'asc'
      this.defaultSort.field = 'name'
      this.defaultSort.direction = 'asc'
      this.counter = 0
    },
    updateKey() {
      const commonStore = useCommonStore()
      commonStore.updateKey()
    },
    getSortBy() {
      return [this.field + ',' + this.direction]
    }
  }
})
