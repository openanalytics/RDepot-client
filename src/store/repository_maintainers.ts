import {
  EntityModelPackageMaintainerDto,
  EntityModelRepositoryMaintainerDto
} from '@/openapi'
import { defineStore } from 'pinia'
import repository_maintainers from '@/tmpLists/repositoryMaintainers.json'
import repositories from '@/tmpLists/repositories.json'
import { MaintainersFiltration } from '@/models/Filtration'

interface State {
  maintainers: EntityModelRepositoryMaintainerDto[]
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
        this.maintainers = JSON.parse(
          JSON.stringify(repository_maintainers.data)
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
        this.saveMaintainer()
      },
      async saveMaintainer() {
        this.maintainers = this.maintainers.map(
          (
            maintainer: EntityModelRepositoryMaintainerDto
          ) => {
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
