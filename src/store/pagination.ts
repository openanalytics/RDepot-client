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
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const usePagination = defineStore(
  'pagination',
  () => {
    const common_store = useCommonStore()
    const totalVisiblePages = ref<number>(10)
    const local_page = ref<number>(1)
    const local_page_size = ref<number>(10)
    const local_total_number = ref<number>(0)

    const page = computed({
      get: () => {
        return local_page.value
      },
      set: (value) => {
        nextPage(value)
      }
    })

    const fetchPage = computed(() => {
      return local_page.value - 1
    })

    const totalNumber = computed({
      get() {
        return local_total_number.value
      },
      set(value) {
        local_total_number.value = value
      }
    })

    const pageSize = computed({
      get: () => {
        return local_page_size.value
      },
      set: (value) => {
        if (local_page_size.value > 0) {
          local_page_size.value = value
        }
      }
    })

    const howManyPages = computed(function () {
      if (
        local_total_number.value > 0 &&
        local_page_size.value > 0
      ) {
        return Math.ceil(
          local_total_number.value / local_page_size.value
        )
      }
      return 0
    })

    function nextPage(value: number) {
      local_page.value = value
      common_store.updateKey()
    }

    function newPageSize(value: number) {
      pageSize.value = value
      common_store.updateKey()
    }

    function newPageSizeWithoutRefresh(value: number) {
      pageSize.value = value
    }

    let newPageWithoutRefresh = (value: number) => {
      local_page.value = value + 1
    }

    let resetPage = () => {
      local_page.value = 1
    }

    function newPage(value: number) {
      local_page.value = value
      common_store.updateKey()
    }

    return {
      page,
      newPage,
      nextPage,
      pageSize,
      resetPage,
      fetchPage,
      newPageSize,
      totalNumber,
      howManyPages,
      totalVisiblePages,
      newPageWithoutRefresh,
      newPageSizeWithoutRefresh
    }
  }
)
