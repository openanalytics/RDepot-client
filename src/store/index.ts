import Vue from 'vue'
import Vuex from 'vuex'
import repositories, {
  RepositoryState
} from './repositories'
import packages, { PackageState } from './packages'
import users, { UserState } from './users'
import common, { CommonState } from './common'
import submission, { SubmissionState } from './submission'

Vue.use(Vuex)

export interface State {
  common: CommonState
  repositories: RepositoryState
  packages: PackageState
  users: UserState
  submission: SubmissionState
}

export default new Vuex.Store<State>({
  modules: {
    common: common,
    repositories: repositories,
    packages: packages,
    users: users,
    submission: submission
  }
})
