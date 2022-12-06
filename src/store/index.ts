import Vue from 'vue'
import Vuex from 'vuex'
import repositories, { RepositoryState } from "./repositories"
import users, { UserState } from './users'

Vue.use(Vuex)

export interface State{
  repositories: RepositoryState,
  users: UserState
}

export default new Vuex.Store<State>({
  modules: {
    repositories: repositories,
    users: users
  }
})
