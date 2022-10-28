import Vue from 'vue'
import Vuex from 'vuex'
import repositories, { RepositoryState } from "./repositories"

Vue.use(Vuex)

export interface State{
  repositories: RepositoryState
}

export default new Vuex.Store<State>({
  modules: {
    repositories: repositories
  }
})
