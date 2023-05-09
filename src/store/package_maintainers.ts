import {
  EntityModelPackageMaintainerDto,
  EntityModelPythonRepositoryDto,
  EntityModelRPackageDto,
  PackageMaintainerDto
} from '@/openapi'
import { defineStore } from 'pinia'
import {
  PackageMaintainersFiltration,
  defaultValues
} from '@/models/Filtration'
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
import { useUtilities } from '@/composable/utilities'

interface State {
  maintainers: EntityModelPackageMaintainerDto[]
  filtration: PackageMaintainersFiltration
  repositories: EntityModelPythonRepositoryDto[]
  packages: EntityModelRPackageDto[]
  chosenMaintainer: EntityModelPackageMaintainerDto
}

const { deepCopy } = useUtilities()

export const usePackageMaintainersStore = defineStore(
  'package_maintainers_store',
  {
    state: (): State => {
      return {
        maintainers: [],
        filtration: defaultValues(
          PackageMaintainersFiltration
        ),
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
          this.updateMaintainer({ deleted: true })
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
        this.filtration = defaultValues(
          PackageMaintainersFiltration
        )
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
      async updateMaintainer(
        newValues: Partial<PackageMaintainerDto>
      ) {
        const newMaintainer = {
          ...deepCopy(this.chosenMaintainer),
          ...newValues
        }
        updatePackageMaintainerService(
          this.chosenMaintainer,
          newMaintainer
        ).then(async (success) => {
          if (success) await this.fetchMaintainers()
        })
      }
    }
  }
)
