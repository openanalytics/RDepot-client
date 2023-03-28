import {
  EntityModelPackageMaintainerDto,
  EntityModelPythonRepositoryDto,
  EntityModelRPackageDto,
  PackageMaintainerDto
} from '@/openapi'
import { defineStore } from 'pinia'
import { PackageMaintainersFiltration } from '@/models/Filtration'
import { notify } from '@kyvg/vue3-notification'
import {
  fetchPackagesServices,
  fetchRepositoriesServices
} from '@/services'
import {
  deletePackageMaintainerService,
  fetchPackageMaintainersService,
  updatePackageMaintainerService
} from '@/services/package_maintainers_service'
import { i18n } from '@/plugins/i18n'
import { usePaginationStore } from './pagination'

interface State {
  maintainers: EntityModelPackageMaintainerDto[]
  filtration: PackageMaintainersFiltration
  repositories: EntityModelPythonRepositoryDto[]
  packages: EntityModelRPackageDto[]
  choosenMaintainer: EntityModelPackageMaintainerDto
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
        choosenMaintainer: {}
      }
    },
    actions: {
      async fetchMaintainers() {
        const pagination = usePaginationStore()
        fetchPackageMaintainersService(
          this.filtration,
          pagination.page,
          pagination.pageSize
        ).then(
          (res) => {
            pagination.setPage(
              res.data.data?.page?.number || 0
            )
            pagination.setTotalNumber(
              res.data.data?.page?.totalElements || 0
            )
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
      async setFiltration(
        payload: PackageMaintainersFiltration
      ) {
        const pagination = usePaginationStore()
        pagination.setPage(0)
        this.filtration = payload
        this.fetchMaintainers()
      },
      clearFiltration() {
        this.filtration.technologies = undefined
        this.filtration.deleted = undefined
      },
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        this.fetchMaintainers()
      },
      async deleteChoosenMaintainer() {
        deletePackageMaintainerService(
          this.choosenMaintainer.id || -1
        ).then(
          () => {
            notify({
              type: 'success',
              text: i18n.t(
                'notifications.successDeletePackageManager',
                this.choosenMaintainer.user?.name || ''
              )
            })
            this.fetchMaintainers()
          },
          (msg) => {
            notify({ type: 'error', text: msg })
          }
        )
      },
      async editMaintainer(
        maintainer: PackageMaintainerDto
      ) {
        updatePackageMaintainerService(
          maintainer,
          this.choosenMaintainer
        ).then(
          () => {
            notify({
              type: 'success',
              text: i18n.t(
                'notifications.successUpdatePackageManager',
                this.choosenMaintainer.user?.name || ''
              )
            })
            this.fetchMaintainers()
          },
          (msg) => notify({ type: 'error', text: msg })
        )
      }
    }
  }
)
