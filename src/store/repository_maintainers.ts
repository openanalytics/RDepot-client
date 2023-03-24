import {
  EntityModelPackageMaintainerDto,
  EntityModelRepositoryMaintainerDto
} from '@/openapi'
import { defineStore } from 'pinia'
import repositories from '@/tmpLists/repositories.json'
import { MaintainersFiltration } from '@/models/Filtration'
import {
  deletedRepositoryMaintainer,
  fetchRepositoryMaintainersServices,
  updateRepositoryMaintainer
} from '@/services/repository_maintainers_services'
import { notify } from '@kyvg/vue3-notification'

interface State {
  maintainers?: EntityModelRepositoryMaintainerDto[]
  filtration: MaintainersFiltration
  repositories: EntityModelRepositoryMaintainerDto[]
  choosenMaintainer: EntityModelPackageMaintainerDto
}

export const useRepositoryMaintainersStore = defineStore(
  'repository_maintainers_store',
  {
    state: (): State => {
      return {
        maintainers: [],
        filtration: {
          deleted: false,
          technology: ''
        },
        repositories: [],
        choosenMaintainer: {}
      }
    },
    actions: {
      async fetchMaintainers() {
        await fetchRepositoryMaintainersServices().then(
          (res) => {
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
      async setChoosenMaintainer(
        payload: EntityModelRepositoryMaintainerDto
      ) {
        this.choosenMaintainer = payload
      },
      async saveMaintainer() {
        if (
          this.choosenMaintainer.id &&
          this.choosenMaintainer.repository &&
          this.choosenMaintainer.repository.id
        ) {
          await updateRepositoryMaintainer(
            this.choosenMaintainer.id,
            this.choosenMaintainer.repository?.id
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
        if (this.choosenMaintainer.id) {
          await deletedRepositoryMaintainer(
            this.choosenMaintainer.id
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
