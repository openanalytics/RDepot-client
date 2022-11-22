import { Repository } from "@/models";
import { ActionContext } from "vuex";
import { State } from ".";

export interface SubmissionState {
  repository: Repository | null,
  packages: File[]
}

type Context = ActionContext<SubmissionState, State>;

const submission_state = {
  state: () => ({
    repository: null,
    packages: []
  }) as SubmissionState,

  mutations: {
    setRepository(state: SubmissionState, payload: Repository) {
      state.repository = payload
    },
    setPackages(state: SubmissionState, payload: File[]) {
      state.packages = payload
    },
    addPackage(state: SubmissionState, payload: File) {
      state.packages = [...state.packages, payload]
    },
    addPackages(state: SubmissionState, payload: File[]) {
      payload.forEach((packageBag: File) => {
        state.packages = [...state.packages, packageBag]
      })
    }
  },

  actions: {
    setRepository(context: Context, data: Repository) {
      context.commit('setRepository', data)
    },
    setPackages(context: Context, data: File[]){
      context.commit("setPackages", data)
    },
    addPackage(context: Context, data: File){
      context.commit("addPackage", data)
    },
    addPackages(context: Context, data: File[]){
      context.commit("addPackages", data)
    }
  }
}

export default submission_state