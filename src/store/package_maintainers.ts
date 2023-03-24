import {
  EntityModelPackageMaintainerDto,
  EntityModelPythonRepositoryDto,
  EntityModelRPackageDto
} from '@/openapi'
import { defineStore } from 'pinia'
import { MaintainersFiltration } from '@/models/Filtration'
import { notify } from '@kyvg/vue3-notification'
import {
  fetchPackagesServices,
  fetchRepositoriesServices
} from '@/services'
import { fetchPackageMaintainersService } from '@/services/package_maintainers_service'

interface State {
  maintainers: EntityModelPackageMaintainerDto[]
  filtration: MaintainersFiltration
  repositories: EntityModelPythonRepositoryDto[]
  packages: EntityModelRPackageDto[]
  choosenMaintainer: EntityModelPackageMaintainerDto
  page: number
  pageSize: number
  howManyPages: number
}

export const usePackageMaintainersStore = defineStore(
  'package_maintainers_store',
  {
    state: (): State => {
      return {
        maintainers: [],
        filtration: {
          deleted: false,
          technology: ''
        },
        repositories: [],
        packages: [],
        choosenMaintainer: {},
        page: 0,
        pageSize: 10,
        howManyPages: 0
      }
    },
    actions: {
      async fetchMaintainers() {
        fetchPackageMaintainersService(
          this.filtration,
          this.page,
          this.pageSize
        ).then(
          (res) => {
            this.maintainers = res.data.data?.content || []
          },
          (msg) => {
            notify({ type: 'error', text: msg })
          }
        )
      },
      async fetchRepositories() {
        fetchRepositoriesServices().then(
          (res) => {
            this.repositories = res.data.data?.content || []
          },
          (msg) => {
            notify({ type: 'error', text: msg })
          }
        )
      },
      async fetchPackages() {
        fetchPackagesServices().then(
          (res) => {
            this.packages = res.data.data?.content || []
          },
          (msg) => {
            notify({ type: 'error', text: msg })
          }
        )
      },
      async setChoosenMaintainer(
        payload: EntityModelPackageMaintainerDto
      ) {
        this.choosenMaintainer = payload
        this.saveMaintainer()
      },
      async saveMaintainer() {
        this.maintainers = this.maintainers.map(
          (maintainer: EntityModelPackageMaintainerDto) => {
            if (
              maintainer.id == this.choosenMaintainer.id
            ) {
              return this.choosenMaintainer
            }
            return maintainer
          }
        )
      },
      async setFiltration(payload: MaintainersFiltration) {
        this.filtration = payload
        this.fetchMaintainers()
      },
      clearFiltration() {
        this.filtration.technology = ''
        this.filtration.deleted = false
      },
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        this.fetchMaintainers()
      }
    }
  }
)
