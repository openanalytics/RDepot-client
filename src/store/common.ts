import { ActionContext } from 'vuex'
import { State } from '.'

export interface CommonState {
  progressCircularActive: Boolean
  drawer: Boolean
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
      payload: Boolean
    ) {
      state.progressCircularActive = payload
    },
    setDrawer(state: CommonState, payload: Boolean) {
      state.drawer = payload
    }
  },

  actions: {
    async setProgressCircularActive(
      context: Context,
      data: Boolean
    ) {
      context.commit('setProgressCircularActive', data)
    },
    async setDrawer(context: Context, data: Boolean) {
      context.commit('setDrawer', data)
    }
  }
}

export default common_state
