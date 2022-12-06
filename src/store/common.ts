import { ActionContext } from 'vuex'
import { State } from '.'

export interface CommonState {
  progressCircularActive: boolean
}

type Context = ActionContext<CommonState, State>

const common_state = {
  state: () =>
    ({
      progressCircularActive: false
    } as CommonState),

  mutations: {
    setProgressCircularActive(
      state: CommonState,
      payload: boolean
    ) {
      state.progressCircularActive = payload
    }
  },

  actions: {
    async setProgressCircularActive(
      context: Context,
      data: boolean
    ) {
      context.commit('setProgressCircularActive', data)
      console.log('common ' + data)
    }
  }
}

export default common_state
