import {
  ApiV2PackageControllerApiFactory,
  EntityModelPackageDto,
  EntityModelRRepositoryDto,
  EntityModelRepositoryDto
} from '@/openapi'
import { defineStore } from 'pinia'
import {
  RepositoriesFiltration,
  defaultValues
} from '@/models/Filtration'
import { fetchRepositoriesServices } from '@/services'
import { notify } from '@kyvg/vue3-notification'
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
  repositoryPackages: EntityModelPackageDto[]
}

const packages_api = ApiV2PackageControllerApiFactory()

export const useRepositoryStore = defineStore(
  'repository_store',
  {
    state: (): State => {
      return {
        repositories: [],
        filtration: defaultValues(RepositoriesFiltration),
        chosenRepository: {},
        repositoryPackages: []
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
      async fetchPackages() {
        packages_api
          .getAllPackages(this.chosenRepository.name)
          .then(
            (res) => {
              this.repositoryPackages =
                res.data.data?.content || []
            },
            (msg) => notify({ text: msg, type: 'error' })
          )
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
