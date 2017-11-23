import * as types from './mutations_type'

export default {
  [types.SET_ID](state, id) {
    if (id) {
      state.toggleId = id;
    }
  },
  [types.SET_HTTPCON](state, con) {
    if (con) {
      state.httpCon = con;
    }
  },
}
