import Vue from 'vue'
import Vuex from 'vuex'
import repositories, { RepositoryState } from "./repositories"
import users, { UserState } from './users'
import common, { CommonState } from './common'
import submission, { SubmissionState } from './submission'

Vue.use(Vuex)

export interface State{
  common: CommonState,
  repositories: RepositoryState,
  users: UserState,
  submission: SubmissionState
}

export default new Vuex.Store<State>({
  modules: {
    common: common,
    repositories: repositories,
    users: users,
    submission: submission
  }
})

