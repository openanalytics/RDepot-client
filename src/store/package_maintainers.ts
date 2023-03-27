import {
  EntityModelPackageMaintainerDto,
  EntityModelPythonRepositoryDto,
  EntityModelRPackageDto,
  PackageMaintainerDto
} from '@/openapi'
import { defineStore } from 'pinia'
import { MaintainersFiltration } from '@/models/Filtration'
import { notify } from '@kyvg/vue3-notification'
import {
  fetchPackagesServices,
  fetchRepositoriesServices
} from '@/services'
import {
  deletePackageMaintainerService,
  fetchPackageMaintainersService,
  patchPackageMaintainerService
} from '@/services/package_maintainers_service'
import { i18n } from '@/plugins/i18n'

interface State {
  maintainers: EntityModelPackageMaintainerDto[]
  filtration: MaintainersFiltration
  repositories: EntityModelPythonRepositoryDto[]
  packages: EntityModelRPackageDto[]
  choosenMaintainer: EntityModelPackageMaintainerDto
  page?: number
  pageSize: number
  howManyPages: number
  totalNumber?: number
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
        howManyPages: 0,
        totalNumber: 0
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
            this.page = res.data.data?.page?.number
            this.totalNumber =
              res.data.data?.page?.totalElements
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
      async deleteChoosenMaintainer() {
        deletePackageMaintainerService(
          this.choosenMaintainer.id || -1
        ).then(
          () => {
            this.fetchMaintainers()
            notify({
              type: 'success',
              text: i18n.t(
                'notifications.successDeletePackageManager',
                this.choosenMaintainer.user?.name || ''
              )
            })
          },
          (msg) => {
            notify({ type: 'error', text: msg })
          }
        )
      },
      async editMaintainer(
        maintainer: PackageMaintainerDto
      ) {
        patchPackageMaintainerService(
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
