import { PackagesFiltration } from '@/models/Filtration'
import packages from '@/tmpLists/packages.json'
import { defineStore } from 'pinia'
import { EntityModelPackageDtoObjectObject } from '@/openapi'

interface State {
  packages: EntityModelPackageDtoObjectObject[]
  page: number
  pageSize: number
  filtration: PackagesFiltration
}

export const usePackagesStore = defineStore(
  'packages_store',
  {
    state: (): State => {
      return {
        packages: [],
        page: 1,
        pageSize: 10,
        filtration: {
          state: {
            label: 'Submission State',
            requestName: 'submissionState',
            value: ''
          },
          deleted: {
            label: 'Deleted',
            requestName: 'deleted',
            value: false
          },
          repository: {
            label: 'Repository Name',
            requestName: 'repositoryName',
            value: ''
          }
        }
      }
    },
    actions: {
      async fetchPackages() {
        //dummy page fetch - in real you need to fertch packages from servcice and set page to 1
        if (this.page % 2 == 0) {
          this.packages = JSON.parse(
            JSON.stringify(packages.page1)
          )
        } else {
          this.packages = JSON.parse(
            JSON.stringify(packages.page2)
          )
        }
      },
      async setPage(payload: number) {
        this.page = payload
        this.fetchPackages()
      },
      async setPageSize(payload: number) {
        this.pageSize = payload
      },
      async setFiltration(payload: PackagesFiltration) {
        this.filtration = payload
        this.page = 1
        this.fetchPackages()
      },
      clearFiltration() {
        this.filtration.state.value = ''
        this.filtration.repository.value = ''
        this.filtration.deleted.value = false
      },
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        this.fetchPackages()
      }
    }
  }
)
