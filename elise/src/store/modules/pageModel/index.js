import actions from './actions'
import mutations from './mutations'

export default {
  state: {
    toggleId: '',
    httpCon: []
  },
  actions: actions,
  mutations: mutations,
  getters: {
    getToggleId: (state) => {
      return state.toggleId;
    },
    getHttpCon: (state) => {
      return state.httpCon;
    },
  }
}
