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
