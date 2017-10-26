import { login } from '../../api/login'
import { getToken, removeToken, setToken } from '../../utils/token'

const state = {
  token: getToken('admin-Token'),
  roles: [],
  username: '',
  ID: '',
  linkmanContacts: '',
  businessPhone: '',
}
const getters = {
  roles: state => state.roles,
  username: state => state.username,
  ID: state => state.ID,
  linkman_contacts: state => state.linkmanContacts,
  business_phone: state => state.businessPhone
}
const mutations = {
  SET_TOKEN: (state, token) => state.token = token,
  SET_ROLES: (state, roles) => state.roles = roles,
  SET_USERNAME: (state, username) => state.username = username,
  SET_ID: (state, ID) => state.ID = ID,
  SET_LINKMAN: (state, linkman) => state.linkmanContacts = linkman,
  SET_BUSINESSPHONE: (state, phone) => state.businessPhone = phone
}

const actions = {
  Login ({commit}, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        let data = response.data
        setToken('admin-Token', JSON.stringify(data))
        setToken('Token', data.Tokens)
        commit('SET_TOKEN', JSON.stringify(data))
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  FedLoginOut ({commit}) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      removeToken('Token')
      removeToken('admin-Token')
      resolve()
    })
  },
  GetUserInfo ({commit, state}) {
    return new Promise((resolve, reject) => {
      commit('SET_ID', JSON.parse(state.token).Data[0].ID)
      commit('SET_ROLES', JSON.parse(state.token).Data[0].USER_NAME)
      commit('SET_USERNAME', JSON.parse(state.token).Data[0].USER_NAME)
      commit('SET_LINKMAN', JSON.parse(state.token).Data[0].BUSINESS_CONTACTER)
      commit('SET_BUSINESSPHONE', JSON.parse(state.token).Data[0].BUSINESS_PHONE)
      resolve(JSON.parse(state.token))
    })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
