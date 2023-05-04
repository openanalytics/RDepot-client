import {
  EntityModelRRepositoryDto,
  EntityModelRepositoryDto
} from '@/openapi'
import { defineStore } from 'pinia'
import {
  RepositoriesFiltration,
  defaultValues
} from '@/models/Filtration'
import { fetchRepositoriesServices } from '@/services'
import { usePaginationStore } from './pagination'
import {
  fetchRepositoriesServicesNoLoading,
  updateRepository
} from '@/services/repository_services'
import { createRepository } from '@/services/repository_services'
import { useUtilities } from '@/composable/utilities'

const { deepCopy } = useUtilities()

interface State {
  repositories: EntityModelRepositoryDto[]
  filtration: RepositoriesFiltration
  chosenRepository: EntityModelRRepositoryDto
}

export const useRepositoryStore = defineStore(
  'repository_store',
  {
    state: (): State => {
      return {
        repositories: [],
        filtration: defaultValues(RepositoriesFiltration),
        chosenRepository: {}
      }
    },
    actions: {
      async fetchRepositories() {
        const pagination = usePaginationStore()
        const [repositories, pageData] =
          await fetchRepositoriesServices(
            this.filtration,
            pagination.page,
            pagination.pageSize
          )
        pagination.setTotalNumber(pageData.totalNumber)
        pagination.setPage(pageData.page)
        this.repositories = repositories
      },
      async fetchRepository(name: string) {
        const [repository] =
          await fetchRepositoriesServicesNoLoading({
            name: name
          } as RepositoriesFiltration)
        return repository
      },
      async softDelete() {
        if (this.chosenRepository) {
          this.updateRepository({ deleted: true })
        }
      },
      async updateRepository(
        newValues: Partial<EntityModelRRepositoryDto>
      ) {
        const newRepository = {
          ...deepCopy(this.chosenRepository),
          ...newValues
        }
        await updateRepository(
          this.chosenRepository,
          newRepository
        ).then((success) => {
          if (success) this.fetchRepositories()
        })
      },
      setChosenRepository(id: number | undefined) {
        var flag = true
        this.repositories.forEach((repository) => {
          if (repository.id == id) {
            this.chosenRepository = repository
            flag = false
          }
        })
        if (flag) {
          this.chosenRepository = {}
        }
      },
      async setFiltration(payload: RepositoriesFiltration) {
        const pagination = usePaginationStore()
        pagination.setPage(0)
        this.filtration = payload
        await this.fetchRepositories()
      },
      clearFiltration() {
        const pagination = usePaginationStore()
        pagination.setPage(0)
        this.filtration = defaultValues(
          RepositoriesFiltration
        )
      },
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        await this.fetchRepositories()
      },
      async createRepository(
        newRepository: EntityModelRepositoryDto
      ) {
        await createRepository(newRepository)?.then(
          async (success) => {
            if (success) await this.fetchRepositories()
          }
        )
      }
    }
  }
)
