import { fetchPackagesServices } from '@/services'
import { Package } from '@/models/packages/Package'
import { State } from '.'
import { ActionContext } from 'vuex'
import { PackagesFiltration } from '@/models/Filtration'

export interface PackageState {
  packages: Package[]
  page: Number
  howManyPages: Number
  filtration: PackagesFiltration
}

type Context = ActionContext<PackageState, State>

const packages_state = {
  state: {
    packages: [],
    page: 1,
    howManyPages: 10,
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
  } as PackageState,

  mutations: {
    setPackages(state: PackageState, payload: Package[]) {
      state.packages = payload
    },
    setPage(state: PackageState, payload: Number) {
      state.page = payload
    },
    setHowManyPages(state: PackageState, payload: Number) {
      state.howManyPages = payload
    },
    setFiltration(
      state: PackageState,
      payload: PackagesFiltration
    ) {
      state.filtration = payload
      console.log('packages filtration mutation: ', payload)
    },
    clearFiltration(state: PackageState) {
      state.filtration.state.value = ''
      state.filtration.repository.value = ''
      state.filtration.deleted.value = false
    }
  },
  actions: {
    async fetchPackages(context: Context) {
      //change: add parameter with the page so fetched data will be only from wanted page
      //change: if you want to send the filtration request - then set page to 1 and add parameter with filtration part
      var packages = await fetchPackagesServices()
    },
    async setPage(context: Context, data: Number) {
      context.commit('setPage', data)
      this.fetchPackages(context)
    },
    setFiltration(
      context: Context,
      data: PackagesFiltration
    ) {
      context.commit('setFiltration', data)
    },
    clearFiltration(context: Context) {
      context.commit('clearFiltration')
    }
  }
}
export default packages_state
