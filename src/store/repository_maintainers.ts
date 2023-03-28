import {
  EntityModelPackageMaintainerDto,
  EntityModelRepositoryMaintainerDto
} from '@/openapi'
import { defineStore } from 'pinia'
import repositories from '@/tmpLists/repositories.json'
import { RepositoryMaintainersFiltration } from '@/models/Filtration'
import {
  deletedRepositoryMaintainer,
  fetchRepositoryMaintainersServices,
  updateRepositoryMaintainer
} from '@/services/repository_maintainers_services'
import { notify } from '@kyvg/vue3-notification'
import { usePaginationStore } from './pagination'

interface State {
  maintainers?: EntityModelRepositoryMaintainerDto[]
  filtration: RepositoryMaintainersFiltration
  repositories: EntityModelRepositoryMaintainerDto[]
  chosenMaintainer: EntityModelPackageMaintainerDto
}

export const useRepositoryMaintainersStore = defineStore(
  'repository_maintainers_store',
  {
    state: (): State => {
      return {
        maintainers: [],
        filtration: {
          deleted: false,
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
            this.maintainers = res.data.data?.content
          },
          (msg) => {
            notify({ text: msg, type: 'error' })
          }
        )
      },
      async fetchRepositories() {
        this.repositories = JSON.parse(
          JSON.stringify(repositories.data)
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
      async setFiltration(
        payload: RepositoryMaintainersFiltration
      ) {
        const pagination = usePaginationStore()
        pagination.setPage(0)
        this.filtration = payload
        this.fetchMaintainers()
      },
      clearFiltration() {
        this.filtration.technologies = undefined
        this.filtration.deleted = false
      },
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        this.fetchMaintainers()
      }
    }
  }
)
