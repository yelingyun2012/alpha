import {constantRouterMap} from '../../router'

const permission = {
    namespaced: true,
    state: {
        routers: constantRouterMap,
    },
    mutations: {
        SET_ROUTERS: (state, routers) => state.routers = routers
    },
    actions: {
        GenerateRoutes({commit}) {
            return new Promise(resolve => {
                commit('SET_ROUTERS', constantRouterMap)
                resolve()
            })
        }
    }
}
export default permission