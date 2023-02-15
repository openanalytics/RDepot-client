import { EntityModelRRepositoryDto } from '@/openapi'
import { defineStore } from 'pinia'
import repositories from '@/tmpLists/repositories.json'
import { RepositoriesFiltration } from '@/models/Filtration'

interface State {
  repositories: EntityModelRRepositoryDto[]
  filtration: RepositoriesFiltration
}

export const useRepositoryStore = defineStore(
  'repository_store',
  {
    state: (): State => {
      return {
        repositories: [],
        filtration: {
          name: {
            label: 'Name',
            requestName: 'name',
            value: ''
          },
          technology: {
            label: 'Technology',
            requestName: 'technology',
            value: ''
          }
        }
      }
    },
    actions: {
      async fetchRepositories() {
        this.repositories = JSON.parse(
          JSON.stringify(repositories.data)
        )
      },
      async setFiltration(payload: RepositoriesFiltration) {
        this.filtration = payload
        this.fetchRepositories()
      },
      clearFiltration() {
        this.filtration.technology.value = ''
        this.filtration.name.value = ''
      },
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        this.fetchRepositories()
      }
    }
  }
)
