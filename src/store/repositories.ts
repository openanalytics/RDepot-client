import {
  EntityModelPackageDtoObjectObject,
  EntityModelRRepositoryDto
} from '@/openapi'
import { defineStore } from 'pinia'
import repositories from '@/tmpLists/repositories.json'
import packages from '@/tmpLists/packages.json'
import { RepositoriesFiltration } from '@/models/Filtration'

interface State {
  repositories: EntityModelRRepositoryDto[]
  filtration: RepositoriesFiltration
  choosenRepository: number
  repositoryPackages: EntityModelPackageDtoObjectObject[]
}

export const useRepositoryStore = defineStore(
  'repository_store',
  {
    state: (): State => {
      return {
        repositories: [],
        filtration: {
          name: '',
          technology: ''
        },
        choosenRepository: -1,
        repositoryPackages: []
      }
    },
    actions: {
      async fetchRepositories() {
        this.repositories = JSON.parse(
          JSON.stringify(repositories.data)
        )
      },
      async fetchPackages() {
        this.repositoryPackages = JSON.parse(
          JSON.stringify(packages.page2)
        )
      },
      async setFiltration(payload: RepositoriesFiltration) {
        this.filtration = payload
        this.fetchRepositories()
      },
      clearFiltration() {
        this.filtration.technology = ''
        this.filtration.name = ''
      },
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        this.fetchRepositories()
      }
    }
  }
)
