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

import { Pagination } from '@/services/open_api_access'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type SelectState =
  | 'packages'
  | 'repositories'
  | 'repositoryMaintainers'
  | 'packageMaintainers'
  | 'user'
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

export type UserObject = { title: string; value: string }
export type UserObjectCreate = {
  title: string
  value: number
}
export type RepositoryObject = {
  title: string
  value: number
  props: {
    technology: string
  }
}
export type PackageObject = {
  title: string
  value: string
  props: {
    subtitle: string
    repoId: number
  }
}
export type ItemType =
  | string
  | UserObject
  | UserObjectCreate
  | RepositoryObject
  | PackageObject
  | undefined

function defineSelectStore<SelectState>(id: SelectState) {
  return defineStore(`${id}`, () => {
    const itemsLocal = ref<ItemType[]>([])
    const pendingLocal = ref<boolean>(false)
    const pageSize = 8
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

    const shouldFetchNextPage = computed(() => {
      return (
        paginationData.value.totalNumber < 0 ||
        itemsLocal.value.length / pageSize <
          paginationData.value.totalNumber / pageSize
      )
    })

    const items = computed({
      get() {
        return [...new Set(itemsLocal.value)]
      },
      set(value: ItemType[]) {
        itemsLocal.value = value
      }
    })

    const itemsFiltered = computed(() => {
      return items.value.filter(
        (value, index, self) =>
          index ===
          self.findIndex((item) => {
            if (
              typeof item === 'object' &&
              'props' in item &&
              'repoId' in item.props &&
              typeof value === 'object' &&
              'props' in value &&
              'repoId' in value.props
            ) {
              return (
                item.props.repoId === value?.props.repoId &&
                item.title === value.title
              )
            }
            return false
          })
      )
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
        // setPage((payload.page += 1))
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

    function nextPage() {
      setPage(paginationData.value.page + 1)
    }

    function addItems(payload: ItemType[]) {
      itemsLocal.value = [
        ...itemsLocal.value,
        ...payload.filter((item) => item !== undefined)
      ]
    }

    function resetItems() {
      itemsLocal.value = []
    }

    const fetchNextPageCondition = computed(
      () =>
        shouldFetchNextPage.value &&
        ((paginationData.value.totalNumber > 0 &&
          paginationData.value.page <=
            Math.ceil(
              paginationData.value.totalNumber / pageSize
            )) ||
          paginationData.value.totalNumber < 0)
    )

    return {
      items,
      itemsFiltered,
      paginationData,
      resetPagination,
      addItems,
      resetItems,
      pending,
      ifAllFetched,
      pageSize,
      shouldFetchNextPage,
      setPage,
      nextPage,
      fetchNextPageCondition
    }
  })
}

export const useSelectStore = (id: SelectState) => {
  return useSelectStoreFactory(id)()
}
