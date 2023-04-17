import {
  ApiV2PackageControllerApiFactory,
  EntityModelPackageDto,
  EntityModelRepositoryDto
} from '@/openapi'
import { defineStore } from 'pinia'
import { RepositoriesFiltration } from '@/models/Filtration'
import { fetchRepositoriesServices } from '@/services'
import { notify } from '@kyvg/vue3-notification'
import { usePaginationStore } from './pagination'
import { useObjectActions } from '@/composable/objectActions'
import { createRepository } from '@/services/repository_services'

interface State {
  repositories: EntityModelRepositoryDto[]
  filtration: RepositoriesFiltration
  chosenRepository: number
  chosenRepositoryName: string
  repositoryPackages: EntityModelPackageDto[]
}

const packages_api = ApiV2PackageControllerApiFactory()

export const useRepositoryStore = defineStore(
  'repository_store',
  {
    state: (): State => {
      return {
        repositories: [],
        filtration: {
          name: undefined,
          technology: undefined,
          deleted: undefined
        },
        chosenRepository: -1,
        chosenRepositoryName: '',
        repositoryPackages: []
      }
    },
    actions: {
      async fetchRepositories() {
        const pagination = usePaginationStore()
        await fetchRepositoriesServices(
          this.filtration,
          pagination.page,
          pagination.pageSize
        ).then(
          (res) => {
            pagination.setTotalNumber(
              res.data.data?.page?.totalElements || 0
            )
            pagination.setPage(
              res.data.data?.page?.number || 0
            )
            this.repositories = res.data.data?.content || []
          },
          (msg) => {
            pagination.setPage(0)
            notify({ text: msg, type: 'error' })
          }
        )
      },
      async fetchPackages() {
        packages_api
          .getAllPackages(this.chosenRepositoryName)
          .then(
            (res) => {
              this.repositoryPackages =
                res.data.data?.content || []
            },
            (msg) => notify({ text: msg, type: 'error' })
          )
      },
      async setFiltration(payload: RepositoriesFiltration) {
        const pagination = usePaginationStore()
        pagination.setPage(0)
        this.filtration = payload
        this.fetchRepositories()
      },
      async setPage(payload: number) {
        const pagination = usePaginationStore()
        pagination.setPage(payload)
        this.fetchRepositories()
      },
      clearFiltration() {
        const { setAllFields } = useObjectActions()
        setAllFields(this.filtration, undefined)
      },
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        this.fetchRepositories()
      },
      async createRepository(
        newRepository: EntityModelRepositoryDto
      ) {
        newRepository.id = 0
        newRepository.version = 0
        newRepository.deleted = false
        newRepository.published = false
        newRepository.synchronizing = false

        await createRepository(newRepository)?.then(
          async (success) => {
            if (success) await this.fetchRepositories()
          }
        )
      }
    }
  }
)
