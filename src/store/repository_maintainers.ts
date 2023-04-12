import {
  EntityModelPackageMaintainerDto,
  EntityModelRepositoryDto,
  EntityModelRepositoryMaintainerDto
} from '@/openapi'
import { defineStore } from 'pinia'
import { RepositoryMaintainersFiltration } from '@/models/Filtration'
import {
  deletedRepositoryMaintainer,
  fetchRepositoryMaintainersServices,
  updateRepositoryMaintainer
} from '@/services/repository_maintainers_services'
import { notify } from '@kyvg/vue3-notification'
import { usePaginationStore } from './pagination'
import { useObjectActions } from '@/composable/objectActions'
import { fetchRepositoriesServices } from '@/services'
import { i18n } from '@/plugins/i18n'

interface State {
  maintainers: EntityModelRepositoryMaintainerDto[]
  filtration: RepositoryMaintainersFiltration
  repositories: EntityModelRepositoryDto[]
  chosenMaintainer: EntityModelPackageMaintainerDto
}

export const useRepositoryMaintainersStore = defineStore(
  'repository_maintainers_store',
  {
    state: (): State => {
      return {
        maintainers: [],
        filtration: {
          deleted: undefined,
          technologies: undefined
        },
        repositories: [],
        chosenMaintainer: {}
      }
    },
    actions: {
      async fetchMaintainers() {
        const pagination = usePaginationStore()
        await fetchRepositoryMaintainersServices(
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
            notify({ text: msg, type: 'error' })
          }
        )
      },
      async fetchRepositories() {
        await fetchRepositoriesServices().then(
          (res) => {
            this.repositories = res.data.data?.content || []
          },
          (msg) => {
            notify({ text: msg, type: 'error' })
          }
        )
      },
      async setChosenMaintainer(
        payload: EntityModelRepositoryMaintainerDto
      ) {
        this.chosenMaintainer = payload
      },
      async saveMaintainer() {
        if (
          this.chosenMaintainer.id &&
          this.chosenMaintainer.repository &&
          this.chosenMaintainer.repository.id
        ) {
          await updateRepositoryMaintainer(
            this.chosenMaintainer.id,
            this.chosenMaintainer.repository?.id
          ).then(
            () => {
              this.fetchMaintainers()
              notify({
                text: i18n.t(
                  'notifications.successUpdateRepositoryManager',
                  this.chosenMaintainer.user?.name || ''
                ),
                type: 'success'
              })
            },
            (msg) => {
              notify({ text: msg, type: 'error' })
            }
          )
        }
      },
      async deleteMaintainer() {
        if (this.chosenMaintainer.id) {
          await deletedRepositoryMaintainer(
            this.chosenMaintainer.id
          ).then(
            () => {
              notify({
                text: i18n.t(
                  'notifications.successDeleteRepositoryManager',
                  this.chosenMaintainer.user?.name || ''
                ),
                type: 'success'
              })
              this.fetchMaintainers()
            },
            (msg) => {
              notify({ text: msg, type: 'error' })
            }
          )
        }
      },
      setFiltration(
        payload: RepositoryMaintainersFiltration
      ) {
        const pagination = usePaginationStore()
        pagination.setPage(0)
        this.filtration = payload
        this.fetchMaintainers()
      },
      clearFiltration() {
        const { setAllFields } = useObjectActions()
        setAllFields(this.filtration, undefined)
      },
      clearFiltrationAndFetch() {
        this.clearFiltration()
        this.fetchMaintainers()
      }
    }
  }
)
