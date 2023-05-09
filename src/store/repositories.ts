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
      async fetchPageOfRepositories(
        page: number,
        pageSize: number = 8
      ) {
        const pageData = await this.fetchData(
          page,
          pageSize,
          false
        )
        return pageData
      },
      async fetchRepositories() {
        const pagination = usePaginationStore()
        const pageData = await this.fetchData(
          pagination.page,
          pagination.pageSize
        )
        pagination.setPage(pageData.page)
        pagination.setTotalNumber(pageData.totalNumber)
      },
      async fetchData(
        page: number,
        pageSize: number,
        showProgress: boolean = true
      ) {
        const [repositories, pageData] =
          await fetchRepositoriesServices(
            this.filtration,
            page,
            pageSize,
            showProgress
          )
        this.repositories = repositories
        return pageData
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
          let newRepository: EntityModelRRepositoryDto =
            JSON.parse(
              JSON.stringify(this.chosenRepository)
            )
          newRepository.deleted = true
          this.updateRepository(newRepository)
        }
      },
      async updateRepository(
        newRepository: EntityModelRRepositoryDto
      ) {
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
        this.filtration =
          RepositoriesFiltration.parse(payload)
        await this.fetchRepositories()
      },
      setFiltrationByName(payload: string | undefined) {
        this.clearFiltration()
        this.filtration.name = payload
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
