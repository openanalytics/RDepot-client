import {
  defaultValues,
  PackagesFiltration
} from '@/models/Filtration'
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

interface State {
  packages: EntityModelPackageDto[]
  package?: EntityModelPackageDto
  vignettes: ResponseDtoListVignette
  filtration: PackagesFiltration
  chosenPackageId?: number
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
        filtration: defaultValues(PackagesFiltration),
        chosenPackageId: undefined,
        next: false
      }
    },
    actions: {
      async fetchPageOfPackages(
        page: number,
        pageSize: number = 8
      ) {
        const pageData = await this.fetchData(
          page,
          pageSize,
          false
        )
        return pageData
      },
      async fetchPackages() {
        const pagination = usePaginationStore()
        const pageData = await this.fetchData(
          pagination.page,
          pagination.pageSize
        )
        pagination.setPage(pageData.page)
        pagination.setTotalNumber(pageData.totalNumber)
      },
      async fetchData(
        page: number,
        pageSize: number,
        showProgress: boolean = true
      ) {
        const [packages, pageData] =
          await fetchPackagesServices(
            this.filtration,
            page,
            pageSize,
            showProgress
          )
        this.packages = packages
        return pageData
      },
      async fetchPackage(id: number) {
        this.package = await fetchPackageServices(id)
      },
      async activatePackage(
        newPackage: EntityModelPackageDto
      ) {
        const oldPackage = JSON.parse(
          JSON.stringify(newPackage)
        ) as EntityModelPackageDto
        oldPackage.active = !newPackage.active
        await updateRPackage(oldPackage, newPackage).then(
          async (success) => {
            if (success) await this.fetchPackages()
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
        this.filtration = PackagesFiltration.parse(payload)
        await this.fetchPackages()
      },
      setFiltrationByRepositoryOnly(payload?: string) {
        this.filtration = defaultValues(PackagesFiltration)
        this.filtration.repository = payload
      },
      clearFiltration() {
        console.log('clear filtration')

        const pagination = usePaginationStore()
        pagination.setPage(0)
        this.filtration = defaultValues(PackagesFiltration)
      },
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        await this.fetchPackages()
      },
      setChosenPackage(id?: number) {
        this.chosenPackageId = id
      }
    }
  }
)
