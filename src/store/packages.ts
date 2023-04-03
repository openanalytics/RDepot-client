import { notify } from '@kyvg/vue3-notification'
import { PackagesFiltration } from '@/models/Filtration'
import { fetchPackagesServices } from '@/services'
import { defineStore } from 'pinia'
import {
  EntityModelPackageDto,
  Link,
  ResponseDtoListVignette,
  RPackageControllerApiFactory
} from '@/openapi'
import {
  fetchPackageServices,
  fetchPackagesWithoutProgressControl,
  updateRPackage
} from '@/services/package_services'
import { usePaginationStore } from './pagination'
import { useObjectActions } from '@/composable/objectActions'

interface State {
  packages: EntityModelPackageDto[]
  package?: EntityModelPackageDto
  vignettes: ResponseDtoListVignette
  filtration: PackagesFiltration
  next?: boolean
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
        },
        next: false
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
            this.packages = res.data.data?.content || []
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
      async fetchAllPackages(page: number = 0) {
        if (page == 0) {
          this.packages = []
        }
        await fetchPackagesWithoutProgressControl(
          undefined,
          page ? page : 0,
          10
        )
          .then(
            (res) => {
              this.next = ifNext(res.data.data?.links)
              if (res.data.data?.content) {
                this.packages = this.packages?.concat(
                  res.data.data?.content
                )
              }
            },
            (msg) => {
              this.packages = []
              notify({ text: msg, type: 'error' })
            }
          )
          .finally(() => {
            if (this.next) {
              this.fetchAllPackages(page + 1)
            }
          })
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
      async setPage(payload: number) {
        const pagination = usePaginationStore()
        pagination.setPage(payload)
        this.fetchPackages()
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
        this.fetchPackages()
      },
      async setFiltrationByRepositoryOnly(payload: string) {
        this.clearFiltration()
        this.filtration.repository = payload
      },
      clearFiltration() {
        const { setAllFields } = useObjectActions()
        setAllFields(this.filtration, undefined)
      },
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        this.fetchPackages()
      }
    }
  }
)

function ifNext(links?: Link[]): boolean {
  var flag: boolean = false
  if (links != undefined) {
    links.forEach((link: Link) => {
      if (link.rel === 'next') {
        console.log('here')
        // return true
        flag = true
      }
    })
  }
  return flag
}
