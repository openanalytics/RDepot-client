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

interface State {
  maintainers: EntityModelRepositoryMaintainerDto[]
  filtration: RepositoryMaintainersFiltration
  repositories: EntityModelRepositoryDto[]
  chosenMaintainer?: number
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
        chosenMaintainer: undefined
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
        fetchRepositoriesServices().then(
          (res) => {
            this.repositories = res.data.data?.content || []
          },
          (msg) => {
            notify({ text: msg, type: 'error' })
          }
        )
      },
      async updateMaintainer(fields: Map<string, any>) {
        if (this.chosenMaintainer) {
          updateRepositoryMaintainer(
            this.chosenMaintainer,
            fields
          ).then(
            () => {
              this.fetchMaintainers()
            },
            (msg) => {
              notify({ text: msg, type: 'error' })
            }
          )
        }
      },
      async deleteMaintainer() {
        if (this.chosenMaintainer) {
          await deletedRepositoryMaintainer(
            this.chosenMaintainer
          ).then(
            () => {
              notify({
                text: 'Repository maintainer deleted',
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
      async setPage(payload: number) {
        const pagination = usePaginationStore()
        pagination.setPage(payload)
        this.fetchMaintainers()
      },
      async setChosenMaintainer(id?: number) {
        this.chosenMaintainer = id
      },
      async setFiltration(
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
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        this.fetchMaintainers()
      }
    }
  }
)
