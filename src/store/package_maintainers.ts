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
        return fetchPackageMaintainersService(
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
        return fetchRepositoriesServices().then(
          (res) => {
            this.repositories = res.data.data?.content || []
          },
          (msg) => {
            notify({ type: 'error', text: msg })
          }
        )
      },
      async fetchPackages() {
        return fetchPackagesServices().then(
          (res) => {
            this.packages = res.data.data?.content || []
          },
          (msg) => {
            notify({ type: 'error', text: msg })
          }
        )
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
      async setFiltration(
        payload: PackageMaintainersFiltration
      ) {
        const pagination = usePaginationStore()
        pagination.setPage(0)
        this.filtration = payload
        return this.fetchMaintainers()
      },
      clearFiltration() {
        const { setAllFields } = useObjectActions()
        setAllFields(this.filtration, undefined)
      },
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        return this.fetchMaintainers()
      },
      async deleteChosenMaintainer() {
        return deletePackageMaintainerService(
          this.chosenMaintainer.id || -1
        ).then(
          () => {
            notify({
              type: 'success',
              text: i18n.t(
                'notifications.successDeletePackageManager',
                this.chosenMaintainer.user?.name || ''
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
        return updatePackageMaintainerService(
          maintainer,
          this.chosenMaintainer
        ).then(
          () => {
            notify({
              type: 'success',
              text: i18n.t(
                'notifications.successUpdatePackageManager',
                this.chosenMaintainer.user?.name || ''
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
