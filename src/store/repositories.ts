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
  chosenRepository: number
  chosenRepositoryName: string
  repositoryPackages?: EntityModelPackageDto[]
  page?: number
  pageSize?: number
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
        repositoryPackages: [],
        page: 0,
        pageSize: 10
      }
    },
    actions: {
      async fetchRepositories() {
        await fetchRepositoriesServices(
          this.filtration,
          this.page,
          this.pageSize
        ).then(
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
          .getAllPackages(this.chosenRepositoryName)
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
        this.filtration.technology = undefined
        this.filtration.name = undefined
        this.filtration.deleted = undefined
      },
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        this.fetchRepositories()
      }
    }
  }
)
