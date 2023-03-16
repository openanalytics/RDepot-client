import {
  ApiV2RepositoryControllerApiFactory,
  EntityModelPackageDto,
  EntityModelRepositoryDto,
  // EntityModelPackageDtoObjectObject,
  EntityModelRRepositoryDto,
  ResponseDtoPagedModelEntityModelRepositoryDto,
  ResponseDtoPagedModelEntityModelRRepositoryDto,
  RPackageControllerApiFactory,
  RRepositoryControllerApiFactory
} from '@/openapi'
import { defineStore } from 'pinia'
import repositories from '@/tmpLists/repositories.json'
import packages from '@/tmpLists/packages.json'
import { RepositoriesFiltration } from '@/models/Filtration'
import { AxiosResponse } from 'axios'
import {
  fetchPackagesServices,
  fetchRepositoriesServices
} from '@/services'
import { testPromise } from '@/services/repository_services'

interface State {
  repositories: EntityModelRepositoryDto[]
  filtration: RepositoriesFiltration
  choosenRepository: number
  choosenRepositoryName: string
  repositoryPackages: EntityModelPackageDto[]
  page: number
}

const repository_api = ApiV2RepositoryControllerApiFactory()
const packages_api = RPackageControllerApiFactory()

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
        testPromise()

        let axiosResponse: AxiosResponse<ResponseDtoPagedModelEntityModelRepositoryDto> =
          await fetchRepositoriesServices()
        // axiosResponse.data.

        repository_api.getAllRepositories().then(
          (res) => {
            if (
              res.data.data?.content &&
              res.data.data.page?.number
            ) {
              this.page = res.data.data.page?.number
              this.repositories = res.data.data?.content
            }
          },
          (msg) => {
            alert(msg)
          }
        )
        this.repositories = JSON.parse(
          JSON.stringify(repositories.data)
        )
      },
      async fetchPackages() {
        packages_api
          .getAllPackages(this.choosenRepositoryName)
          .then(
            (res) => {
              this.repositoryPackages = res.data.data
            },
            (msg) => alert(msg)
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
