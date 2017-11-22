import * as types from './mutations_type'

export default {
  setToggleId({commit}, id) {
    commit(types.SET_ID, id);
  },
  setHttpCon({commit}, con) {
    commit(types.SET_HTTPCON, con);
  },
}
