import {
  EntityModelPackageMaintainerDto,
  EntityModelPythonRepositoryDto,
  EntityModelRPackageDto
} from '@/openapi'
import { defineStore } from 'pinia'
import package_maintainers from '@/tmpLists/packageMaintainers.json'
import repositories from '@/tmpLists/repositories.json'
import packages from '@/tmpLists/packages.json'
import { MaintainersFiltration } from '@/models/Filtration'

interface State {
  maintainers: EntityModelPackageMaintainerDto[]
  filtration: MaintainersFiltration
  repositories: EntityModelPythonRepositoryDto[]
  packages: EntityModelRPackageDto[]
  choosenMaintainer: EntityModelPackageMaintainerDto
}

export const usePackageMaintainersStore = defineStore(
  'package_maintainers_store',
  {
    state: (): State => {
      return {
        maintainers: [],
        filtration: {
          deleted: false,
          technology: ''
        },
        repositories: [],
        packages: [],
        choosenMaintainer: {}
      }
    },
    actions: {
      async fetchMaintainers() {
        this.maintainers = JSON.parse(
          JSON.stringify(package_maintainers.data)
        )
      },
      async fetchReposiotires() {
        this.repositories = JSON.parse(
          JSON.stringify(repositories.data)
        )
      },
      async fetchPackages() {
        this.packages = JSON.parse(
          JSON.stringify(packages.page1)
        ).concat(JSON.parse(JSON.stringify(packages.page2)))
      },

      async setChoosenMaintainer(
        payload: EntityModelPackageMaintainerDto
      ) {
        this.choosenMaintainer = payload
        this.saveMaintainer()
      },
      async saveMaintainer() {
        this.maintainers = this.maintainers.map(
          (maintainer: EntityModelPackageMaintainerDto) => {
            if (
              maintainer.id == this.choosenMaintainer.id
            ) {
              return this.choosenMaintainer
            }
            return maintainer
          }
        )
      },
      async setFiltration(payload: MaintainersFiltration) {
        this.filtration = payload
        this.fetchMaintainers()
      },
      clearFiltration() {
        this.filtration.technology = ''
        this.filtration.deleted = false
      },
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        this.fetchMaintainers()
      }
    }
  }
)
