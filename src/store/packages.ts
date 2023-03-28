import { notify } from '@kyvg/vue3-notification'
import { PackagesFiltration } from '@/models/Filtration'
import { fetchPackagesServices } from '@/services'
import { defineStore } from 'pinia'
import {
  EntityModelPackageDto,
  ResponseDtoListVignette,
  RPackageControllerApiFactory
} from '@/openapi'
import {
  fetchPackageServices,
  updateRPackage
} from '@/services/package_services'
import { usePaginationStore } from './pagination'
import { p } from 'vitest/dist/index-1cfc7f58'

interface State {
  packages?: EntityModelPackageDto[]
  package?: EntityModelPackageDto
  vignettes: ResponseDtoListVignette
  filtration: PackagesFiltration
}

export const usePackagesStore = defineStore(
  'packages_store',
  {
    state: (): State => {
      return {
        packages: [],
        package: {},
        vignettes: {},
        filtration: {
          state: undefined,
          deleted: undefined,
          repository: undefined,
          technology: undefined
        }
      }
    },
    actions: {
      async fetchPackages() {
        const pagination = usePaginationStore()
        fetchPackagesServices(
          this.filtration,
          pagination.page,
          pagination.pageSize
        ).then(
          (res) => {
            this.packages = res.data.data?.content
            pagination.setPage(
              res.data.data?.page?.number || 0
            )
            pagination.setTotalNumber(
              res.data.data?.page?.totalElements || 0
            )
          },
          (msg) => {
            this.packages = []
            pagination.setPage(0)
            notify({ text: msg, type: 'error' })
          }
        )
      },
      async fetchPackage(id: number) {
        fetchPackageServices(id).then(
          (res) => (this.package = res.data.data),
          (msg) => {
            this.package = {}
            notify({ text: msg, type: 'error' })
          }
        )
      },
      async activatePackage(id: number, value: boolean) {
        updateRPackage(id, 'active', value).then(
          () => {
            this.fetchPackages()
          },
          (msg) => {
            notify({ text: msg, type: 'error' })
          }
        )
      },
      async downloadManual() {
        const rPackageApi = RPackageControllerApiFactory()
        if (this.package?.id) {
          return rPackageApi.downloadReferenceManual(
            this.package.id
          )
        }
      },
      async setFiltration(payload: PackagesFiltration) {
        const pagination = usePaginationStore()
        pagination.setPage(0)
        this.filtration = payload
      },
      clearFiltration() {
        this.filtration.state = undefined
        this.filtration.repository = undefined
        this.filtration.technology = undefined
        this.filtration.deleted = false
      },
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        this.fetchPackages()
      }
    }
  }
)
