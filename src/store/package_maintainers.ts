import {
  EntityModelPackageMaintainerDto,
  EntityModelPythonRepositoryDto,
  EntityModelRPackageDto,
  PackageMaintainerDto
} from '@/openapi'
import { defineStore } from 'pinia'
import { PackageMaintainersFiltration } from '@/models/Filtration'
import {
  fetchPackagesServices,
  fetchRepositoriesServices
} from '@/services'
import {
  deletePackageMaintainerService,
  fetchPackageMaintainersService,
  updatePackageMaintainerService
} from '@/services/package_maintainers_service'
import { usePaginationStore } from '@/store/pagination'
import { useObjectActions } from '@/composable/objectActions'

interface State {
  maintainers: EntityModelPackageMaintainerDto[]
  filtration: PackageMaintainersFiltration
  repositories: EntityModelPythonRepositoryDto[]
  packages: EntityModelRPackageDto[]
  chosenMaintainer: EntityModelPackageMaintainerDto
}

export const usePackageMaintainersStore = defineStore(
  'package_maintainers_store',
  {
    state: (): State => {
      return {
        maintainers: [],
        filtration: {
          deleted: undefined,
          technologies: undefined
        },
        repositories: [],
        packages: [],
        chosenMaintainer: {}
      }
    },
    actions: {
      async fetchMaintainers() {
        const pagination = usePaginationStore()
        const [maintainers, pageData] =
          await fetchPackageMaintainersService(
            this.filtration,
            pagination.page,
            pagination.pageSize
          )
        pagination.setPage(pageData.page)
        pagination.setTotalNumber(pageData.totalNumber)
        this.maintainers = maintainers
      },
      async fetchRepositories() {
        const [repositories] =
          await fetchRepositoriesServices()
        this.repositories = repositories
      },
      async fetchPackages() {
        const [packages] = await fetchPackagesServices()
        this.packages = packages
      },
      setChosenMaintainer(
        payload: EntityModelPackageMaintainerDto
      ) {
        this.chosenMaintainer = payload
        this.saveMaintainer()
      },
      saveMaintainer() {
        this.maintainers = this.maintainers.map(
          (maintainer: EntityModelPackageMaintainerDto) => {
            if (maintainer.id == this.chosenMaintainer.id) {
              return this.chosenMaintainer
            }
            return maintainer
          }
        )
      },
      async softDelete() {
        if (this.chosenMaintainer) {
          let newRepositoryMaintainer: EntityModelPackageMaintainerDto =
            JSON.parse(
              JSON.stringify(this.chosenMaintainer)
            )
          newRepositoryMaintainer.deleted = true
          this.editMaintainer(newRepositoryMaintainer)
        }
      },
      async setFiltration(
        payload: PackageMaintainersFiltration
      ) {
        const pagination = usePaginationStore()
        pagination.setPage(0)
        this.filtration = payload
        await this.fetchMaintainers()
      },
      clearFiltration() {
        const pagination = usePaginationStore()
        pagination.setPage(0)
        const { setAllFields } = useObjectActions()
        setAllFields(this.filtration, undefined)
      },
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        await this.fetchMaintainers()
      },
      async deleteChosenMaintainer() {
        deletePackageMaintainerService(
          this.chosenMaintainer
        ).then(async (success) => {
          if (success) await this.fetchMaintainers()
        })
      },
      async editMaintainer(
        maintainer: PackageMaintainerDto
      ) {
        updatePackageMaintainerService(
          this.chosenMaintainer,
          maintainer
        ).then(async (success) => {
          if (success) await this.fetchMaintainers()
        })
      }
    }
  }
)
