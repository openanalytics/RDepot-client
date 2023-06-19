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

import { useCommonStore } from '@/store/common'
import { usePaginationStore } from '@/store/pagination'
import { computed } from 'vue'

export function usePagination() {
  const common_store = useCommonStore()
  const pagination = usePaginationStore()

  const page = computed({
    get: () => {
      if (pagination.page) return pagination.page + 1
      return 0
    },
    set: (value) => {
      if (value) nextPage(value - 1)
    }
  })

  const howManyPages = computed(function () {
    if (pagination.totalNumber && pagination.pageSize) {
      return Math.ceil(
        pagination.totalNumber / pagination.pageSize
      )
    }
    return 0
  })

  function nextPage(value: number) {
    pagination.page = value
    common_store.updateKey()
  }

  function newPageSize(value: number) {
    pagination.pageSize = value
    common_store.updateKey()
  }

  function newPage(value: number) {
    pagination.page = value
    common_store.updateKey()
  }

  return {
    page,
    howManyPages,
    nextPage,
    newPageSize,
    newPage
  }
}
