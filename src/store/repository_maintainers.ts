import {
  EntityModelPackageMaintainerDto,
  EntityModelRepositoryDto,
  EntityModelRepositoryMaintainerDto
} from '@/openapi'
import { defineStore } from 'pinia'
import { RepositoryMaintainersFiltration } from '@/models/Filtration'
import {
  deletedRepositoryMaintainer,
  fetchRepositoryMaintainersServices,
  updateRepositoryMaintainer
} from '@/services/repository_maintainers_services'
import { usePaginationStore } from './pagination'
import { useObjectActions } from '@/composable/objectActions'
import { fetchRepositoriesServices } from '@/services'

interface State {
  maintainers: EntityModelRepositoryMaintainerDto[]
  filtration: RepositoryMaintainersFiltration
  repositories: EntityModelRepositoryDto[]
  chosenMaintainer: EntityModelPackageMaintainerDto
}

export const useRepositoryMaintainersStore = defineStore(
  'repository_maintainers_store',
  {
    state: (): State => {
      return {
        maintainers: [],
        filtration: {
          deleted: undefined,
          technologies: undefined
        },
        repositories: [],
        chosenMaintainer: {}
      }
    },
    actions: {
      async fetchMaintainers() {
        const pagination = usePaginationStore()
        const [maintainers, pageData] =
          await fetchRepositoryMaintainersServices(
            this.filtration,
            pagination.page,
            pagination.pageSize
          )
        pagination.setPage(pageData.page)
        pagination.setTotalNumber(pageData.totalNumber)
        this.maintainers = maintainers
      },
      async fetchRepositories() {
        const [repositories] =
          await fetchRepositoriesServices()
        this.repositories = repositories
      },
      async setChosenMaintainer(
        payload: EntityModelRepositoryMaintainerDto
      ) {
        this.chosenMaintainer = payload
      },
      async saveMaintainer(
        newMaintainer: EntityModelPackageMaintainerDto
      ) {
        if (
          this.chosenMaintainer.id &&
          this.chosenMaintainer.repository &&
          this.chosenMaintainer.repository.id
        ) {
          await updateRepositoryMaintainer(
            this.chosenMaintainer,
            newMaintainer
          ).then((success) => {
            if (success) this.fetchMaintainers()
          })
        }
      },
      async deleteMaintainer() {
        if (this.chosenMaintainer.id) {
          await deletedRepositoryMaintainer(
            this.chosenMaintainer
          ).then((success) => {
            if (success) this.fetchMaintainers()
          })
        }
      },
      async setPage(payload: number) {
        const pagination = usePaginationStore()
        pagination.setPage(payload)
        this.fetchMaintainers()
      },
      async setFiltration(
        payload: RepositoryMaintainersFiltration
      ) {
        const pagination = usePaginationStore()
        pagination.setPage(0)
        this.filtration = payload
        this.fetchMaintainers()
      },
      clearFiltration() {
        const { setAllFields } = useObjectActions()
        setAllFields(this.filtration, undefined)
      },
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        this.fetchMaintainers()
      }
    }
  }
)
