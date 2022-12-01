import { fetchPackagesServices } from '@/services'
import { Package } from '@/models/packages/Package'
import { State } from '.'
import { ActionContext } from 'vuex'
import { PackagesFiltration } from '@/models/Filtration'
import packages from '@/tmpLists/packages.json'

export interface PackageState {
  packages: Package[]
  page: number
  pageSize: number
  filtration: PackagesFiltration
}

type Context = ActionContext<PackageState, State>

const packages_state = {
  state: {
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
  } as PackageState,

  mutations: {
    setPackages(state: PackageState, payload: Package[]) {
      state.packages = payload
    },
    setTmpPackages(state: PackageState) {
      if (state.page % 2 == 0) {
        state.packages = packages.page1
      } else {
        state.packages = packages.page2
      }
    },
    setPage(state: PackageState, payload: number) {
      state.page = payload
      console.log(payload)
    },
    setPackagePageSize(
      state: PackageState,
      payload: number
    ) {
      state.pageSize = payload
    },
    setFiltration(
      state: PackageState,
      payload: PackagesFiltration
    ) {
      state.filtration = payload
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
      // var packages = await fetchPackagesServices()
      // context.commit('setPackages', packages)
      context.commit('setTmpPackages')
    },
    async setPage(context: Context, data: number) {
      context.commit('setPage', data)
      await context.dispatch('fetchPackages')
    },
    async setFiltration(
      context: Context,
      data: PackagesFiltration
    ) {
      context.commit('setFiltration', data)
      context.commit('setPage', 1)
      await context.dispatch('fetchPackages')
    },
    clearFiltration(context: Context) {
      context.commit('clearFiltration')
      // await context.dispatch('fetchPackages')
    },
    async clearFiltrationAndFetch(context: Context) {
      context.commit('clearFiltration')
      await context.dispatch('fetchPackages')
    }
  }
}
export default packages_state
