import Vue from 'vue'
import Vuex from 'vuex'
import repositories, { RepositoryState } from "./repositories"
import users, { UserState } from './users'
import common, { CommonState } from './common'

Vue.use(Vuex)

export interface State{
  common: CommonState,
  repositories: RepositoryState,
  users: UserState,
}

export default new Vuex.Store<State>({
  modules: {
    common: common,
    repositories: repositories,
    users: users
  }
})

