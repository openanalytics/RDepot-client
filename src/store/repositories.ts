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
          technologies: undefined,
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
        await packages_api
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
        await this.fetchRepositories()
      },
      clearFiltration() {
        const pagination = usePaginationStore()
        pagination.setPage(0)
        const { setAllFields } = useObjectActions()
        setAllFields(this.filtration, undefined)
      },
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        await this.fetchRepositories()
      }
    }
  }
)
