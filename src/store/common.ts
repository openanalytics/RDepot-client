import { ActionContext } from 'vuex'
import { State } from '.'

export interface CommonState {
  drawer: boolean
  progressCircularActive: boolean
}

type Context = ActionContext<CommonState, State>

const common_state = {
  state: () =>
    ({
      progressCircularActive: false,
      drawer: false
    } as CommonState),

  mutations: {
    setProgressCircularActive(
      state: CommonState,
      payload: boolean
    ) {
      state.progressCircularActive = payload
    },
    setDrawer(state: CommonState, payload: boolean) {
      state.drawer = payload
    }
  },
  actions: {
    async setProgressCircularActive(
      context: Context,
      data: boolean
    ) {
      context.commit('setProgressCircularActive', data)
    },
    async setDrawer(context: Context, data: boolean) {
      context.commit('setDrawer', data)
    }
  }
}

export default common_state
