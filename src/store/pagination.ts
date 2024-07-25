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

import { useCommonStore } from '@/store/common'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const usePagination = defineStore(
  'pagination',
  () => {
    const commonStore = useCommonStore()
    const totalVisiblePages = ref<number>(10)
    const localPage = ref<number>(1)
    const localPageSize = ref<number>(10)
    const localTotalNumber = ref<number>(0)

    const itemsPerPage = computed(() => {
      const defaultValues = [
        { value: 15, title: '15' },
        { value: 20, title: '20' },
        { value: 30, title: '30' },
        { value: 50, title: '50' },
        { value: 100, title: '100' }
      ]
      const userValue = {
        value: pageSize.value,
        title: pageSize.value.toString()
      }

      return defaultValues
        .concat([userValue])
        .filter(
          (value, index, self) =>
            index ===
            self.findIndex((t) => t.value === value.value)
        )
        .sort(({ value: a }, { value: b }) => a - b)
    })

    const page = computed({
      get: () => {
        return localPage.value
      },
      set: (value) => {
        nextPage(value)
      }
    })

    const fetchPage = computed(() => {
      return localPage.value - 1
    })

    const totalNumber = computed({
      get() {
        return localTotalNumber.value
      },
      set(value) {
        localTotalNumber.value = value
      }
    })

    const pageSize = computed({
      get: () => {
        return localPageSize.value
      },
      set: (value) => {
        if (localPageSize.value > 0) {
          localPageSize.value = value
        }
      }
    })

    const howManyPages = computed(function () {
      if (
        localTotalNumber.value > 0 &&
        localPageSize.value > 0
      ) {
        return Math.ceil(
          localTotalNumber.value / localPageSize.value
        )
      }
      return 0
    })

    function nextPage(value: number) {
      localPage.value = value
      commonStore.updateKey()
    }

    function newPageSize(value: number) {
      pageSize.value = value
      commonStore.updateKey()
    }

    function newPageSizeWithoutRefresh(value: number) {
      pageSize.value = value
    }

    const newPageWithoutRefresh = (value: number) => {
      localPage.value = value + 1
    }

    const resetPage = () => {
      localPage.value = 1
    }

    function newPage(value: number) {
      localPage.value = value
      commonStore.updateKey()
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
      itemsPerPage,
      howManyPages,
      totalVisiblePages,
      newPageWithoutRefresh,
      newPageSizeWithoutRefresh
    }
  }
)
