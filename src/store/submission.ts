import { ActionContext } from "vuex";
import { State } from ".";

export interface SubmissionState {
  repositoryId: String,
  packages: String[]
}

type Context = ActionContext<SubmissionState, State>;

const submission_state = {
  state: () => ({
    repositoryId: "0",
    packages: []
  }) as SubmissionState,

  mutations: {
    setRepository(state: SubmissionState, payload: String) {
      state.repositoryId = payload
    },
    setPackages(state: SubmissionState, payload: String[]) {
      state.packages = payload
    },
    addPackage(state: SubmissionState, payload: String) {
      state.packages = [...state.packages, payload]
    },
    addPackages(state: SubmissionState, payload: String[]) {
      payload.forEach((packageBag: String) => {
        state.packages = [...state.packages, packageBag]
      })
    }
  },

  actions: {
    setRepository(context: Context, data: String) {
      context.commit('setRepository', data)
    },
    setPackages(context: Context, data: String[]){
      context.commit("setPackages", data)
    },
    addPackage(context: Context, data: String){
      context.commit("addPackage", data)
    },
    addPackages(context: Context, data: String[]){
      context.commit("addPackages", data)
    }
  }
}

export default submission_state