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

import { Pagination } from '@/services/open_api_access'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type SelectState = 'packages' | 'repositories'
const definedStores = new Map<
  string,
  ReturnType<typeof defineSelectStore>
>()

export const useSelectStoreFactory = (id: SelectState) => {
  if (!definedStores.has(id)) {
    definedStores.set(id, defineSelectStore(id))
  }

  return definedStores.get(id) as ReturnType<
    typeof defineSelectStore
  >
}

function defineSelectStore<SelectState>(id: SelectState) {
  return defineStore(`${id}`, () => {
    const itemsLocal = ref<(string | undefined)[]>([])
    const pendingLocal = ref<boolean>(false)
    const paginationDataLocal = ref<Pagination>({
      page: 0,
      totalNumber: -1
    })

    const ifAllFetched = computed(() => {
      return (
        itemsLocal.value.length >=
        paginationData.value.totalNumber
      )
    })

    const items = computed({
      get() {
        return [...new Set(itemsLocal.value)]
      },
      set(value: (string | undefined)[]) {
        itemsLocal.value = value
      }
    })

    const pending = computed({
      get() {
        return pendingLocal.value
      },
      set(value: boolean) {
        pendingLocal.value = value
      }
    })

    const paginationData = computed({
      get() {
        return paginationDataLocal.value
      },
      set(payload: Pagination) {
        paginationDataLocal.value = payload
        setPage((payload.page += 1))
      }
    })

    function resetPagination() {
      paginationDataLocal.value = {
        page: 0,
        totalNumber: -1
      }
    }

    function setPage(payload: number) {
      paginationDataLocal.value.page = payload
    }

    function addItems(payload: (string | undefined)[]) {
      itemsLocal.value = [
        ...itemsLocal.value,
        ...payload.filter((item) => item !== undefined)
      ]
    }

    function resetItems() {
      itemsLocal.value = []
    }

    return {
      items,
      paginationData,
      resetPagination,
      addItems,
      resetItems,
      pending,
      ifAllFetched
    }
  })
}

export const useSelectStore = (id: SelectState) => {
  return useSelectStoreFactory(id)()
}
