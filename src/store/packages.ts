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
  updateRPackage
} from '@/services/package_services'
import { usePaginationStore } from './pagination'
import { useObjectActions } from '@/composable/objectActions'

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
        filtration: {
          state: undefined,
          deleted: undefined,
          repository: undefined,
          technologies: undefined
        },
        chosenPackageId: undefined,
        next: false
      }
    },
    actions: {
      async fetchPackages() {
        const pagination = usePaginationStore()
        const [packages, pageData] =
          await fetchPackagesServices(
            this.filtration,
            pagination.page,
            pagination.pageSize
          )
        this.packages = packages
        pagination.setPage(pageData.page)
        pagination.setTotalNumber(pageData.totalNumber)
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
        this.filtration = payload
        await this.fetchPackages()
      },
      setFiltrationByRepositoryOnly(payload: string) {
        this.clearFiltration()
        this.filtration.repository = payload
      },
      clearFiltration() {
        const pagination = usePaginationStore()
        pagination.setPage(0)
        const { setAllFields } = useObjectActions()
        setAllFields(this.filtration, undefined)
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