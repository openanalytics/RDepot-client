import { PackagesFiltration } from '@/models/Filtration'
import vignettes from '@/tmpLists/rPackageVignettes.json'
import { defineStore } from 'pinia'
import {
  EntityModelPackageDto,
  ResponseDtoListVignette,
  RPackageControllerApiFactory
} from '@/openapi'
import { notify } from '@kyvg/vue3-notification'
import { fetchPackagesServices } from '@/services'

interface State {
  packages?: EntityModelPackageDto[]
  package: EntityModelPackageDto
  vignettes: ResponseDtoListVignette
  page?: number
  pageSize: number
  totalNumber?: number
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
        page: 0,
        pageSize: 10,
        totalNumber: 0,
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
        fetchPackagesServices(
          this.filtration,
          this.page,
          this.pageSize
        ).then(
          (res) => {
            this.totalNumber =
              res.data.data?.page?.totalElements
            this.page = res.data.data?.page?.number
            this.packages = res.data.data?.content
          },
          (msg) => {
            this.packages = []
            this.page = 0
            notify({ text: msg, type: 'error' })
          }
        )
      },
      async fetchPackage(name: string) {
        this.vignettes = JSON.parse(
          JSON.stringify(vignettes)
        )
      },
      async downloadManual() {
        const rPackageApi = RPackageControllerApiFactory()
        if (this.package.id) {
          return rPackageApi.downloadReferenceManual(
            this.package.id
          )
        }
      },
      async setPage(payload: number) {
        this.page = payload
        this.fetchPackages()
      },
      async setPageSize(payload: number) {
        if (payload > 0) {
          this.pageSize = payload
        }
      },
      async setFiltration(payload: PackagesFiltration) {
        this.filtration = payload
        this.page = 1
        this.fetchPackages()
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
