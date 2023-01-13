import { Repository } from '@/models/repositories/Repository'
import { defineStore } from 'pinia'

interface State {
  repositories: Repository[]
}

export const useRepositoryStore = defineStore('repository_store', {
  state: (): State => {
    return {
      repositories: []
    }
  },
  actions: {
    async fetchRepositories() {
      // let repositories = await fetchRepositoriesServices()
      // this.repositories = repositories
    }
  }
})


