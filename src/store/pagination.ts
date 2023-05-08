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
