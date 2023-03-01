import { EntityModelPackageMaintainerDto } from '@/openapi'
import { defineStore } from 'pinia'
import package_maintainers from '@/tmpLists/packageMaintainers.json'
import { MaintainersFiltration } from '@/models/Filtration'

interface State {
  maintainers: EntityModelPackageMaintainerDto[]
  filtration: MaintainersFiltration
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
        }
      }
    },
    actions: {
      async fetchMaintainers() {
        this.maintainers = JSON.parse(
          JSON.stringify(package_maintainers.data)
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
