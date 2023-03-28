import { useCommonStore } from '@/store/common'
import { usePaginationStore } from '@/store/pagination'
import { computed } from 'vue'

export function usePagination() {
  const common_store = useCommonStore()
  const pagination = usePaginationStore()

  const page = computed({
    get: () => {
      if (pagination.page) return pagination.page + 1
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
