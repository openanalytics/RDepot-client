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

interface State {
  page: number
  pageSize: number
  totalNumber?: number
  totalVisiblePages: number
}

export const usePaginationStore = defineStore(
  'pagination_store',
  {
    state: (): State => {
      return {
        page: 0,
        pageSize: 10,
        totalNumber: 0,
        totalVisiblePages: 10
      }
    },
    actions: {
      setPage(page: number): void {
        this.page = page
      },
      setPageSize(pageSize: number): void {
        if (pageSize > 0) {
          this.pageSize = pageSize
        }
      },
      setTotalNumber(totalNumber: number): void {
        this.totalNumber = totalNumber
      }
    }
  }
)
