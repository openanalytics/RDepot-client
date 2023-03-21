import {
  ApiV2PackageControllerApiFactory,
  EntityModelPackageDto,
  EntityModelRepositoryDto
} from '@/openapi'
import { defineStore } from 'pinia'
import packages from '@/tmpLists/packages.json'
import { RepositoriesFiltration } from '@/models/Filtration'
import { fetchRepositoriesServices } from '@/services'
import { notify } from '@kyvg/vue3-notification'

interface State {
  repositories?: EntityModelRepositoryDto[]
  filtration: RepositoriesFiltration
  choosenRepository: number
  choosenRepositoryName: string
  repositoryPackages?: EntityModelPackageDto[]
  page?: number
}

const packages_api = ApiV2PackageControllerApiFactory()

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
        choosenRepositoryName: '',
        repositoryPackages: [],
        page: 0
      }
    },
    actions: {
      async fetchRepositories() {
        // const repositories: ResponseDtoPagedModelEntityModelRepositoryDto = fetchRepositoriesServices()
        await fetchRepositoriesServices().then(
          (res) => {
            this.page = res.data.data?.page?.number
            this.repositories = res.data.data?.content
          },
          (msg) => {
            notify({ text: msg, type: 'error' })
          }
        )
      },
      async fetchPackages() {
        packages_api
          .getAllPackages(this.choosenRepositoryName)
          .then(
            (res) => {
              this.repositoryPackages =
                res.data.data?.content
            },
            (msg) => notify({ text: msg, type: 'error' })
          )
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
